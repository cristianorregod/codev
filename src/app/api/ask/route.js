import { after } from "next/server";
import {
  CHAT_MODEL,
  MAX_OUTPUT_TOKENS,
  REASONING_EFFORT,
  messagesFor,
} from "@/lib/ask/config";
import { isAllowedOrigin, validateAskBody } from "@/lib/ask/validate";
import { checkRateLimit, clientIp } from "@/lib/ask/rateLimit";
import { retrieve } from "@/lib/ask/retrieve";
import { buildInput, buildInstructions } from "@/lib/ask/prompt";
import { createMetaFilter } from "@/lib/ask/metaStream";
import { resolveMeta } from "@/lib/ask/sources";
import { getOpenAI } from "@/lib/ask/openai";
import { logAsk } from "@/lib/ask/log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const json = (status, body, headers = {}) =>
  Response.json(body, { status, headers });

const sse = (event) => `data: ${JSON.stringify(event)}\n\n`;

export async function POST(request) {
  const startedAt = Date.now();

  if (!isAllowedOrigin(request.headers)) {
    return json(403, { error: "forbidden", message: messagesFor().forbidden });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    body = null;
  }
  const { value, error } = validateAskBody(body);
  const fallbackLocale = body?.locale === "en" ? "en" : "es";
  if (error) {
    return json(400, {
      error: "invalid_request",
      field: error,
      message: messagesFor(fallbackLocale).invalid,
    });
  }
  const { question, locale, history, page } = value;
  const t = messagesFor(locale);

  const limit = await checkRateLimit(clientIp(request.headers));
  if (!limit.ok) {
    return json(
      429,
      { error: "rate_limited", message: t.rateLimited },
      { "Retry-After": String(limit.retryAfter) },
    );
  }

  const abort = new AbortController();
  request.signal?.addEventListener("abort", () => abort.abort(), {
    once: true,
  });

  // Resolved once the stream ends; consumed by the post-response logger.
  let settle;
  const record = new Promise((resolve) => {
    settle = resolve;
  });
  after(async () => {
    await logAsk(await record);
  });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (event) => {
        if (abort.signal.aborted) return;
        try {
          controller.enqueue(encoder.encode(sse(event)));
        } catch {
          // Stream already closed by the client.
        }
      };
      const base = { locale, page, question, model: CHAT_MODEL };
      let answer = "";
      let status = "ok";
      let resolved = { sources: [], noInfo: false };

      try {
        const retrieval = await retrieve({
          question,
          history,
          locale,
          signal: abort.signal,
        });

        const response = await getOpenAI().responses.create(
          {
            model: CHAT_MODEL,
            instructions: buildInstructions(locale),
            input: buildInput({
              question,
              history,
              context: retrieval.context,
              page,
            }),
            max_output_tokens: MAX_OUTPUT_TOKENS,
            ...(REASONING_EFFORT
              ? { reasoning: { effort: REASONING_EFFORT } }
              : {}),
            store: false,
            stream: true,
          },
          { signal: abort.signal },
        );

        const filter = createMetaFilter();
        for await (const event of response) {
          if (event.type === "response.output_text.delta") {
            const text = filter.push(event.delta);
            if (text) send({ type: "text", delta: text });
          } else if (
            event.type === "response.failed" ||
            event.type === "error"
          ) {
            throw new Error(
              event.response?.error?.message ||
                event.message ||
                "response failed",
            );
          } else if (event.type === "response.incomplete") {
            status = "incomplete";
          }
        }

        const { tail, answer: finalAnswer, meta } = filter.finish();
        if (tail) send({ type: "text", delta: tail });
        answer = finalAnswer;
        if (!meta) status = status === "ok" ? "no_meta" : status;

        resolved = resolveMeta(meta, retrieval);
        send({ type: "sources", sources: resolved.sources });
        send({ type: "follow", items: resolved.follow });
        send({ type: "done" });
      } catch (err) {
        if (abort.signal.aborted) {
          status = "aborted";
        } else {
          status = "error";
          console.error("[ask] generation failed:", err?.message);
          send({ type: "error", message: t.error });
        }
      } finally {
        try {
          controller.close();
        } catch {
          // Already closed.
        }
        settle({
          ...base,
          answer,
          sources: resolved.sources.map((s) => s.id),
          noInfo: resolved.noInfo,
          latencyMs: Date.now() - startedAt,
          status,
        });
      }
    },
    cancel() {
      abort.abort();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}

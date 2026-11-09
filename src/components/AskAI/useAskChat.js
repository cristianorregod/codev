"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { countQuestions, loadMessages, saveMessages } from "./storage";

export const QUESTION_MAX = 300;
const HISTORY_MAX = 6;
const HISTORY_CONTENT_MAX = 1500;
const PAGE_MAX = 200;

let nextId = 0;
const uid = () => `${Date.now().toString(36)}-${(nextId++).toString(36)}`;

/** Restores a stored conversation, closing any answer cut by a reload. */
const restore = () =>
  loadMessages()
    .filter((m) => m && (m.role === "user" || m.role === "assistant"))
    .map((m) => {
      if (m.role !== "assistant") return m;
      if (m.status !== "searching" && m.status !== "streaming") return m;
      return m.content
        ? { ...m, status: "stopped" }
        : { ...m, status: "error", error: { code: "generic" } };
    });

/** Last completed question/answer pairs, in the shape the API expects. */
const buildHistory = (messages) => {
  const items = [];
  for (let i = 0; i < messages.length - 1; i += 1) {
    const q = messages[i];
    const a = messages[i + 1];
    if (q.role !== "user" || a.role !== "assistant") continue;
    const answer = a.content?.trim();
    if (!answer) continue;
    items.push(
      { role: "user", content: q.content.slice(0, HISTORY_CONTENT_MAX) },
      { role: "assistant", content: answer.slice(0, HISTORY_CONTENT_MAX) },
    );
  }
  return items.slice(-HISTORY_MAX);
};

/** Seconds from a Retry-After header (delta-seconds or HTTP date). */
const retryAfterSeconds = (value) => {
  if (!value) return null;
  const seconds = Number.parseInt(value, 10);
  if (Number.isFinite(seconds)) return Math.max(1, seconds);
  const date = Date.parse(value);
  return Number.isFinite(date)
    ? Math.max(1, Math.ceil((date - Date.now()) / 1000))
    : null;
};

const errorFromResponse = (response) => {
  if (response.status === 429) {
    return {
      code: "rateLimit",
      seconds: retryAfterSeconds(response.headers.get("Retry-After")),
    };
  }
  if (response.status === 400) return { code: "invalid" };
  if (response.status === 403) return { code: "forbidden" };
  return { code: "generic" };
};

/** Parses a `text/event-stream` body, calling `onEvent` for each JSON event. */
async function readEvents(body, onEvent) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  const flush = (chunk) => {
    const data = chunk
      .split("\n")
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).trimStart())
      .join("\n");
    if (!data) return;
    try {
      onEvent(JSON.parse(data));
    } catch {
      // Ignore malformed events.
    }
  };
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true }).replace(/\r/g, "");
    let index;
    while ((index = buffer.indexOf("\n\n")) !== -1) {
      flush(buffer.slice(0, index));
      buffer = buffer.slice(index + 2);
    }
  }
  buffer += decoder.decode();
  if (buffer.trim()) flush(buffer);
}

/** Conversation state and streaming against POST /api/ask. */
export function useAskChat({ locale, onCount }) {
  const [messages, setMessages] = useState(restore);
  const [busy, setBusy] = useState(false);
  const abortRef = useRef(null);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  useEffect(() => {
    onCount?.(countQuestions(messages));
  }, [messages, onCount]);

  // Persist completed states only (not every streamed token).
  useEffect(() => {
    if (!busy) saveMessages(messages);
  }, [messages, busy]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const patch = useCallback((id, update) => {
    setMessages((list) =>
      list.map((m) =>
        m.id === id
          ? { ...m, ...(typeof update === "function" ? update(m) : update) }
          : m,
      ),
    );
  }, []);

  const ask = useCallback(
    async (input) => {
      const question = String(input || "")
        .trim()
        .slice(0, QUESTION_MAX);
      if (!question || abortRef.current) return;

      const history = buildHistory(messagesRef.current);
      const answerId = uid();
      setMessages((list) => [
        ...list,
        { id: uid(), role: "user", content: question },
        {
          id: answerId,
          role: "assistant",
          content: "",
          status: "searching",
          sources: [],
          follow: [],
        },
      ]);
      setBusy(true);

      const controller = new AbortController();
      abortRef.current = controller;
      let finished = false;

      try {
        const response = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question,
            locale,
            history,
            page: window.location.pathname.slice(0, PAGE_MAX),
          }),
          signal: controller.signal,
        });
        if (!response.ok || !response.body) {
          patch(answerId, {
            status: "error",
            error: errorFromResponse(response),
          });
          finished = true;
          return;
        }

        await readEvents(response.body, (event) => {
          if (event.type === "text" && typeof event.delta === "string") {
            patch(answerId, (m) => ({
              content: m.content + event.delta,
              status: "streaming",
            }));
          } else if (event.type === "sources") {
            patch(answerId, {
              sources: Array.isArray(event.sources) ? event.sources : [],
            });
          } else if (event.type === "follow") {
            patch(answerId, {
              follow: Array.isArray(event.items) ? event.items : [],
            });
          } else if (event.type === "done") {
            finished = true;
            patch(answerId, { status: "done" });
          } else if (event.type === "error") {
            finished = true;
            patch(answerId, { status: "error", error: { code: "generic" } });
          }
        });

        if (!finished) {
          // Stream closed without a terminal event.
          patch(answerId, (m) =>
            m.content
              ? { status: "done" }
              : { status: "error", error: { code: "generic" } },
          );
        }
      } catch (err) {
        if (controller.signal.aborted) {
          patch(answerId, { status: "stopped" });
        } else {
          patch(answerId, (m) =>
            m.content
              ? { status: "stopped" }
              : { status: "error", error: { code: "network" } },
          );
        }
      } finally {
        if (abortRef.current === controller) abortRef.current = null;
        setBusy(false);
      }
    },
    [locale, patch],
  );

  const stop = useCallback(() => abortRef.current?.abort(), []);

  const clear = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setBusy(false);
    setMessages([]);
  }, []);

  return { messages, busy, ask, stop, clear };
}

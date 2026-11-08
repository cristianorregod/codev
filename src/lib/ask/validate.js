import "server-only";
import { DEFAULT_LOCALE, LIMITS, LOCALES } from "./config";

const ROLES = new Set(["user", "assistant"]);

/** Validates the request body. Returns `{ value }` or `{ error }`. */
export function validateAskBody(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { error: "body" };
  }
  const question =
    typeof body.question === "string" ? body.question.trim() : "";
  if (!question || question.length > LIMITS.questionMax)
    return { error: "question" };

  const locale = body.locale ?? DEFAULT_LOCALE;
  if (!LOCALES.includes(locale)) return { error: "locale" };

  const history = body.history ?? [];
  if (!Array.isArray(history) || history.length > LIMITS.historyMax) {
    return { error: "history" };
  }
  for (const item of history) {
    if (
      !item ||
      typeof item !== "object" ||
      !ROLES.has(item.role) ||
      typeof item.content !== "string" ||
      !item.content.trim() ||
      item.content.length > LIMITS.historyContentMax
    ) {
      return { error: "history" };
    }
  }

  const page = body.page ?? null;
  if (
    page !== null &&
    (typeof page !== "string" || page.length > LIMITS.pageMax)
  ) {
    return { error: "page" };
  }

  return {
    value: {
      question,
      locale,
      history: history.map(({ role, content }) => ({
        role,
        content: content.trim(),
      })),
      page,
    },
  };
}

/** Allows requests without Origin, same-host origins and localhost. */
export function isAllowedOrigin(headers) {
  const origin = headers.get("origin");
  if (!origin) return true;
  let originHost;
  let hostname;
  try {
    ({ host: originHost, hostname } = new URL(origin));
  } catch {
    return false;
  }
  if (["localhost", "127.0.0.1", "[::1]"].includes(hostname)) return true;
  const hosts = [headers.get("x-forwarded-host"), headers.get("host")]
    .filter(Boolean)
    .flatMap((h) => h.split(",").map((s) => s.trim()));
  return hosts.includes(originHost);
}

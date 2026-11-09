import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let limiters;
let warned = false;

const getLimiters = () => {
  if (limiters !== undefined) return limiters;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    limiters = null;
    return limiters;
  }
  const redis = new Redis({ url, token });
  const common = { redis, timeout: 2000, analytics: false };
  limiters = [
    new Ratelimit({
      ...common,
      prefix: "codev:ask:min",
      limiter: Ratelimit.slidingWindow(8, "1 m"),
    }),
    new Ratelimit({
      ...common,
      prefix: "codev:ask:day",
      limiter: Ratelimit.slidingWindow(40, "1 d"),
    }),
  ];
  return limiters;
};

/**
 * Client IP from proxy headers; only used as a rate-limit key, never stored.
 * On Vercel these headers are set by the platform and cannot be spoofed.
 */
export const clientIp = (headers) =>
  headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
  headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  headers.get("x-real-ip")?.trim() ||
  "anonymous";

/**
 * Applies the per-minute and per-day limits. Returns `{ ok, retryAfter }`.
 * Skips when Upstash is not configured and fails open on Upstash errors.
 */
export async function checkRateLimit(ip) {
  const active = getLimiters();
  if (!active) {
    if (!warned) {
      console.warn("[ask] Upstash env missing: rate limiting is disabled.");
      warned = true;
    }
    return { ok: true };
  }
  try {
    const results = await Promise.all(active.map((l) => l.limit(ip)));
    const blocked = results.filter((r) => !r.success);
    if (!blocked.length) return { ok: true };
    const reset = Math.max(...blocked.map((r) => r.reset));
    return {
      ok: false,
      retryAfter: Math.max(1, Math.ceil((reset - Date.now()) / 1000)),
    };
  } catch (error) {
    console.error(
      "[ask] rate limit check failed, allowing request:",
      error?.message,
    );
    return { ok: true };
  }
}

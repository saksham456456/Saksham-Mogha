import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Per-IP rate limiting. Uses Upstash Redis (or Vercel KV, which exposes the
 * same REST API) when configured. Otherwise uses an in-memory fallback that
 * is only allowed outside production.
 */

type Result = { success: boolean; reset: number };

const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

const upstash =
  url && token
    ? new Ratelimit({
        redis: new Redis({ url, token }),
        limiter: Ratelimit.slidingWindow(5, "10 m"),
        prefix: "rl:contact",
        analytics: false,
      })
    : null;

const memory = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;

function memoryLimit(key: string): Result {
  const now = Date.now();
  const hit = memory.get(key);
  if (!hit || hit.reset < now) {
    memory.set(key, { count: 1, reset: now + WINDOW_MS });
    return { success: true, reset: now + WINDOW_MS };
  }
  hit.count += 1;
  return { success: hit.count <= LIMIT, reset: hit.reset };
}

export const rateLimitConfigured = () => Boolean(upstash) || process.env.NODE_ENV !== "production";

export async function rateLimit(key: string): Promise<Result> {
  if (upstash) {
    const r = await upstash.limit(key);
    return { success: r.success, reset: r.reset };
  }
  if (process.env.NODE_ENV === "production" && process.env.ALLOW_MEMORY_RATE_LIMIT !== "1") {
    // Fail closed in production without a shared store.
    return { success: false, reset: Date.now() + WINDOW_MS };
  }
  return memoryLimit(key);
}

/** Best-effort client IP on Vercel (x-forwarded-for is set by the platform). */
export function clientIp(headers: Headers) {
  const xff = headers.get("x-forwarded-for");
  const ip = xff?.split(",")[0]?.trim() || headers.get("x-real-ip") || "unknown";
  return ip.slice(0, 64);
}

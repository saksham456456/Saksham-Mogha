import "server-only";
import { z } from "zod";

/** Cloudflare's documented always-pass TEST keys, used only outside production. */
const TEST_SECRET = "1x0000000000000000000000000000000AA";
export const TEST_SITE_KEY = "1x00000000000000000000AA";

const responseSchema = z.object({
  success: z.boolean(),
  "error-codes": z.array(z.string()).default([]),
  hostname: z.string().default(""),
  action: z.string().default(""),
});

export function turnstileSecret() {
  const s = process.env.TURNSTILE_SECRET_KEY;
  if (s) return s;
  return process.env.NODE_ENV === "production" ? null : TEST_SECRET;
}

export async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = turnstileSecret();
  if (!secret || !token || token.length > 2048) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip !== "unknown") body.set("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    if (!res.ok) return false;
    const parsed = responseSchema.safeParse(await res.json());
    return parsed.success && parsed.data.success;
  } catch {
    return false;
  }
}

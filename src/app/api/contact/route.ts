import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { isSameOrigin } from "@/lib/security/origin";
import { clientIp, rateLimit } from "@/lib/security/rate-limit";
import { verifyTurnstile } from "@/lib/security/turnstile";
import { sendContactEmail } from "@/lib/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 16 * 1024;

const json = (status: number, body: Record<string, unknown>, extra?: HeadersInit) =>
  NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...extra },
  });

/** Only POST is exported; Next.js answers every other method with 405. */
export async function POST(req: Request) {
  try {
    // 1. Cross-site / CSRF checks
    if (!isSameOrigin(req) || req.headers.get("x-requested-with") !== "fetch") {
      return json(403, { ok: false, error: "Request blocked." });
    }
    if (!(req.headers.get("content-type") ?? "").startsWith("application/json")) {
      return json(415, { ok: false, error: "Unsupported request." });
    }
    const declared = Number(req.headers.get("content-length") ?? "0");
    if (declared > MAX_BODY_BYTES) return json(413, { ok: false, error: "Message is too large." });

    // 2. Rate limit per IP (before any expensive work)
    const ip = clientIp(req.headers);
    const rl = await rateLimit(ip);
    if (!rl.success) {
      const retry = Math.max(1, Math.ceil((rl.reset - Date.now()) / 1000));
      return json(429, { ok: false, error: "Too many messages. Please try again later." }, { "Retry-After": String(retry) });
    }

    // 3. Read body with a hard cap (content-length can lie)
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) return json(413, { ok: false, error: "Message is too large." });

    let data: unknown;
    try {
      data = JSON.parse(raw);
    } catch {
      return json(400, { ok: false, error: "Invalid request." });
    }

    // 4. Authoritative server-side validation
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!fieldErrors[key] && ["name", "email", "topic", "message"].includes(key)) fieldErrors[key] = issue.message;
      }
      return json(400, { ok: false, error: "Please check the highlighted fields.", fieldErrors });
    }
    const input = parsed.data;

    // 5. Honeypot: pretend success, send nothing
    if (input.website) return json(200, { ok: true });

    // 6. Captcha, verified server-side
    if (!(await verifyTurnstile(input.turnstileToken, ip))) {
      return json(400, { ok: false, error: "Captcha verification failed. Please try again." });
    }

    // 7. Send
    const sent = await sendContactEmail(input);
    if (!sent) return json(502, { ok: false, error: "Could not send your message right now. Please try again later." });

    return json(200, { ok: true });
  } catch (err) {
    // Never log message bodies or personal data
    console.error("[contact] unexpected error:", err instanceof Error ? err.name : "unknown");
    return json(500, { ok: false, error: "Something went wrong. Please try again later." });
  }
}

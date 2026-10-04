import "server-only";
import { z } from "zod";
import type { contactSchema } from "@/lib/contact-schema";

type Contact = z.output<typeof contactSchema>;

/**
 * Sends the contact message via Resend's HTTP API.
 * - Recipient address lives only in env (CONTACT_TO_EMAIL), never in HTML.
 * - Subject is built from an enum (topic), never from free text.
 * - Reply-To is the zod-validated, single-line email, so header injection is
 *   impossible. The body is plain text only.
 */
export async function sendContactEmail(input: Contact): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Website <onboarding@resend.dev>";

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] mail not configured; dev mode: message accepted but not sent.");
      return true;
    }
    console.error("[contact] RESEND_API_KEY / CONTACT_TO_EMAIL not configured");
    return false;
  }

  const text = [
    `Topic: ${input.topic}`,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    "",
    input.message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: input.email,
        subject: `[saksham.dev] ${input.topic}`,
        text,
      }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[contact] mail provider responded", res.status);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[contact] mail provider error:", err instanceof Error ? err.name : "unknown");
    return false;
  }
}

import { z } from "zod";

/**
 * Contact form schema. Shared by client (for UX) and server (authoritative).
 * Strips control characters and normalises whitespace before validating.
 */

// Remove C0/C1 control chars except \n and \t; also strip bidi overrides & zero-width chars.
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g;

export const clean = (s: string) => s.replace(CONTROL, "").replace(/\r\n?/g, "\n").trim();
/** Single-line fields: also collapse newlines (prevents header injection). */
export const cleanLine = (s: string) => clean(s).replace(/[\n\t]+/g, " ").replace(/\s{2,}/g, " ");

export const TOPICS = ["App support", "Business inquiry", "Feedback", "Data deletion request", "Other"] as const;

export const contactSchema = z
  .object({
    name: z.string().transform(cleanLine).pipe(z.string().min(2, "Please enter your name").max(80)),
    email: z
      .string()
      .transform(cleanLine)
      .pipe(z.string().max(254).email("Please enter a valid email address")),
    topic: z.enum(TOPICS),
    message: z
      .string()
      .transform(clean)
      .pipe(z.string().min(10, "Message must be at least 10 characters").max(4000, "Message is too long")),
    /** Honeypot: humans leave it empty. Bots that fill it get a fake success. */
    website: z.string().max(500).default(""),
    turnstileToken: z.string().max(2048).default(""),
  })
  .strict();

export type ContactInput = z.input<typeof contactSchema>;

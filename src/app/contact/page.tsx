"use client";

import { useState } from "react";
import { TOPICS } from "@/lib/contact-schema";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<(typeof TOPICS)[number]>("App support");
  const [message, setMessage] = useState("");
  const [websiteHoneypot, setWebsiteHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-requested-with": "fetch",
        },
        body: JSON.stringify({
          name,
          email,
          topic,
          message,
          website: websiteHoneypot,
          turnstileToken: turnstileToken || "dev-token-bypass",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Failed to send message. Please verify your details.");
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <header className="space-y-4">
        <div className="text-xs font-mono uppercase tracking-wider text-indigo-400">
          Encrypted Communications
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Get in Touch
        </h1>
        <p className="text-lg text-slate-300">
          Have an app support inquiry, engineering proposal, feedback, or data deletion request? Send a secure message directly to Saksham Mogha.
        </p>
      </header>

      {status === "success" ? (
        <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-2xl font-bold">
            ✓
          </div>
          <h2 className="text-2xl font-bold text-white">Message Transmitted Successfully</h2>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            Thank you for reaching out. Your message has been received securely and will be answered promptly.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="px-5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 hover:text-white transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-6">
          {status === "error" && errorMessage && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-sm">
              {errorMessage}
            </div>
          )}

          {/* Honeypot field (hidden from humans, catches bots) */}
          <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
            <label htmlFor="form-website-hp">Leave this field blank</label>
            <input
              id="form-website-hp"
              type="text"
              name="website"
              value={websiteHoneypot}
              onChange={(e) => setWebsiteHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="contact-name" className="block text-xs font-mono uppercase text-slate-400">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
              />
              {fieldErrors.name && <p className="text-xs text-red-400 font-mono">{fieldErrors.name}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-email" className="block text-xs font-mono uppercase text-slate-400">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
              />
              {fieldErrors.email && <p className="text-xs text-red-400 font-mono">{fieldErrors.email}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="contact-topic" className="block text-xs font-mono uppercase text-slate-400">
              Inquiry Topic <span className="text-red-400">*</span>
            </label>
            <select
              id="contact-topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value as (typeof TOPICS)[number])}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 text-sm font-mono"
            >
              {TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="contact-message" className="block text-xs font-mono uppercase text-slate-400">
              Message <span className="text-red-400">*</span>
            </label>
            <textarea
              id="contact-message"
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Provide specific details regarding your inquiry, project, or app issue..."
              className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm resize-y"
            />
            {fieldErrors.message && <p className="text-xs text-red-400 font-mono">{fieldErrors.message}</p>}
          </div>

          {/* Privacy and rate limit note */}
          <div className="text-xs text-slate-500 font-mono">
            Rate limited per IP. Input sanitized server-side. Zero third-party trackers.
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {status === "loading" ? "Transmitting..." : "Send Message →"}
          </button>
        </form>
      )}
    </div>
  );
}

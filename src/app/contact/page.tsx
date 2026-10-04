"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { TOPICS } from "@/lib/contact-schema";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<(typeof TOPICS)[number]>("App support");
  const [message, setMessage] = useState("");
  const [websiteHoneypot, setWebsiteHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
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
        setIsSubmitting(false);
        setErrorMsg(data.error || "Failed to send message. Please verify your details.");
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        return;
      }

      setIsSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    } catch {
      setIsSubmitting(false);
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">Get in Touch</h1>
          <p className="text-xl text-gray-400">
            Have a question, business inquiry, or app issue? Fill out the form below.
          </p>
        </div>

        {isSuccess ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 bg-green-500/10 border border-green-500/30 rounded-3xl text-center backdrop-blur-md"
          >
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Message Sent!</h2>
            <p className="text-gray-300 mb-6">
              Thank you for reaching out. Your message has been received securely and we will get back to you promptly.
            </p>
            <button 
              type="button"
              onClick={() => setIsSuccess(false)}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-sm font-medium text-white"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl">
            {errorMsg && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm">
                {errorMsg}
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-500"
                  placeholder="Your Name"
                />
                {fieldErrors.name && <span className="text-red-400 text-xs mt-1 block">{fieldErrors.name}</span>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-500"
                  placeholder="name@example.com"
                />
                {fieldErrors.email && <span className="text-red-400 text-xs mt-1 block">{fieldErrors.email}</span>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Topic</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value as (typeof TOPICS)[number])}
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
              >
                {TOPICS.map((t) => (
                  <option key={t} value={t} className="bg-slate-900 text-white">
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-500 resize-none"
                placeholder="How can we help you?"
              />
              {fieldErrors.message && <span className="text-red-400 text-xs mt-1 block">{fieldErrors.message}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}

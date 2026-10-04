import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "App Support & FAQs — Saksham Mogha",
  description: "Official customer and user support portal for applications and games developed by Saksham Mogha.",
  path: "/support",
});

const faqs = [
  {
    question: "How do I report a bug or crash in an application?",
    answer:
      "Please navigate to our Contact Form and submit a report with the subject 'App support'. Include your device model, Android version, app name, and steps to reproduce the issue.",
  },
  {
    question: "How do I request a refund for a Google Play purchase?",
    answer:
      "All financial transactions and refunds for apps or in-app items are processed directly through Google Play. Please visit your Google Play order history (play.google.com) to request a refund within 48 hours of purchase according to Google Play refund policies.",
  },
  {
    question: "How do I manage or cancel an active subscription?",
    answer:
      "Subscriptions are managed securely via your Google account. Open the Google Play Store on your device, tap your Profile Icon → Payments & subscriptions → Subscriptions, and select the subscription you wish to cancel.",
  },
  {
    question: "Where can I view the Privacy Policy or request data deletion?",
    answer:
      "Our full Privacy Policy is accessible at /privacy. If you would like to request deletion of any contact correspondence or associated data, submit a request via our Contact Form with the topic 'Data deletion request'.",
  },
  {
    question: "Are your mobile applications open source?",
    answer:
      "Many of our applications have open source core components, reference architectures, or repositories available on GitHub (github.com/saksham456456).",
  },
];

export default function SupportPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <header className="space-y-4">
        <div className="text-xs font-mono uppercase tracking-wider text-indigo-400">
          User Assistance & Portal
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          App Support & FAQs
        </h1>
        <p className="text-lg text-slate-300">
          Official support center for all applications, utilities, and games developed by Saksham Mogha.
        </p>
      </header>

      {/* Support Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
          <h2 className="text-xl font-bold text-white">Direct Developer Support</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Need direct help or have a technical query regarding an app? Send an encrypted inquiry through our secure contact portal.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-block px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-medium transition-colors"
            >
              Open Contact Form →
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
          <h2 className="text-xl font-bold text-white">Privacy Disclosures</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Read how data and permissions are handled across our software in compliance with Google Play Developer policies.
          </p>
          <div className="pt-2">
            <Link
              href="/privacy"
              className="inline-block px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono font-medium transition-colors"
            >
              View Privacy Policy →
            </Link>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2"
            >
              <h3 className="text-base font-semibold text-white">{faq.question}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

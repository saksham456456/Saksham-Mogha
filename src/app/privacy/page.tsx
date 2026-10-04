import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy & Data Safety — Saksham Mogha",
  description: "Official Privacy Policy and data safety disclosures for applications developed by Saksham Mogha.",
  path: "/privacy",
});

export default function PrivacyPolicyPage() {
  const LAST_UPDATED = "October 4, 2026";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <header className="space-y-4 border-b border-slate-800 pb-8">
        <div className="text-xs font-mono uppercase tracking-wider text-indigo-400">
          Legal & Compliance
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm font-mono text-slate-400">
          Last Updated: <span className="text-white font-medium">{LAST_UPDATED}</span>
        </p>
      </header>

      <div className="space-y-10 text-slate-300 leading-relaxed text-sm sm:text-base">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. Introduction</h2>
          <p>
            Saksham Mogha (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy and treating personal information with transparency and respect. This Privacy Policy outlines the standards and policies governing our website (<Link href="/" className="text-indigo-400 hover:underline">saksham-mogha.vercel.app</Link>) and mobile applications published on the Google Play Store.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">2. Website Analytics & Cookie Disclosure</h2>
          <p>
            Our website is engineered with strict privacy principles:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-slate-400">
            <li><strong>Cookieless Analytics:</strong> We use privacy-friendly, cookieless analytics (Vercel Web Analytics) that do not store persistent identifiers or track users across websites.</li>
            <li><strong>Zero Third-Party Advertising Trackers:</strong> No marketing pixels, cross-site trackers, or advertising scripts are loaded. No cookie consent banner is needed because no non-essential cookies or intrusive trackers exist.</li>
            <li><strong>No Local Storage Tracking:</strong> Client storage is strictly restricted to user preferences (such as light/dark mode selection).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. Information Handled in Mobile Applications</h2>
          <p>
            Depending on the specific mobile application installed from the Google Play Store, we may collect or process the following minimal categories of technical data:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400">
            <li>
              <strong>Device & Technical Diagnostics:</strong> Hardware model, Android OS version, unique device identifiers, and network performance indicators necessary to ensure app stability and responsiveness.
            </li>
            <li>
              <strong>Crash Logs & Performance Metrics:</strong> Diagnostic logs generated when an unhandled application exception or crash occurs. These logs contain stack traces and device state information at the time of the crash.
            </li>
            <li>
              <strong>Offline-First Data:</strong> Where applications utilize local-first architectures (such as Room Database or DataStore), user content remains stored directly on your device.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. Third-Party Service Providers</h2>
          <p>
            Our applications may interact with trusted third-party SDKs to facilitate essential functionalities:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-slate-400">
            <li>Google Play Services (authentication, in-app purchases, licensing)</li>
            <li>Google AdMob (contextual ads in ad-supported applications, subject to Google Play policies)</li>
            <li>Firebase (secure crash diagnostics and analytics)</li>
          </ul>
          <p className="text-xs text-slate-400">
            Each third-party service provider operates under its respective privacy policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">5. Children&apos;s Privacy (COPPA Compliance)</h2>
          <p>
            Our general services and applications do not intentionally solicit or collect personally identifiable information from children under the age of 13. If you believe a child under 13 has transmitted personal information through our contact mechanisms, please contact us immediately, and we will promptly purge that information.
          </p>
        </section>

        <section className="space-y-3 p-6 rounded-2xl bg-indigo-950/20 border border-indigo-500/20">
          <h2 className="text-xl font-bold text-indigo-300">6. User Data Deletion Instructions</h2>
          <p>
            In compliance with Google Play Developer Data Safety standards, all users have the right to request full deletion of any stored data or correspondence.
          </p>
          <div className="space-y-2 text-sm text-slate-300 pt-2">
            <p><strong>To request deletion:</strong></p>
            <ol className="list-decimal pl-6 space-y-1 text-slate-400">
              <li>Visit our <Link href="/contact" className="text-indigo-400 hover:underline">Contact Form</Link>.</li>
              <li>Select <strong>&ldquo;Data deletion request&rdquo;</strong> in the Topic dropdown.</li>
              <li>Provide the email address or account identifiers associated with your app usage or inquiry.</li>
            </ol>
            <p className="text-xs text-slate-400 pt-2">
              Requests are processed securely within 30 business days. Local offline database records can also be permanently erased at any time by clearing the application storage via Android System Settings.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">7. Security of Your Information</h2>
          <p>
            We implement industry-standard security safeguards including strict Content Security Policies, encrypted HTTPS transport (HSTS preload), server-side input sanitization, and automated rate limiting to protect all interactions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">8. Contact Us</h2>
          <p>
            For any inquiries, feedback, or legal questions concerning this Privacy Policy, please submit a message via our secure <Link href="/contact" className="text-indigo-400 hover:underline">Contact Portal</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}

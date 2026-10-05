"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivacyPolicy() {
  const lastUpdated = "October 4, 2026";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl"
      >
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-white">Privacy Policy</h1>
        <p className="text-gray-400 mb-12 font-mono text-sm">Last updated: {lastUpdated}</p>

        <div className="space-y-8 text-gray-300 leading-relaxed text-sm sm:text-base">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
            <p>
              Saksham Mogha (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by our website (<Link href="/" className="text-indigo-400 hover:underline">saksham-mogha.vercel.app</Link>) and applications available on the Google Play Store.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Website Analytics (Cookieless)</h2>
            <p className="mb-2">
              Our website uses privacy-friendly, cookieless analytics (Vercel Web Analytics) that do not store persistent identifiers or track users across websites.
            </p>
            <p>
              We do not use advertising pixels, cross-site trackers, or third-party marketing cookies. No cookie consent banner is needed because no intrusive trackers exist.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Information We Collect in Mobile Apps</h2>
            <p className="mb-4">Depending on the application you use, we may collect minimal technical diagnostics:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li><strong>Device Information:</strong> Hardware model, operating system version, unique device identifiers, and mobile network performance indicators required for app stability.</li>
              <li><strong>Usage Data:</strong> Aggregated interaction patterns to optimize user experience and app responsiveness.</li>
              <li><strong>Crash Reports:</strong> Diagnostic logs containing stack traces and device state information at the time of an unhandled crash.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. How We Use Your Information</h2>
            <p className="mb-4">We use the technical diagnostic data exclusively to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
              <li>Provide, maintain, and optimize our applications.</li>
              <li>Analyze app performance and repair technical defects.</li>
              <li>Respond to your comments, bug reports, and customer service requests.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Third-Party Services</h2>
            <p>
              Our applications may use third-party services (such as Google Play Services, Google AdMob for advertisements, or Firebase for diagnostics). These third-party services operate under their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Children&apos;s Privacy</h2>
            <p>
              Our services do not intentionally solicit or collect personally identifiable information from children under 13. In the case we discover that a child under 13 has transmitted personal data, we immediately delete it.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/30">
            <h2 className="text-2xl font-semibold text-indigo-300 mb-4">7. Data Deletion Requests</h2>
            <p className="mb-4">
              To request complete deletion of any correspondence or data associated with your inquiries:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-300">
              <li>Navigate to our <Link href="/contact" className="text-indigo-400 hover:underline">Contact Form</Link>.</li>
              <li>Select &ldquo;Data deletion request&rdquo; as the topic.</li>
              <li>Submit your email address or account identifiers. Requests are purged securely within 30 days.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Contact Us</h2>
            <p>
              If you have any questions or suggestions regarding our Privacy Policy, do not hesitate to contact us via the <Link href="/contact" className="text-indigo-400 hover:underline">Contact page</Link>.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}

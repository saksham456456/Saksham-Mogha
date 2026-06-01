"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  const lastUpdated = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-3xl"
      >
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">Privacy Policy</h1>
        <p className="text-gray-400 mb-12">Last updated: {lastUpdated}</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
            <p>
              Saksham Mogha ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by our applications available on the Google Play Store.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
            <p className="mb-4">Depending on the application you use, we may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Device Information:</strong> We may collect device-specific information (such as your hardware model, operating system version, unique device identifiers, and mobile network information).</li>
              <li><strong>Usage Data:</strong> We collect information about how you interact with our apps, including the features you use and the time spent on the app, to improve user experience.</li>
              <li><strong>Crash Reports:</strong> If our app crashes, we may collect crash logs which include device state information at the time of the crash.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our applications.</li>
              <li>Analyze app performance and fix technical issues.</li>
              <li>Respond to your comments, questions, and customer service requests.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Third-Party Services</h2>
            <p>
              Our applications may use third-party services (such as Google AdMob for advertisements or Google Analytics for crash reporting). These third-party services have their own privacy policies addressing how they use such information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Children's Privacy</h2>
            <p>
              Our services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Contact Us</h2>
            <p>
              If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us via the Contact page on this website.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}

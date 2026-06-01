"use client";

import { motion } from "framer-motion";
import { HelpCircle, Mail, AlertTriangle, FileText } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "How do I report a bug or issue?",
    answer: "Please use the Contact page or send an email directly to support with a detailed description of the issue, your device model, and the Android version you are running."
  },
  {
    question: "How can I request a refund?",
    answer: "Refunds for apps or in-app purchases are handled directly through the Google Play Store. Please visit your Google Play order history to request a refund within 48 hours of purchase."
  },
  {
    question: "How do I cancel a subscription?",
    answer: "Subscriptions are managed via Google Play. Open the Google Play Store app, tap your profile icon, go to 'Payments & subscriptions', then 'Subscriptions', and select the subscription you want to cancel."
  },
  {
    question: "Where can I find the Privacy Policy?",
    answer: "You can view our comprehensive Privacy Policy by clicking the link in the footer or navigating to the Privacy Policy page on this website."
  }
];

export default function Support() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">App Support & FAQ</h1>
          <p className="text-xl text-gray-400">
            Need help with an app developed by Saksham Mogha? You are in the right place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-start gap-4">
            <Mail className="w-8 h-8 text-indigo-400 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Direct Contact</h3>
              <p className="text-gray-400 text-sm mb-4">Send a message directly to the developer for specific issues.</p>
              <Link href="/contact" className="text-indigo-400 hover:text-indigo-300 font-medium text-sm">
                Go to Contact Form →
              </Link>
            </div>
          </div>
          
          <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-start gap-4">
            <FileText className="w-8 h-8 text-pink-400 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Policies</h3>
              <p className="text-gray-400 text-sm mb-4">Review how your data is handled in our applications.</p>
              <Link href="/privacy" className="text-pink-400 hover:text-pink-300 font-medium text-sm">
                Read Privacy Policy →
              </Link>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <HelpCircle className="w-6 h-6" /> Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"
            >
              <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

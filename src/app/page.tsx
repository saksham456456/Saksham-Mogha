"use client";

import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Code, Gamepad2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6">
            Crafting <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Digital Experiences
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
            Welcome to the official developer portal of Saksham Mogha. I build innovative, high-performance applications and games for the Google Play Store.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2 group"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/support" 
              className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10"
            >
              App Support
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-colors">
            <Smartphone className="w-10 h-10 text-indigo-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Utility Apps</h3>
            <p className="text-gray-400">Tools designed to make your daily life easier and more productive.</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-colors sm:translate-y-8">
            <Gamepad2 className="w-10 h-10 text-pink-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Immersive Games</h3>
            <p className="text-gray-400">Engaging mobile gaming experiences with stunning visuals.</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-colors sm:-translate-y-8">
            <Code className="w-10 h-10 text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Clean Code</h3>
            <p className="text-gray-400">Built with modern frameworks ensuring high performance and security.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

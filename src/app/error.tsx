"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error digest without personal data or stack traces exposed to client UI
    console.error("[application error]", error?.name || "unhandled error");
  }, [error]);

  return (
    <div className="max-w-xl mx-auto px-4 py-32 text-center space-y-6">
      <div className="text-sm font-mono uppercase tracking-wider text-amber-400">
        500 — Application Error
      </div>
      <h1 className="text-4xl font-extrabold text-white tracking-tight">
        Something Went Wrong
      </h1>
      <p className="text-slate-400 text-sm leading-relaxed">
        An unexpected error occurred while processing your request. No details have been leaked.
      </p>
      <div className="flex justify-center gap-4 pt-4 text-xs font-mono">
        <button
          type="button"
          onClick={() => reset()}
          className="px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

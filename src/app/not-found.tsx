import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-32 text-center space-y-6">
      <div className="text-sm font-mono uppercase tracking-wider text-indigo-400">
        404 — Not Found
      </div>
      <h1 className="text-4xl font-extrabold text-white tracking-tight">
        Page Does Not Exist
      </h1>
      <p className="text-slate-400 text-sm leading-relaxed">
        The route you requested could not be found or has been relocated.
      </p>
      <div className="flex justify-center gap-4 pt-4 text-xs font-mono">
        <Link
          href="/"
          className="px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
        >
          Return Home
        </Link>
        <Link
          href="/search"
          className="px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          Search Site
        </Link>
      </div>
    </div>
  );
}

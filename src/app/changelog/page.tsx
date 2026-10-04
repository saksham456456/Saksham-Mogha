import Link from "next/link";
import { getChangelog } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Changelog — Saksham Mogha",
  description: "Everything shipped, newest first: projects, apps, articles, and site updates.",
  path: "/changelog",
});

export default function ChangelogPage() {
  const entries = getChangelog();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <header className="space-y-4">
        <div className="text-xs font-mono uppercase tracking-wider text-indigo-400">
          Ship Log & History
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Changelog
        </h1>
        <p className="text-lg text-slate-300">
          A continuous record of software releases, applications, dev logs, and site improvements.
        </p>
      </header>

      <div className="relative border-l border-slate-800 ml-4 space-y-8 pl-6">
        {entries.map((entry, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline dot */}
            <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-slate-800 border-2 border-indigo-500 group-hover:scale-125 transition-transform" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono text-slate-500 mb-1">
              <time dateTime={entry.date}>{entry.date}</time>
              <span className="uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 w-fit">
                {entry.kind}
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-medium text-white hover:text-indigo-400 transition-colors">
              <Link href={entry.href}>
                {entry.title} →
              </Link>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

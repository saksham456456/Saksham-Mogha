import { pageMetadata } from "@/lib/seo";
import { defaultSearchItems } from "@/lib/search-items";
import Link from "next/link";

export const metadata = pageMetadata({
  title: "Search & Navigation Index — Saksham Mogha",
  description: "Complete search index of all pages, case studies, apps, and dev logs on Saksham Mogha's website.",
  path: "/search",
});

export default function SearchPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <header className="space-y-4">
        <div className="text-xs font-mono uppercase tracking-wider text-indigo-400">
          Global Directory
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Search & Navigation
        </h1>
        <p className="text-lg text-slate-300">
          Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700 text-xs">⌘K</kbd> or browse the full index of pages, projects, and articles below.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {defaultSearchItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between"
          >
            <div>
              <span className="font-medium text-white block">{item.title}</span>
              {item.tags && (
                <span className="text-xs font-mono text-slate-500">
                  {item.tags.join(", ")}
                </span>
              )}
            </div>
            <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              {item.category}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

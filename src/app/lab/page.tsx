import Link from "next/link";
import { getLabDemos } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { ExternalLink } from "@/components/ExternalLink";

export const metadata = pageMetadata({
  title: "Interactive Lab & Experiments — Saksham Mogha",
  description: "Playable live demos, web apps, and machine learning experiments sandboxed securely.",
  path: "/lab",
});

export default function LabPage() {
  const demos = getLabDemos();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <header className="space-y-4 max-w-3xl">
        <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
          Sandboxed Experiments
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Interactive Lab
        </h1>
        <p className="text-lg text-slate-300">
          Playable demos and live web applications running in strict, isolated sandbox environments.
        </p>
      </header>

      <div className="space-y-16">
        {demos.map((demoItem) => {
          const d = demoItem.meta.demo!;
          return (
            <section
              key={demoItem.meta.slug}
              id={demoItem.meta.slug}
              className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {demoItem.meta.title}
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">{demoItem.meta.summary}</p>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <Link
                    href={`/projects/${demoItem.meta.slug}`}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    Case Study →
                  </Link>
                  <ExternalLink
                    href={d.url}
                    className="px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 transition-colors"
                  >
                    Open Fullscreen ↗
                  </ExternalLink>
                </div>
              </div>

              {/* Secure Sandboxed Iframe */}
              <div className="w-full h-[520px] rounded-xl overflow-hidden border border-slate-700 bg-slate-950 relative">
                <iframe
                  src={d.url}
                  title={d.title}
                  sandbox="allow-scripts allow-same-origin allow-forms"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full border-0"
                />
              </div>

              <div className="text-xs font-mono text-slate-500 flex items-center justify-between">
                <span>Security: sandboxed with strict origin policy</span>
                <span>Target: {new URL(d.url).hostname}</span>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

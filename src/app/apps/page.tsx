import Link from "next/link";
import { getApps, getProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { ExternalLink } from "@/components/ExternalLink";

export const metadata = pageMetadata({
  title: "Google Play Apps Hub — Saksham Mogha",
  description: "Official Android applications, utilities, and games developed by Saksham Mogha on Google Play.",
  path: "/apps",
});

export default function AppsHubPage() {
  const publishedApps = getApps();
  // Also collect Android projects from work
  const androidProjects = getProjects().filter(
    (p) => p.meta.type === "app" || p.meta.stack.includes("Kotlin") || p.meta.stack.includes("Flutter")
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <header className="space-y-4 max-w-3xl">
        <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">
          Android Ecosystem
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Apps & Mobile Hub
        </h1>
        <p className="text-lg text-slate-300">
          Official hub for Android applications, utilities, and games created by Saksham Mogha. Built with Jetpack Compose, Kotlin Clean Architecture, and Flutter.
        </p>
      </header>

      {/* Published Apps Section */}
      {publishedApps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publishedApps.map((app) => (
            <article
              key={app.meta.slug}
              className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-emerald-400 font-semibold">Google Play Ready</span>
                  <span className="text-slate-500">{app.meta.packageName}</span>
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">
                  <Link href={`/apps/${app.meta.slug}`} className="hover:text-indigo-400 transition-colors">
                    {app.meta.title}
                  </Link>
                </h2>

                <p className="text-sm text-slate-300 mb-4">{app.meta.summary}</p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <Link href={`/apps/${app.meta.slug}`} className="text-indigo-400 hover:text-indigo-300 font-medium">
                  App Overview →
                </Link>
                {app.meta.playStoreUrl && (
                  <ExternalLink href={app.meta.playStoreUrl} className="text-emerald-400 hover:underline">
                    Get on Google Play ↗
                  </ExternalLink>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {/* Android Engineering Pipeline & Open Source Applications */}
      <section className="space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Android Applications & Production Repositories
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Native Kotlin (Jetpack Compose) and Flutter projects designed for mobile performance, privacy, and offline reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {androidProjects.map((proj) => (
            <div
              key={proj.meta.slug}
              className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 flex flex-col justify-between transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                    {proj.meta.type}
                  </span>
                  <span className="text-slate-500">{proj.meta.status}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  <Link href={`/projects/${proj.meta.slug}`} className="hover:text-indigo-400 transition-colors">
                    {proj.meta.title}
                  </Link>
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {proj.meta.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.meta.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <Link href={`/projects/${proj.meta.slug}`} className="text-indigo-400 hover:text-indigo-300">
                  Case Study →
                </Link>
                {proj.meta.links.repo && (
                  <ExternalLink href={proj.meta.links.repo} className="text-slate-400 hover:text-white underline">
                    Repository ↗
                  </ExternalLink>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Support & Policies Notice */}
      <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">Need App Support or Data Policies?</h3>
          <p className="text-sm text-slate-400">
            Access dedicated troubleshooting guides, refund policies, and privacy disclosures.
          </p>
        </div>
        <div className="flex gap-3 text-xs font-mono">
          <Link href="/support" className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium">
            Support Portal
          </Link>
          <Link href="/privacy" className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}

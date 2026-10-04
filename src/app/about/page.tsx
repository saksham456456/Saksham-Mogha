import { site } from "../../../content/site";
import { pageMetadata } from "@/lib/seo";
import { ExternalLink } from "@/components/ExternalLink";

export const metadata = pageMetadata({
  title: `About ${site.name}`,
  description: site.bio.short,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <header className="space-y-4">
        <div className="text-xs font-mono uppercase tracking-wider text-indigo-400">
          Background & Philosophy
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          About {site.name}
        </h1>
        <p className="text-xl text-slate-300 font-medium">
          {site.jobTitle} based in {site.country}.
        </p>
      </header>

      {/* Story & Philosophy */}
      <section className="space-y-6 text-slate-300 leading-relaxed text-base sm:text-lg">
        {site.bio.long.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}

        <div className="p-6 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-indigo-200">
          <h2 className="text-lg font-bold font-mono text-indigo-300 mb-2">Core Ethos</h2>
          <p className="italic text-base">
            &ldquo;{site.motto}&rdquo;
          </p>
          <p className="text-sm text-slate-400 mt-2">
            Every project is built from scratch with an emphasis on production quality, clean architecture, verifiable security, and speed.
          </p>
        </div>
      </section>

      {/* What I am working toward */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">What I Am Working Toward</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800">
            <h3 className="text-base font-semibold text-white mb-2">1. On-Device AI & Browser Inference</h3>
            <p className="text-sm text-slate-400">
              Shifting expensive cloud LLM pipelines to private, zero-latency WebLLM and WebGPU engines directly in users&apos; browsers.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800">
            <h3 className="text-base font-semibold text-white mb-2">2. Offline-First Mobile Architectures</h3>
            <p className="text-sm text-slate-400">
              Building native Android and cross-platform apps (Kotlin, Jetpack Compose, Flutter) that work completely offline while syncing seamlessly when online.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800">
            <h3 className="text-base font-semibold text-white mb-2">3. Competitive Consensus & Realtime Systems</h3>
            <p className="text-sm text-slate-400">
              Designing algorithms like pairwise Elo rating systems and high-throughput Redis streaming architectures.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800">
            <h3 className="text-base font-semibold text-white mb-2">4. Hardened Security by Default</h3>
            <p className="text-sm text-slate-400">
              Strict per-request CSP nonces, CSRF origin verification, and serverless edge rate limiting on all public entry points.
            </p>
          </div>
        </div>
      </section>

      {/* Complete Technical Stack */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">Technical Stack & Tooling</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Object.entries(site.stack).map(([category, items]) => (
            <div key={category} className="p-5 rounded-xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-xs font-mono uppercase text-indigo-400 mb-3 tracking-wider">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800/80 text-slate-200 border border-slate-700/60"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Verified Profiles */}
      <section className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800 space-y-3">
        <h2 className="text-sm font-mono uppercase tracking-wider text-slate-400">Verified Profiles</h2>
        <div className="flex flex-wrap gap-4 text-sm font-mono">
          {site.socials.map((soc) => (
            <ExternalLink
              key={soc.url}
              href={soc.url}
              rel="me"
              className="text-indigo-400 hover:text-indigo-300 underline"
            >
              {soc.label} ({soc.handle}) ↗
            </ExternalLink>
          ))}
        </div>
      </section>
    </div>
  );
}

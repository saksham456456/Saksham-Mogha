import { site } from "../../../content/site";
import { pageMetadata } from "@/lib/seo";
import { getProjects } from "@/lib/content";
import { ExternalLink } from "@/components/ExternalLink";
import { PrintButton } from "@/components/PrintButton";

export const metadata = pageMetadata({
  title: "Curriculum Vitae — Saksham Mogha",
  description: "Web resume and background of Saksham Mogha, independent app developer and AI engineer.",
  path: "/cv",
});

export default function CvPage() {
  const topProjects = getProjects().slice(0, 6);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-800 pb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">{site.name}</h1>
          <p className="text-lg text-indigo-400 font-mono mt-1">{site.jobTitle}</p>
          <p className="text-sm text-slate-400 mt-1">Location: {site.country} · Portfolio: {site.url}</p>
        </div>
        <div className="flex items-center gap-3">
          <PrintButton />
        </div>
      </header>

      {/* Profile Statement */}
      <section className="space-y-3">
        <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800/80 pb-2">
          Professional Summary
        </h2>
        <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
          {site.bio.short} Specializes in architecting low-latency on-device inference engines (WebLLM/WebGPU), full-stack Next.js systems, and offline-first Android apps with Jetpack Compose and Clean Architecture.
        </p>
      </section>

      {/* Technical Capabilities */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800/80 pb-2">
          Core Competencies & Stack
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          {Object.entries(site.stack).map(([category, items]) => (
            <div key={category} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
              <span className="font-semibold text-white block mb-1">{category}:</span>
              <span className="text-slate-400 font-mono text-xs">{items.join(", ")}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Production Software */}
      <section className="space-y-6">
        <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800/80 pb-2">
          Selected Software & Systems
        </h2>
        <div className="space-y-6">
          {topProjects.map((proj) => (
            <div key={proj.meta.slug} className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                <span className="font-bold text-white text-base">{proj.meta.title}</span>
                <span className="text-xs font-mono text-slate-500">{proj.meta.date}</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{proj.meta.summary}</p>
              <div className="text-xs font-mono text-slate-400">
                <span className="text-slate-500">Stack: </span>
                <span>{proj.meta.stack.join(" · ")}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Links & Verified Presence */}
      <section className="space-y-3 pt-6 border-t border-slate-800">
        <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 pb-2">
          Verified Profiles & Code
        </h2>
        <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-300">
          {site.socials.map((soc) => (
            <ExternalLink key={soc.url} href={soc.url} className="text-indigo-400 hover:underline">
              {soc.label}: {soc.url}
            </ExternalLink>
          ))}
        </div>
      </section>
    </div>
  );
}

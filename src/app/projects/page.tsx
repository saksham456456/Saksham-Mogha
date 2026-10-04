import Link from "next/link";
import { getProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { ExternalLink } from "@/components/ExternalLink";

export const metadata = pageMetadata({
  title: "Projects Hub — Saksham Mogha",
  description: "Explore web, mobile, and on-device ML projects built by Saksham Mogha.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <header className="space-y-4 max-w-3xl">
        <div className="text-xs font-mono uppercase tracking-wider text-indigo-400">
          Portfolio & Case Studies
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Projects Hub
        </h1>
        <p className="text-lg text-slate-300">
          Full-stack web applications, on-device browser machine learning models, and native Android software built with strict architecture and security.
        </p>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <article
            key={proj.meta.slug}
            className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-3">
                <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase">
                  {proj.meta.type}
                </span>
                <span className="text-slate-500">{proj.meta.date}</span>
              </div>

              <h2 className="text-xl font-bold text-white mb-2">
                <Link href={`/projects/${proj.meta.slug}`} className="hover:text-indigo-400 transition-colors">
                  {proj.meta.title}
                </Link>
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {proj.meta.summary}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {proj.meta.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
              <Link
                href={`/projects/${proj.meta.slug}`}
                className="text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Read Case Study →
              </Link>
              <div className="flex gap-3">
                {proj.meta.demo && (
                  <Link href={`/lab#${proj.meta.slug}`} className="text-cyan-400 hover:text-cyan-300 font-medium">
                    Demo ⚡
                  </Link>
                )}
                {proj.meta.links.live && (
                  <ExternalLink href={proj.meta.links.live} className="text-slate-400 hover:text-white underline">
                    Live ↗
                  </ExternalLink>
                )}
                {proj.meta.links.repo && (
                  <ExternalLink href={proj.meta.links.repo} className="text-slate-400 hover:text-white underline">
                    Code ↗
                  </ExternalLink>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

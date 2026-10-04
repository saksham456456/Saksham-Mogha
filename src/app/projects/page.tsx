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
            className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all flex flex-col justify-between shadow-xl hover:border-indigo-500/40"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-4">
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
                  {proj.meta.type}
                </span>
                <span className="text-gray-400">{proj.meta.date}</span>
              </div>

              <h2 className="text-2xl font-bold text-white mb-3">
                <Link href={`/projects/${proj.meta.slug}`} className="hover:text-indigo-400 transition-colors">
                  {proj.meta.title}
                </Link>
              </h2>

              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                {proj.meta.summary}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {proj.meta.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-2.5 py-1 rounded-lg bg-black/40 text-gray-300 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono">
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

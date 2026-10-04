import Link from "next/link";
import { site } from "../../content/site";
import { getFeatured, getPosts } from "@/lib/content";
import { TerminalNav } from "@/components/TerminalNav";
import { GitHubActivityStrip } from "@/components/GitHubActivityStrip";
import { ExternalLink } from "@/components/ExternalLink";

export default function Home() {
  const featured = getFeatured().slice(0, 4);
  const latestPosts = getPosts().slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Hero Section */}
      <section className="space-y-6">
        <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Available for high-impact engineering & building</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
              {site.name}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
              {site.tagline}
            </p>

            <p className="text-sm sm:text-base text-slate-400 font-mono">
              <span className="text-indigo-400 font-semibold">{site.motto}</span> Active since {site.activeSince} with 40+ public repositories spanning web, mobile, and on-device ML.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/projects"
                className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors"
              >
                Browse Projects
              </Link>
              <Link
                href="/apps"
                className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-sm transition-colors"
              >
                Play Store Hub
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-lg bg-transparent hover:bg-slate-900 text-slate-300 border border-slate-800 font-medium text-sm transition-colors"
              >
                Get in Touch →
              </Link>
            </div>
          </div>

          {/* Persona Avatar / Badge */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-tr from-indigo-900 via-slate-800 to-indigo-600 p-1 shadow-2xl">
              <div className="w-full h-full rounded-xl bg-slate-950 flex flex-col items-center justify-center p-4 text-center border border-indigo-500/20">
                <span className="text-3xl font-mono font-bold text-indigo-400">SM</span>
                <span className="text-xs font-mono uppercase text-slate-400 mt-1">SAKSHAM.DEV</span>
                <span className="text-[10px] text-emerald-400 font-mono mt-1">BUILDER</span>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Social Connections */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800/60 text-xs font-mono text-slate-400">
          <span className="text-slate-500 uppercase">Verified:</span>
          {site.socials.map((soc) => (
            <ExternalLink
              key={soc.url}
              href={soc.url}
              rel="me"
              className="text-slate-300 hover:text-indigo-400 transition-colors underline"
            >
              {soc.label} ({soc.handle}) ↗
            </ExternalLink>
          ))}
        </div>
      </section>

      {/* Signature Moment: Interactive Terminal */}
      <section aria-labelledby="terminal-heading" className="my-10">
        <h2 id="terminal-heading" className="sr-only">Interactive Terminal</h2>
        <TerminalNav />
      </section>

      {/* Live GitHub Activity Stream */}
      <GitHubActivityStrip />

      {/* Featured Projects Grid */}
      <section aria-labelledby="featured-projects" className="my-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 id="featured-projects" className="text-2xl font-bold text-white tracking-tight">
              Featured Work
            </h2>
            <p className="text-sm text-slate-400">Selected production applications and systems.</p>
          </div>
          <Link href="/projects" className="text-sm font-medium text-indigo-400 hover:text-indigo-300">
            View all ({getFeatured().length}+) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((proj) => (
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

                <h3 className="text-xl font-bold text-white mb-2">
                  <Link href={`/projects/${proj.meta.slug}`} className="hover:text-indigo-400 transition-colors">
                    {proj.meta.title}
                  </Link>
                </h3>

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

              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs font-mono">
                <Link
                  href={`/projects/${proj.meta.slug}`}
                  className="text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  Case Study →
                </Link>
                <div className="flex gap-3">
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
      </section>

      {/* Latest Writing */}
      {latestPosts.length > 0 && (
        <section aria-labelledby="latest-writing" className="my-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 id="latest-writing" className="text-2xl font-bold text-white tracking-tight">
                Latest Writing
              </h2>
              <p className="text-sm text-slate-400">Technical insights, architecture notes, and build stories.</p>
            </div>
            <Link href="/writing" className="text-sm font-medium text-indigo-400 hover:text-indigo-300">
              All articles →
            </Link>
          </div>

          <div className="space-y-4">
            {latestPosts.map((post) => (
              <article
                key={post.meta.slug}
                className="p-5 rounded-xl bg-slate-900/30 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    <Link href={`/writing/${post.meta.slug}`} className="hover:text-indigo-400 transition-colors">
                      {post.meta.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-slate-400 line-clamp-1">{post.meta.summary}</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-slate-500 whitespace-nowrap">
                  <time dateTime={post.meta.date}>{post.meta.date}</time>
                  <Link href={`/writing/${post.meta.slug}`} className="text-indigo-400 hover:text-indigo-300">
                    Read →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

import { ArrowRight, Smartphone, Code, Gamepad2, Sparkles, Terminal, ShieldCheck } from "lucide-react";
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-24">
      {/* 3D Hero Section (V1 Signature Look) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-8">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-indigo-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Independent App Developer & AI Engineer</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-mono uppercase tracking-widest text-indigo-400 font-semibold">
              Official Portal
            </h2>
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-none">
              {site.name}
            </h1>
            <div className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Crafting <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-400 to-cyan-400">
                Digital Experiences
              </span>
            </div>
          </div>

          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl">
            Welcome to the official developer portal of Saksham Mogha. I build innovative, high-performance applications, on-device AI engines, and games for the Google Play Store and modern web.
          </p>

          <p className="text-sm font-mono text-gray-400 italic">
            &ldquo;{site.motto}&rdquo;
          </p>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all shadow-lg hover:shadow-indigo-500/20 flex items-center gap-2 group text-sm"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/projects" 
              className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-all backdrop-blur-sm border border-white/15 text-sm"
            >
              Explore Projects
            </Link>
            <Link 
              href="/support" 
              className="px-8 py-4 bg-white/5 text-gray-300 font-semibold rounded-full hover:bg-white/10 hover:text-white transition-all backdrop-blur-sm border border-white/10 text-sm"
            >
              App Support
            </Link>
          </div>

          {/* Verified Identity Tags */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10 text-xs font-mono text-gray-400">
            <span className="text-gray-500 uppercase flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Verified Handles:
            </span>
            {site.socials.map((soc) => (
              <ExternalLink
                key={soc.url}
                href={soc.url}
                rel="me"
                className="text-gray-300 hover:text-indigo-400 transition-colors underline"
              >
                {soc.label} ({soc.handle}) ↗
              </ExternalLink>
            ))}
          </div>
        </div>

        {/* Floating 3D Cards Matrix (V1 signature staggered cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all shadow-2xl hover:scale-[1.02]">
            <Smartphone className="w-10 h-10 text-indigo-400 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-white">Utility Apps</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Android tools & focus companions built in Kotlin and Flutter designed to make your daily life easier and more productive.
            </p>
          </div>
          
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all shadow-2xl sm:translate-y-8 hover:scale-[1.02]">
            <Gamepad2 className="w-10 h-10 text-pink-400 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-white">Immersive Games</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Engaging cognitive training, gamified educational blackboard lessons, and interactive 3D WebGL experiences.
            </p>
          </div>
          
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all shadow-2xl sm:-translate-y-8 hover:scale-[1.02]">
            <Code className="w-10 h-10 text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-white">Clean Code</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Architected with strict TypeScript, App Router, on-device WebLLM/WebGPU machine learning, and hardened security nonces.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all shadow-2xl hover:scale-[1.02]">
            <Sparkles className="w-10 h-10 text-amber-400 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-white">On-Device ML</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Private, local browser inference without API keys or cloud server costs. Instant response on the GPU.
            </p>
          </div>
        </div>
      </section>

      {/* Signature Moment: Interactive Terminal */}
      <section aria-labelledby="terminal-heading" className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-400">
          <Terminal className="w-4 h-4" />
          <span>Interactive Shell Environment</span>
        </div>
        <TerminalNav />
      </section>

      {/* Live GitHub Activity Strip */}
      <GitHubActivityStrip />

      {/* Featured Projects Grid (Glassmorphic 3D styling) */}
      <section aria-labelledby="featured-projects" className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="featured-projects" className="text-3xl font-extrabold text-white tracking-tight">
              Featured Work
            </h2>
            <p className="text-gray-400 text-sm mt-1">High-performance production applications and systems.</p>
          </div>
          <Link href="/projects" className="text-sm font-semibold text-indigo-400 hover:text-indigo-300">
            View all projects ({getFeatured().length}+) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featured.map((proj) => (
            <div
              key={proj.meta.slug}
              className="p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all shadow-xl flex flex-col justify-between group hover:border-indigo-500/40"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-4">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
                    {proj.meta.type}
                  </span>
                  <span className="text-gray-400">{proj.meta.date}</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                  <Link href={`/projects/${proj.meta.slug}`}>
                    {proj.meta.title}
                  </Link>
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed mb-6">
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

              <div className="flex items-center justify-between pt-6 border-t border-white/10 text-xs font-mono">
                <Link
                  href={`/projects/${proj.meta.slug}`}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  Read Case Study →
                </Link>
                <div className="flex gap-4">
                  {proj.meta.links.live && (
                    <ExternalLink href={proj.meta.links.live} className="text-gray-300 hover:text-white underline">
                      Live App ↗
                    </ExternalLink>
                  )}
                  {proj.meta.links.repo && (
                    <ExternalLink href={proj.meta.links.repo} className="text-gray-300 hover:text-white underline">
                      Code ↗
                    </ExternalLink>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Technical Dev Logs */}
      {latestPosts.length > 0 && (
        <section aria-labelledby="latest-writing" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="latest-writing" className="text-3xl font-extrabold text-white tracking-tight">
                Latest Writing
              </h2>
              <p className="text-gray-400 text-sm mt-1">Architecture breakdowns and lessons learned while shipping.</p>
            </div>
            <Link href="/writing" className="text-sm font-semibold text-indigo-400 hover:text-indigo-300">
              All articles →
            </Link>
          </div>

          <div className="space-y-4">
            {latestPosts.map((post) => (
              <div
                key={post.meta.slug}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    <Link href={`/writing/${post.meta.slug}`} className="hover:text-indigo-400 transition-colors">
                      {post.meta.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-1">{post.meta.summary}</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-gray-400 whitespace-nowrap">
                  <time dateTime={post.meta.date}>{post.meta.date}</time>
                  <Link href={`/writing/${post.meta.slug}`} className="text-indigo-400 hover:text-indigo-300 font-semibold">
                    Read →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

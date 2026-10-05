import { ArrowRight, Smartphone, Code, Gamepad2, Sparkles, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { site } from "../../content/site";
import { getFeatured, getPosts } from "@/lib/content";
import { ExternalLink } from "@/components/ExternalLink";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";

export default function Home() {
  const featured = getFeatured().slice(0, 4);
  const latestPosts = getPosts().slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-32">
      {/* 3D Hero Section (V1 Signature Look) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-8">
        <div className="space-y-8">
          <Reveal delay={0.1} onLoad y={20}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-indigo-300 text-xs font-mono shadow-[0_0_15px_rgba(79,70,229,0.2)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span>Independent App Developer & AI Engineer</span>
            </div>
          </Reveal>

          <Reveal delay={0.2} onLoad y={20}>
            <div className="space-y-4">
              <h2 className="text-xl font-mono uppercase tracking-widest text-indigo-400 font-semibold drop-shadow-[0_0_10px_rgba(129,140,248,0.4)]">
                Official Portal
              </h2>
              <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                {site.name}
              </h1>
              <div className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Crafting <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-400 to-cyan-400 drop-shadow-[0_0_30px_rgba(129,140,248,0.4)]">
                  Digital Experiences
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3} onLoad y={20}>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl">
              Welcome to the official developer portal of Saksham Mogha. I build innovative, high-performance applications, on-device AI engines, and games for the Google Play Store and modern web.
            </p>
          </Reveal>
          
          <Reveal delay={0.4} onLoad y={20}>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                href="/contact" 
                className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] flex items-center gap-2 group text-sm"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/projects" 
                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-all backdrop-blur-md border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] text-sm"
              >
                Explore Projects
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.5} onLoad y={20}>
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
                  className="text-gray-300 hover:text-indigo-400 transition-colors underline decoration-white/20 underline-offset-4"
                >
                  {soc.label} ({soc.handle}) ↗
                </ExternalLink>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Floating 3D Cards Matrix (V1 signature staggered cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
          <Reveal delay={0.2} onLoad x={20}>
            <TiltCard>
              <div className="p-8 h-full flex flex-col justify-center">
                <Smartphone className="w-10 h-10 text-indigo-400 mb-4 drop-shadow-[0_0_10px_rgba(129,140,248,0.5)]" />
                <h3 className="text-xl font-bold mb-2 text-white">Utility Apps</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Android tools & focus companions built in Kotlin and Flutter designed to make your daily life easier and more productive.
                </p>
              </div>
            </TiltCard>
          </Reveal>
          
          <Reveal delay={0.3} onLoad x={20} className="sm:translate-y-8">
            <TiltCard>
              <div className="p-8 h-full flex flex-col justify-center">
                <Gamepad2 className="w-10 h-10 text-pink-400 mb-4 drop-shadow-[0_0_10px_rgba(244,114,182,0.5)]" />
                <h3 className="text-xl font-bold mb-2 text-white">Immersive Games</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Engaging cognitive training, gamified educational blackboard lessons, and interactive 3D WebGL experiences.
                </p>
              </div>
            </TiltCard>
          </Reveal>
          
          <Reveal delay={0.4} onLoad x={20} className="sm:-translate-y-8">
            <TiltCard>
              <div className="p-8 h-full flex flex-col justify-center">
                <Code className="w-10 h-10 text-cyan-400 mb-4 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                <h3 className="text-xl font-bold mb-2 text-white">Clean Code</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Architected with strict TypeScript, App Router, on-device WebLLM/WebGPU machine learning, and hardened security nonces.
                </p>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal delay={0.5} onLoad x={20}>
            <TiltCard>
              <div className="p-8 h-full flex flex-col justify-center">
                <Sparkles className="w-10 h-10 text-amber-400 mb-4 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                <h3 className="text-xl font-bold mb-2 text-white">On-Device ML</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Private, local browser inference without API keys or cloud server costs. Instant response on the GPU.
                </p>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      {/* Featured Projects Grid (Glassmorphic 3D styling) */}
      <section aria-labelledby="featured-projects" className="space-y-12">
        <Reveal delay={0.1}>
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div>
              <h2 id="featured-projects" className="text-3xl font-extrabold text-white tracking-tight">
                Featured Work
              </h2>
              <p className="text-gray-400 text-sm mt-2">High-performance production applications and systems.</p>
            </div>
            <Link href="/projects" className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
              View all projects ({getFeatured().length}+) →
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featured.map((proj, idx) => (
            <Reveal key={proj.meta.slug} delay={0.1 * (idx + 1)}>
              <TiltCard className="h-full">
                <div className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-6">
                      <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 uppercase shadow-[0_0_10px_rgba(99,102,241,0.1)]">
                        {proj.meta.type}
                      </span>
                      <span className="text-gray-500">{proj.meta.date}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-cyan-400 transition-all">
                      <Link href={`/projects/${proj.meta.slug}`} className="before:absolute before:inset-0">
                        {proj.meta.title}
                      </Link>
                    </h3>

                    <p className="text-gray-300 text-sm leading-relaxed mb-8">
                      {proj.meta.summary}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {proj.meta.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 border border-white/10 backdrop-blur-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/10 text-xs font-mono relative z-20">
                    <span className="text-indigo-400 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read Case Study <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <div className="flex gap-4">
                      {proj.meta.links.live && (
                        <ExternalLink href={proj.meta.links.live} className="text-gray-400 hover:text-white transition-colors">
                          Live ↗
                        </ExternalLink>
                      )}
                      {proj.meta.links.repo && (
                        <ExternalLink href={proj.meta.links.repo} className="text-gray-400 hover:text-white transition-colors">
                          Code ↗
                        </ExternalLink>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Latest Technical Dev Logs */}
      {latestPosts.length > 0 && (
        <section aria-labelledby="latest-writing" className="space-y-12">
          <Reveal delay={0.1}>
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div>
                <h2 id="latest-writing" className="text-3xl font-extrabold text-white tracking-tight">
                  Latest Writing
                </h2>
                <p className="text-gray-400 text-sm mt-2">Architecture breakdowns and lessons learned while shipping.</p>
              </div>
              <Link href="/writing" className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                All articles →
              </Link>
            </div>
          </Reveal>

          <div className="space-y-4">
            {latestPosts.map((post, idx) => (
              <Reveal key={post.meta.slug} delay={0.1 * (idx + 1)}>
                <TiltCard max={3}>
                  <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                        <Link href={`/writing/${post.meta.slug}`} className="before:absolute before:inset-0">
                          {post.meta.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-1">{post.meta.summary}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono text-gray-500 whitespace-nowrap relative z-20">
                      <time dateTime={post.meta.date}>{post.meta.date}</time>
                      <span className="text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

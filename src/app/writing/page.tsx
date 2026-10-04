import Link from "next/link";
import { getPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Writing & Dev Logs — Saksham Mogha",
  description: "Technical build stories, architecture breakdowns, and engineering notes by Saksham Mogha.",
  path: "/writing",
});

export default function WritingPage() {
  const posts = getPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <header className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono uppercase tracking-wider text-indigo-400">
            Dev Logs & Insights
          </div>
          <a
            href="/rss.xml"
            className="text-xs font-mono text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-900 border border-slate-800"
          >
            RSS Feed ↗
          </a>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Writing
        </h1>
        <p className="text-lg text-slate-300">
          Stories behind the software, architectural decisions, security audits, and lessons learned while shipping.
        </p>
      </header>

      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post.meta.slug}
            className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-colors space-y-3"
          >
            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <time dateTime={post.meta.date}>{post.meta.date}</time>
              <div className="flex gap-2">
                {post.meta.tags.map((tag) => (
                  <span key={tag} className="text-indigo-400">#{tag}</span>
                ))}
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white">
              <Link href={`/writing/${post.meta.slug}`} className="hover:text-indigo-400 transition-colors">
                {post.meta.title}
              </Link>
            </h2>

            <p className="text-slate-300 leading-relaxed text-sm">
              {post.meta.summary}
            </p>

            <div className="pt-2 flex justify-end">
              <Link
                href={`/writing/${post.meta.slug}`}
                className="text-xs font-mono text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Read Article →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

import { getNow } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { renderMDX } from "@/lib/mdx";

export const metadata = pageMetadata({
  title: "Now — Saksham Mogha",
  description: "What Saksham Mogha is focused on right now, active builds, and roadmap.",
  path: "/now",
});

export default async function NowPage() {
  const { meta, body } = getNow();
  const mdxContent = await renderMDX(body);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      <header className="space-y-4 border-b border-slate-800 pb-8">
        <div className="flex items-center justify-between text-xs font-mono text-slate-500">
          <span className="text-emerald-400 font-semibold uppercase">Active Focus</span>
          <span>Last updated: {meta.updated}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          What I Am Doing Now
        </h1>
        <p className="text-slate-400 text-sm">
          A public log of current technical priorities, active codebases, and ongoing research.
        </p>
      </header>

      <div className="prose prose-invert prose-slate max-w-none space-y-6 text-slate-300 leading-relaxed text-base">
        {mdxContent}
      </div>
    </div>
  );
}

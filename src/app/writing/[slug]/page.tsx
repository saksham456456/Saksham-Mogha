import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, getPosts, relatedWork } from "@/lib/content";
import { pageMetadata, articleLd } from "@/lib/seo";
import { renderMDX } from "@/lib/mdx";
import { JsonLd } from "@/components/JsonLd";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map((p) => ({ slug: p.meta.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return pageMetadata({
    title: post.meta.title,
    description: post.meta.summary,
    path: `/writing/${post.meta.slug}`,
    type: "article",
    publishedTime: post.meta.date,
  });
}

export default async function PostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const mdxContent = await renderMDX(post.body);
  const relatedProjects = relatedWork(post.meta);

  const jsonLdData = articleLd({
    title: post.meta.title,
    summary: post.meta.summary,
    slug: post.meta.slug,
    date: post.meta.date,
    updated: post.meta.updated,
  });

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      <JsonLd data={jsonLdData} />

      <header className="space-y-4 border-b border-slate-800 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/writing" className="hover:text-white transition-colors">
            ← Writing
          </Link>
          <span>/</span>
          <time dateTime={post.meta.date}>{post.meta.date}</time>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {post.meta.title}
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
          {post.meta.summary}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {post.meta.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-indigo-400 border border-slate-800"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* Article Body */}
      <div className="prose prose-invert prose-slate max-w-none space-y-6 text-slate-300 leading-relaxed text-base">
        {mdxContent}
      </div>

      {/* Tag Cross-Linking: Related Projects */}
      {relatedProjects.length > 0 && (
        <section aria-labelledby="related-work" className="pt-8 border-t border-slate-800 space-y-4">
          <h2 id="related-work" className="text-lg font-bold text-white">
            Related Projects & Software
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedProjects.map((work) => (
              <Link
                key={work.meta.slug}
                href={`/projects/${work.meta.slug}`}
                className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 block transition-colors"
              >
                <div className="font-semibold text-white hover:text-indigo-400">{work.meta.title}</div>
                <div className="text-xs text-slate-400 line-clamp-2 mt-1">{work.meta.summary}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

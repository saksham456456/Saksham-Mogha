import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, getProjects, relatedPosts } from "@/lib/content";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { renderMDX } from "@/lib/mdx";
import { JsonLd } from "@/components/JsonLd";
import { ExternalLink } from "@/components/ExternalLink";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((p) => ({ slug: p.meta.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return pageMetadata({
    title: `${project.meta.title} — Case Study`,
    description: project.meta.summary,
    path: `/projects/${project.meta.slug}`,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const mdxContent = await renderMDX(project.body);
  const posts = relatedPosts(project.meta);

  const jsonLdData = softwareLd({
    title: project.meta.title,
    summary: project.meta.summary,
    slug: project.meta.slug,
    type: project.meta.type,
    isApp: false,
    repo: project.meta.links.repo,
    live: project.meta.links.live,
  });

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      <JsonLd data={jsonLdData} />

      {/* Header */}
      <header className="space-y-4 border-b border-slate-800 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/projects" className="hover:text-white transition-colors">
            ← Projects Hub
          </Link>
          <span>/</span>
          <span className="uppercase text-indigo-400">{project.meta.type}</span>
          <span>/</span>
          <span>{project.meta.date}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {project.meta.title}
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
          {project.meta.summary}
        </p>

        {/* Stack badges */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.meta.stack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-slate-800"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links bar */}
        <div className="flex flex-wrap items-center gap-4 pt-4 text-sm font-mono">
          {project.meta.links.live && (
            <ExternalLink
              href={project.meta.links.live}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
            >
              Visit Live App ↗
            </ExternalLink>
          )}
          {project.meta.links.repo && (
            <ExternalLink
              href={project.meta.links.repo}
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors"
            >
              Source Code ↗
            </ExternalLink>
          )}
          {project.meta.demo && (
            <Link
              href={`/lab#${project.meta.slug}`}
              className="px-4 py-2 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800 hover:bg-cyan-900 transition-colors"
            >
              Play Interactive Demo ⚡
            </Link>
          )}
        </div>
      </header>

      {/* Case Study Content */}
      <div className="prose prose-invert prose-slate max-w-none space-y-6 text-slate-300 leading-relaxed text-base">
        {mdxContent}
      </div>

      {/* Attribution & Source */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-500 flex items-center justify-between">
        <span>Verified Public Repository</span>
        <ExternalLink href={project.meta.source} className="text-indigo-400 hover:underline">
          GitHub Source ↗
        </ExternalLink>
      </div>

      {/* Tag Cross-Linking: Related Writing */}
      {posts.length > 0 && (
        <section aria-labelledby="related-posts" className="pt-8 border-t border-slate-800">
          <h2 id="related-posts" className="text-lg font-bold text-white mb-4">
            Related Dev Logs & Writing
          </h2>
          <div className="space-y-3">
            {posts.map((post) => (
              <Link
                key={post.meta.slug}
                href={`/writing/${post.meta.slug}`}
                className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 block transition-colors"
              >
                <div className="font-medium text-white hover:text-indigo-400">{post.meta.title}</div>
                <div className="text-xs text-slate-400 mt-1">{post.meta.summary}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

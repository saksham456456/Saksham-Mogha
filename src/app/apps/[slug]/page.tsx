import { notFound } from "next/navigation";
import Link from "next/link";
import { getApp, getApps } from "@/lib/content";
import { pageMetadata, softwareLd } from "@/lib/seo";
import { renderMDX } from "@/lib/mdx";
import { JsonLd } from "@/components/JsonLd";
import { ExternalLink } from "@/components/ExternalLink";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const apps = getApps();
  return apps.map((a) => ({ slug: a.meta.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) return {};

  return pageMetadata({
    title: `${app.meta.title} — Google Play App`,
    description: app.meta.summary,
    path: `/apps/${app.meta.slug}`,
  });
}

export default async function AppDetailPage({ params }: Props) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();

  const mdxContent = await renderMDX(app.body);

  const jsonLdData = softwareLd({
    title: app.meta.title,
    summary: app.meta.summary,
    slug: app.meta.slug,
    playStoreUrl: app.meta.playStoreUrl,
    type: app.meta.type,
    isApp: true,
  });

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <JsonLd data={jsonLdData} />

      <header className="space-y-4 border-b border-slate-800 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/apps" className="hover:text-white transition-colors">
            ← Apps Hub
          </Link>
          <span>/</span>
          <span className="text-emerald-400 uppercase">Google Play</span>
          <span>/</span>
          <span>{app.meta.packageName}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          {app.meta.title}
        </h1>

        <p className="text-xl text-slate-300 leading-relaxed">
          {app.meta.summary}
        </p>

        {/* Action badges */}
        <div className="flex flex-wrap items-center gap-4 pt-4 text-sm font-mono">
          {app.meta.playStoreUrl && (
            <ExternalLink
              href={app.meta.playStoreUrl}
              className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors flex items-center gap-2"
            >
              <span>Get on Google Play</span>
              <span>↗</span>
            </ExternalLink>
          )}
          <Link
            href="/support"
            className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
          >
            App Support & FAQs
          </Link>
          <Link
            href={app.meta.privacyUrl}
            className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </header>

      {/* Features list */}
      {app.meta.features.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight">Key Features</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {app.meta.features.map((feat, idx) => (
              <li
                key={idx}
                className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-sm text-slate-300 flex items-start gap-2"
              >
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* App Description */}
      <div className="prose prose-invert prose-slate max-w-none space-y-6 text-slate-300 leading-relaxed">
        {mdxContent}
      </div>

      {/* Data Handling & Privacy Disclosure */}
      <section className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <span>Data Safety & Permissions</span>
        </h2>
        <p className="text-sm text-slate-400">
          {app.meta.data.collectsUserData
            ? "This application may collect certain usage statistics to improve reliability."
            : "This application does NOT collect, store, or transmit any personal user data."}
        </p>
        {app.meta.data.deletion && (
          <div className="pt-2 text-xs font-mono text-slate-400">
            <span className="text-amber-400 uppercase">Data Deletion: </span>
            <span>{app.meta.data.deletion}</span>
          </div>
        )}
      </section>
    </article>
  );
}

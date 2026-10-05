import { site } from "../../../content/site";
import { pageMetadata } from "@/lib/seo";
import { ExternalLink } from "@/components/ExternalLink";

export const metadata = pageMetadata({
  title: "Media Kit & Official Bio — Saksham Mogha",
  description: "Official press kit, biographical copy, and verified links for Saksham Mogha.",
  path: "/media",
});

export default function MediaKitPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <header className="space-y-4">
        <div className="text-xs font-mono uppercase tracking-wider text-indigo-400">
          Press & Authority
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Media Kit
        </h1>
        <p className="text-lg text-slate-300">
          Single source of truth for biographical facts, naming conventions, and verified links for Saksham Mogha.
        </p>
      </header>

      {/* Naming Convention */}
      <section className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-white">Official Name & Handling</h2>
        <div className="space-y-2 text-sm text-slate-300">
          <p>
            <strong className="text-white">Full Name:</strong> Saksham Mogha
          </p>
          <p>
            <strong className="text-white">Secondary Handles:</strong> saksham456456 (GitHub), SAKSHAM_456456 (X/Twitter)
          </p>
          <p>
            <strong className="text-white">Brand / Project Name:</strong> SAKSHAM.DEV
          </p>
          <p className="text-xs text-slate-400 font-mono pt-2 border-t border-slate-800">
            Note: Disambiguation filter active. Saksham Mogha does not operate unverified academic or sports pages without cryptographic/handle linkage.
          </p>
        </div>
      </section>

      {/* Short Bio */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">Short Bio (for conference blurbs & summaries)</h2>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-300 font-mono">
          &ldquo;{site.bio.short}&rdquo;
        </div>
      </section>

      {/* Long Bio */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">Long Bio (for articles & press features)</h2>
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4 text-sm text-slate-300 leading-relaxed">
          {site.bio.long.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </section>

      {/* Official Verified Links */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white">Official Canonical Links</h2>
        <div className="space-y-2 text-sm font-mono">
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">Canonical Website:</span>
            <ExternalLink href={site.url} className="text-indigo-400 hover:underline">{site.url}</ExternalLink>
          </div>
          {site.socials.map((s) => (
            <div key={s.url} className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">{s.label}:</span>
              <ExternalLink href={s.url} className="text-indigo-400 hover:underline">{s.url}</ExternalLink>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

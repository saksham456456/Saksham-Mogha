import Link from "next/link";
import { site } from "../../content/site";
import { ExternalLink } from "./ExternalLink";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950/80 mt-auto py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Identity column */}
          <div className="md:col-span-2 space-y-3">
            <Link href="/" className="text-lg font-bold font-mono tracking-tight text-white">
              {site.name}
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {site.tagline}
            </p>
            <div className="flex items-center gap-4 pt-2">
              {site.socials.map((soc) => (
                <ExternalLink
                  key={soc.url}
                  href={soc.url}
                  rel={soc.verified ? "me" : undefined}
                  className="text-xs font-mono text-indigo-400 hover:text-indigo-300 underline"
                >
                  {soc.label}
                </ExternalLink>
              ))}
            </div>
          </div>

          {/* Hub navigation */}
          <div>
            <h3 className="text-xs font-mono uppercase text-slate-500 tracking-wider mb-3">Sections</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/projects" className="text-slate-400 hover:text-white transition-colors">Projects Hub</Link></li>
              <li><Link href="/apps" className="text-slate-400 hover:text-white transition-colors">Play Store Apps</Link></li>
              <li><Link href="/lab" className="text-slate-400 hover:text-white transition-colors">Interactive Lab</Link></li>
              <li><Link href="/writing" className="text-slate-400 hover:text-white transition-colors">Writing & Notes</Link></li>
              <li><Link href="/now" className="text-slate-400 hover:text-white transition-colors">Now</Link></li>
              <li><Link href="/changelog" className="text-slate-400 hover:text-white transition-colors">Changelog</Link></li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="text-xs font-mono uppercase text-slate-500 tracking-wider mb-3">Support & Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/support" className="text-slate-400 hover:text-white transition-colors">App Support</Link></li>
              <li><Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact Form</Link></li>
              <li><Link href="/cv" className="text-slate-400 hover:text-white transition-colors">Curriculum Vitae</Link></li>
              <li><Link href="/media" className="text-slate-400 hover:text-white transition-colors">Media / Press Kit</Link></li>
              <li><a href="/rss.xml" className="text-slate-400 hover:text-white transition-colors font-mono text-xs">RSS Feed ↗</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
          <div>
            © {currentYear} Saksham Mogha. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Built with Next.js & Strict Security</span>
            <a href="/.well-known/security.txt" className="hover:text-slate-400 underline">security.txt</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

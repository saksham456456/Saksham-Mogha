import Link from "next/link";
import { site } from "../../content/site";
import { ExternalLink } from "./ExternalLink";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-12 bg-black/50 backdrop-blur-md border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Identity column */}
          <div className="md:col-span-2 space-y-3">
            <Link href="/" className="text-xl font-bold font-mono tracking-tighter text-white">
              SAKSHAM<span className="text-indigo-500">.DEV</span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Official developer portal, Google Play applications, and production systems created by Saksham Mogha.
            </p>
            <div className="flex items-center gap-4 pt-2">
              {site.socials.map((soc) => (
                <ExternalLink
                  key={soc.url}
                  href={soc.url}
                  rel={soc.verified ? "me" : undefined}
                  className="text-xs font-mono text-indigo-400 hover:text-white transition-colors underline"
                >
                  {soc.label} ({soc.handle}) ↗
                </ExternalLink>
              ))}
            </div>
          </div>

          {/* Quick Hub Navigation */}
          <div>
            <h3 className="text-xs font-mono uppercase text-gray-500 tracking-wider mb-3">Portfolio & Hubs</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/projects" className="text-gray-400 hover:text-white transition-colors">Projects Hub</Link></li>
              <li><Link href="/apps" className="text-gray-400 hover:text-white transition-colors">Google Play Apps</Link></li>
              <li><Link href="/lab" className="text-gray-400 hover:text-white transition-colors">Playable 3D Lab</Link></li>
              <li><Link href="/writing" className="text-gray-400 hover:text-white transition-colors">Writing & Dev Logs</Link></li>
              <li><Link href="/now" className="text-gray-400 hover:text-white transition-colors">Now Page</Link></li>
              <li><Link href="/changelog" className="text-gray-400 hover:text-white transition-colors">Changelog</Link></li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="text-xs font-mono uppercase text-gray-500 tracking-wider mb-3">Support & Policies</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/support" className="text-gray-400 hover:text-white transition-colors">App Support & FAQ</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Form</Link></li>
              <li><Link href="/cv" className="text-gray-400 hover:text-white transition-colors">Curriculum Vitae</Link></li>
              <li><Link href="/media" className="text-gray-400 hover:text-white transition-colors">Media / Press Kit</Link></li>
              <li><a href="/rss.xml" className="text-gray-400 hover:text-white transition-colors font-mono text-xs">RSS Feed ↗</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 font-mono gap-4">
          <div>
            © {currentYear} Saksham Mogha. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Built with Next.js & Hardened Security</span>
            <a href="/.well-known/security.txt" className="hover:text-white underline">security.txt</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

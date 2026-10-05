import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SceneWrapper } from "@/components/3d/SceneWrapper";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SkipLink } from "@/components/SkipLink";
import { JsonLd } from "@/components/JsonLd";
import { personLd, websiteLd, absoluteUrl } from "@/lib/seo";
import { site } from "../../content/site";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.jobTitle}`,
    template: `%s | ${site.name}`,
  },
  description: site.bio.short,
  applicationName: site.brand,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Saksham Mogha",
    "Saksham Mogha developer",
    "Saksham Mogha portfolio",
    "AI Engineer",
    "Android Developer",
    "Next.js",
    "WebLLM",
    "Google Play Developer",
  ],
  alternates: {
    canonical: site.url,
    types: {
      "application/rss+xml": absoluteUrl("/rss.xml"),
    },
  },
  openGraph: {
    title: `${site.name} — ${site.jobTitle}`,
    description: site.bio.short,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.jobTitle}`,
    description: site.bio.short,
    creator: "@SAKSHAM_456456",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-black text-white min-h-screen flex flex-col font-sans antialiased selection:bg-indigo-500/30 selection:text-white">
        <SmoothScroll />
        <SceneWrapper />
        <SkipLink />
        <JsonLd data={[personLd(), websiteLd()]} />
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

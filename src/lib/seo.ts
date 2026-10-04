import type { Metadata } from "next";
import { site } from "../../content/site";

/**
 * Every page builds its metadata through `pageMetadata`. Title and
 * description are required at the type level, so no page ships without them.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: `/${string}`;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  noIndex?: boolean;
}): Metadata {
  if (!title.trim() || !description.trim()) {
    throw new Error(`Missing title/description for ${path}`);
  }
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url, types: { "application/rss+xml": absoluteUrl("/rss.xml") } },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "en_US",
      type,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@SAKSHAM_456456",
    },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}

export function absoluteUrl(path: string) {
  return `${site.url}${path === "/" ? "" : path}`;
}

export const verifiedProfiles = () =>
  site.socials.filter((s) => s.verified).map((s) => s.url);

/* ---------------- JSON-LD builders ---------------- */

export const personLd = () => ({
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  alternateName: site.handle,
  url: site.url,
  jobTitle: site.jobTitle,
  description: site.bio.short,
  ...(site.photo ? { image: absoluteUrl(site.photo.src) } : { image: absoluteUrl("/opengraph-image") }),
  address: { "@type": "PostalAddress", addressCountry: "IN" },
  knowsAbout: Object.values(site.stack).flat(),
  sameAs: verifiedProfiles(),
});

export const websiteLd = () => ({
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  description: site.tagline,
  inLanguage: "en",
  publisher: { "@id": `${site.url}/#person` },
  author: { "@id": `${site.url}/#person` },
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absoluteUrl(it.path),
  })),
});

export const articleLd = (p: { title: string; summary: string; slug: string; date: string; updated?: string }) => ({
  "@type": "BlogPosting",
  headline: p.title,
  description: p.summary,
  datePublished: p.date,
  dateModified: p.updated ?? p.date,
  url: absoluteUrl(`/writing/${p.slug}`),
  mainEntityOfPage: absoluteUrl(`/writing/${p.slug}`),
  image: absoluteUrl(`/writing/${p.slug}/opengraph-image`),
  author: { "@id": `${site.url}/#person` },
  publisher: { "@id": `${site.url}/#person` },
});

export const softwareLd = (a: {
  title: string;
  summary: string;
  slug: string;
  playStoreUrl?: string;
  type: string;
  isApp: boolean;
  repo?: string;
  live?: string;
}) => ({
  "@type": a.isApp ? "MobileApplication" : "SoftwareApplication",
  name: a.title,
  description: a.summary,
  url: absoluteUrl(a.isApp ? `/apps/${a.slug}` : `/projects/${a.slug}`),
  applicationCategory: a.type === "game" ? "GameApplication" : a.isApp ? "UtilitiesApplication" : "DeveloperApplication",
  ...(a.isApp ? { operatingSystem: "Android" } : {}),
  ...(a.playStoreUrl ? { installUrl: a.playStoreUrl } : {}),
  ...(a.repo || a.live ? { sameAs: [a.repo, a.live].filter(Boolean) } : {}),
  author: { "@id": `${site.url}/#person` },
  ...(a.isApp ? { offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } } : {}),
});

/**
 * Serialize JSON-LD safely for a <script> tag: escape `<`, `>`, `&` and
 * line separators so the payload can never close the tag or inject markup.
 */
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

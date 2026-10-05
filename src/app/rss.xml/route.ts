import { site } from "../../../content/site";
import { getPosts, getProjects } from "@/lib/content";

export const runtime = "nodejs";

export async function GET() {
  const posts = getPosts();
  const projects = getProjects().slice(0, 5);

  const items = [
    ...posts.map((p) => ({
      title: p.meta.title,
      link: `${site.url}/writing/${p.meta.slug}`,
      description: p.meta.summary,
      pubDate: new Date(p.meta.date).toUTCString(),
      guid: `${site.url}/writing/${p.meta.slug}`,
    })),
    ...projects.map((pr) => ({
      title: `[Project] ${pr.meta.title}`,
      link: `${site.url}/projects/${pr.meta.slug}`,
      description: pr.meta.summary,
      pubDate: new Date(pr.meta.date).toUTCString(),
      guid: `${site.url}/projects/${pr.meta.slug}`,
    })),
  ];

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${site.name} — Dev Logs &amp; Releases</title>
  <link>${site.url}</link>
  <description>${site.tagline}</description>
  <language>en-us</language>
  <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />
  ${items
    .map(
      (item) => `
  <item>
    <title><![CDATA[${item.title}]]></title>
    <link>${item.link}</link>
    <guid isPermaLink="true">${item.guid}</guid>
    <description><![CDATA[${item.description}]]></description>
    <pubDate>${item.pubDate}</pubDate>
  </item>`
    )
    .join("")}
</channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

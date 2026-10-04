import type { MetadataRoute } from "next";
import { site } from "../../content/site";
import { getProjects, getApps, getPosts } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = site.url;
  const now = new Date().toISOString().split("T")[0];

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/apps`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/lab`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/writing`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/now`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/changelog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/cv`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/media`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/support`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = getProjects().map((p) => ({
    url: `${baseUrl}/projects/${p.meta.slug}`,
    lastModified: p.meta.date,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const appRoutes: MetadataRoute.Sitemap = getApps().map((a) => ({
    url: `${baseUrl}/apps/${a.meta.slug}`,
    lastModified: a.meta.date,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const postRoutes: MetadataRoute.Sitemap = getPosts().map((post) => ({
    url: `${baseUrl}/writing/${post.meta.slug}`,
    lastModified: post.meta.updated ?? post.meta.date,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...appRoutes, ...postRoutes];
}

import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { z } from "zod";
import {
  appSchema,
  changelogSchema,
  nowSchema,
  postSchema,
  projectSchema,
  type AppMeta,
  type ChangelogEntry,
  type PostMeta,
  type ProjectMeta,
} from "@/lib/schemas";
import { changelog as rawChangelog } from "../../content/changelog";

/**
 * Content loaders. Home, Projects, Apps, Lab, Writing, Changelog, RSS,
 * sitemap and search all read through these functions, so nothing drifts.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");
const showDrafts = process.env.SHOW_DRAFTS === "1" && process.env.NODE_ENV !== "production";

export type Entry<M> = { meta: M; body: string; file: string };

function readCollection<S extends z.ZodTypeAny>(dir: string, schema: S): Entry<z.infer<S>>[] {
  const abs = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(abs)) return [];
  const files = fs.readdirSync(abs).filter((f) => f.endsWith(".mdx"));
  const seen = new Set<string>();
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(abs, file), "utf8");
    const { data, content } = matter(raw);
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      throw new Error(
        `Invalid frontmatter in content/${dir}/${file}:\n` +
          parsed.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n"),
      );
    }
    const meta = parsed.data as z.infer<S> & { slug: string };
    if (`${meta.slug}.mdx` !== file) {
      throw new Error(`content/${dir}/${file}: slug "${meta.slug}" must match the file name`);
    }
    if (seen.has(meta.slug)) throw new Error(`Duplicate slug "${meta.slug}" in content/${dir}`);
    seen.add(meta.slug);
    return { meta, body: content, file: `content/${dir}/${file}` };
  });
}

const byDateDesc = <T extends { meta: { date: string } }>(a: T, b: T) =>
  b.meta.date.localeCompare(a.meta.date);

let cache: {
  projects: Entry<ProjectMeta>[];
  apps: Entry<AppMeta>[];
  posts: Entry<PostMeta>[];
} | null = null;

/** Loads and validates everything, including drafts. */
export function loadAll() {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const projects = readCollection("projects", projectSchema).sort(byDateDesc);
  const apps = readCollection("apps", appSchema).sort(byDateDesc);
  const posts = readCollection("writing", postSchema).sort(byDateDesc);
  const appSlugs = new Set(apps.map((a) => a.meta.slug));
  for (const p of projects) {
    if (appSlugs.has(p.meta.slug)) {
      throw new Error(`Slug "${p.meta.slug}" is used by both a project and an app`);
    }
  }
  cache = { projects, apps, posts };
  return cache;
}

const visible = <M extends { draft: boolean }>(e: Entry<M>) => showDrafts || !e.meta.draft;

export const getProjects = () => loadAll().projects.filter(visible);
export const getApps = () => loadAll().apps.filter(visible);
export const getPosts = () => loadAll().posts.filter(visible);

export const getProject = (slug: string) => getProjects().find((p) => p.meta.slug === slug);
export const getApp = (slug: string) => getApps().find((p) => p.meta.slug === slug);
export const getPost = (slug: string) => getPosts().find((p) => p.meta.slug === slug);

/** Projects + apps, i.e. everything that was built. */
export const getWork = () => [...getProjects(), ...getApps()].sort(byDateDesc);
export const getFeatured = () => getWork().filter((w) => w.meta.featured);
export const getLabDemos = () => getWork().filter((w) => w.meta.demo);

export const workHref = (meta: { slug: string; type: string }, isApp: boolean) =>
  isApp ? `/apps/${meta.slug}` : `/projects/${meta.slug}`;

export const isApp = (e: Entry<ProjectMeta | AppMeta>): e is Entry<AppMeta> =>
  "packageName" in e.meta || "playStoreUrl" in e.meta || "data" in e.meta;

/** Tag cross-linking: posts that share a tag (or the slug) with a project. */
export function relatedPosts(meta: { slug: string; tags: string[] }) {
  const keys = new Set([meta.slug, ...meta.tags]);
  return getPosts().filter((p) => p.meta.tags.some((t) => keys.has(t)));
}

/** Tag cross-linking: projects/apps referenced by a post's tags. */
export function relatedWork(meta: { tags: string[] }) {
  const tags = new Set(meta.tags);
  return getWork().filter((w) => tags.has(w.meta.slug) || w.meta.tags.some((t) => tags.has(t)));
}

export function getNow() {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "now.mdx"), "utf8");
  const { data, content } = matter(raw);
  const meta = nowSchema.parse(data);
  return { meta, body: content };
}

export function getChangelog(): ChangelogEntry[] {
  const manual = changelogSchema.parse(rawChangelog);
  const derived: ChangelogEntry[] = [
    ...getProjects().map((p) => ({
      date: p.meta.date,
      title: `Shipped ${p.meta.title}`,
      href: `/projects/${p.meta.slug}`,
      kind: "project" as const,
    })),
    ...getApps().map((a) => ({
      date: a.meta.date,
      title: `Released ${a.meta.title}`,
      href: `/apps/${a.meta.slug}`,
      kind: "app" as const,
    })),
    ...getPosts().map((p) => ({
      date: p.meta.date,
      title: `Wrote "${p.meta.title}"`,
      href: `/writing/${p.meta.slug}`,
      kind: "post" as const,
    })),
  ];
  return [...manual, ...derived].sort((a, b) => b.date.localeCompare(a.date));
}

export function allTags() {
  const tags = new Set<string>();
  for (const e of [...getWork(), ...getPosts()]) e.meta.tags.forEach((t) => tags.add(t));
  return [...tags].sort();
}

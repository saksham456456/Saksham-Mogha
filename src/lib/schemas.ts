import { z } from "zod";
import { EMBED_ORIGINS } from "@/lib/security/embeds";

/** Content schemas. Build fails if any content file violates these. */

const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case (a-z, 0-9, -)");

const isoDate = z
  .union([z.string(), z.date()])
  .transform((v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v))
  .pipe(z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"));

const httpsUrl = z
  .string()
  .url()
  .refine((u) => u.startsWith("https://"), "external links must use https://");

/** Local path inside /public, e.g. /images/foo.png */
const localAsset = z.string().regex(/^\/[A-Za-z0-9/_\-.]+$/, "must be a local /public path");

export const contentTypes = ["app", "game", "web", "tool", "experiment"] as const;
export const statuses = ["live", "beta", "archived"] as const;

const links = z
  .object({
    live: httpsUrl.optional(),
    repo: httpsUrl.optional(),
    playStore: httpsUrl.optional(),
  })
  .strict()
  .default({});

const demo = z
  .object({
    url: httpsUrl.refine(
      (u) => EMBED_ORIGINS.includes(new URL(u).origin),
      "demo origin must be listed in src/lib/security/embeds.ts",
    ),
    title: z.string().min(1).max(120),
    /** Extra sandbox tokens beyond the default allow-scripts. Allowlisted. */
    allow: z.array(z.enum(["allow-same-origin", "allow-forms"])).default([]),
  })
  .strict();

const baseEntry = {
  title: z.string().min(1).max(80),
  slug,
  summary: z.string().min(20).max(200),
  date: isoDate,
  tags: z.array(slug).default([]),
  draft: z.boolean().default(false),
};

export const projectSchema = z
  .object({
    ...baseEntry,
    type: z.enum(contentTypes),
    status: z.enum(statuses),
    stack: z.array(z.string().min(1).max(40)).min(1),
    featured: z.boolean().default(false),
    cover: localAsset.optional(),
    links,
    demo: demo.optional(),
    /** Source of the facts, see RESEARCH.md. */
    source: httpsUrl,
  })
  .strict();

export const appSchema = projectSchema
  .extend({
    type: z.enum(["app", "game"]),
    playStoreUrl: httpsUrl
      .refine((u) => u.startsWith("https://play.google.com/"), "must be a play.google.com URL")
      .optional(),
    packageName: z
      .string()
      .regex(/^[a-zA-Z][\w]*(\.[a-zA-Z][\w]*)+$/, "invalid Android package name")
      .optional(),
    privacyUrl: z.string().default("/privacy"),
    features: z.array(z.string().min(1).max(160)).default([]),
    screenshots: z
      .array(z.object({ src: localAsset, alt: z.string().min(5) }).strict())
      .default([]),
    /** Data handling, rendered into /privacy. Must be accurate. */
    data: z
      .object({
        collectsUserData: z.boolean(),
        details: z.array(z.string().min(1)).default([]),
        thirdParties: z.array(z.string().min(1)).default([]),
        deletion: z.string().default(""),
      })
      .strict(),
  })
  .strict()
  .superRefine((a, ctx) => {
    if (!a.draft && !a.playStoreUrl) {
      ctx.addIssue({ code: "custom", message: "published apps need playStoreUrl", path: ["playStoreUrl"] });
    }
    if (a.data.collectsUserData && !a.data.deletion) {
      ctx.addIssue({
        code: "custom",
        message: "apps that collect user data need a data-deletion section",
        path: ["data", "deletion"],
      });
    }
  });

export const postSchema = z
  .object({
    ...baseEntry,
    updated: isoDate.optional(),
  })
  .strict();

export const nowSchema = z.object({ updated: isoDate, title: z.string().default("Now") }).strict();

export const changelogSchema = z.array(
  z
    .object({
      date: isoDate,
      title: z.string().min(1).max(120),
      href: z.string().min(1),
      kind: z.enum(["project", "app", "post", "site"]),
    })
    .strict(),
);

export type ProjectMeta = z.infer<typeof projectSchema>;
export type AppMeta = z.infer<typeof appSchema>;
export type PostMeta = z.infer<typeof postSchema>;
export type ChangelogEntry = z.infer<typeof changelogSchema>[number];

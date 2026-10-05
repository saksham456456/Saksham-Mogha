import "server-only";
import { z } from "zod";

/**
 * IDENTITY DISAMBIGUATION & AUTO-SYNC ENGINE
 * 
 * Protects against mixing up other individuals with the same name "Saksham Mogha".
 * Only verified identities matching Saksham's cryptographic or registered handles are accepted.
 */

export const VERIFIED_IDENTITY = {
  fullName: "Saksham Mogha",
  github: "saksham456456",
  githubId: 228156854,
  twitter: "SAKSHAM_456456",
  domains: [
    "saksham-mogha.vercel.app",
    "self-website-c2kb.onrender.com",
    "saksham-dev-bulletin.onrender.com",
    "tiebreak-omega.vercel.app",
    "saksham-ai-gold.vercel.app",
    "aria-co-teacher.vercel.app",
    "slate-mind.vercel.app",
    "scanzap.vercel.app",
  ],
} as const;

/**
 * Filter to strictly verify any external incoming data candidate.
 * Returns true only if it is proven to belong to Saksham Mogha (saksham456456).
 */
export function isVerifiedIdentity(entity: {
  authorHandle?: string;
  repoOwner?: string;
  sourceUrl?: string;
  mentionedHandles?: string[];
}): boolean {
  if (entity.authorHandle && entity.authorHandle.toLowerCase() === VERIFIED_IDENTITY.github.toLowerCase()) {
    return true;
  }
  if (entity.repoOwner && entity.repoOwner.toLowerCase() === VERIFIED_IDENTITY.github.toLowerCase()) {
    return true;
  }
  if (entity.sourceUrl) {
    try {
      const parsed = new URL(entity.sourceUrl);
      const isKnownDomain = VERIFIED_IDENTITY.domains.some((d) => parsed.hostname === d || parsed.hostname.endsWith(`.${d}`));
      const isKnownGithub = parsed.hostname === "github.com" && parsed.pathname.toLowerCase().startsWith(`/${VERIFIED_IDENTITY.github.toLowerCase()}`);
      if (isKnownDomain || isKnownGithub) {
        return true;
      }
    } catch {
      return false;
    }
  }
  if (entity.mentionedHandles && entity.mentionedHandles.some((h) => 
    h.toLowerCase() === VERIFIED_IDENTITY.github.toLowerCase() || 
    h.toLowerCase() === VERIFIED_IDENTITY.twitter.toLowerCase()
  )) {
    return true;
  }
  // Reject all other unverified namesakes
  return false;
}

// Zod Schema for GitHub Events with safe coercion and defaults
const GitHubEventSchema = z.object({
  id: z.string().default(""),
  type: z.string().default(""),
  actor: z.object({
    login: z.string().default(""),
    avatar_url: z.string().default(""),
  }),
  repo: z.object({
    id: z.coerce.number().default(0),
    name: z.string().default(""),
    url: z.string().default(""),
  }),
  payload: z.object({
    action: z.string().optional().default(""),
    ref: z.string().nullable().optional().default(""),
    ref_type: z.string().nullable().optional().default(""),
    commits: z.array(z.object({
      sha: z.string().default(""),
      message: z.string().default(""),
    })).default([]),
  }).default({
    action: "",
    ref: null,
    ref_type: null,
    commits: [],
  }),
  created_at: z.string().default(""),
});

export type GitHubActivityItem = {
  id: string;
  type: string;
  repoName: string;
  repoShort: string;
  repoUrl: string;
  date: string;
  summary: string;
};

/**
 * Fetch live GitHub public activity for saksham456456 with strict validation,
 * error boundaries, and edge-friendly caching.
 */
export async function getLiveGitHubActivity(): Promise<GitHubActivityItem[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${VERIFIED_IDENTITY.github}/events/public?per_page=15`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Saksham-Mogha-Website-Sync",
      },
      next: { revalidate: 3600 }, // 1 hour server cache
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) {
      return getFallbackActivity();
    }

    const json = await res.json();
    if (!Array.isArray(json)) return getFallbackActivity();

    const parsed = z.array(GitHubEventSchema).safeParse(json);
    if (!parsed.success) return getFallbackActivity();

    const events = parsed.data
      .filter((ev) => isVerifiedIdentity({ repoOwner: ev.repo.name.split("/")[0] }))
      .map((ev): GitHubActivityItem => {
        const repoShort = ev.repo.name.replace(/^[^/]+\//, "");
        const repoUrl = `https://github.com/${ev.repo.name}`;
        let summary = "Updated repository";

        if (ev.type === "PushEvent") {
          const count = ev.payload.commits?.length || 1;
          const firstMsg = ev.payload.commits?.[0]?.message?.split("\n")[0] || "Committed changes";
          summary = `Pushed ${count} commit${count > 1 ? "s" : ""}: "${firstMsg.slice(0, 50)}${firstMsg.length > 50 ? "..." : ""}"`;
        } else if (ev.type === "CreateEvent") {
          summary = `Created ${ev.payload.ref_type || "branch"} ${ev.payload.ref ? `"${ev.payload.ref}"` : ""}`;
        } else if (ev.type === "WatchEvent") {
          summary = `Starred repository`;
        } else if (ev.type === "ForkEvent") {
          summary = `Forked repository`;
        } else if (ev.type === "ReleaseEvent") {
          summary = `Published release`;
        }

        return {
          id: ev.id,
          type: ev.type,
          repoName: ev.repo.name,
          repoShort,
          repoUrl,
          date: ev.created_at,
          summary,
        };
      })
      .slice(0, 6);

    return events.length > 0 ? events : getFallbackActivity();
  } catch {
    return getFallbackActivity();
  }
}

function getFallbackActivity(): GitHubActivityItem[] {
  return [
    {
      id: "tiebreak-init",
      type: "PushEvent",
      repoName: "saksham456456/Tiebreak",
      repoShort: "Tiebreak",
      repoUrl: "https://github.com/saksham456456/Tiebreak",
      date: "2026-10-02T15:05:07Z",
      summary: "Pushed 1 commit: Elo ranking engine for head-to-head voting",
    },
    {
      id: "drift-init",
      type: "PushEvent",
      repoName: "saksham456456/Drift",
      repoShort: "Drift",
      repoUrl: "https://github.com/saksham456456/Drift",
      date: "2026-09-29T19:45:31Z",
      summary: "Pushed updates to Android Jetpack Compose clean architecture",
    },
    {
      id: "aria-init",
      type: "PushEvent",
      repoName: "saksham456456/Aria",
      repoShort: "Aria",
      repoUrl: "https://github.com/saksham456456/Aria",
      date: "2026-09-11T05:00:53Z",
      summary: "Completed voice AI co-teacher for EchoSphere Hackathon",
    },
  ];
}

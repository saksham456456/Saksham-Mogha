import { NextResponse } from "next/server";
import { getLiveGitHubActivity, VERIFIED_IDENTITY } from "@/lib/sync/profile-sync";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Sync endpoint to inspect live updates from verified sources.
 * Can be triggered via cron or authenticated calls.
 */
export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  // Protect against abuse if CRON_SECRET is set
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const activity = await getLiveGitHubActivity();

  return NextResponse.json({
    ok: true,
    verifiedIdentity: {
      name: VERIFIED_IDENTITY.fullName,
      github: VERIFIED_IDENTITY.github,
    },
    latestActivity: activity,
    syncedAt: new Date().toISOString(),
  });
}

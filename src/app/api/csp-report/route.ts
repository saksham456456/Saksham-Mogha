import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX = 8 * 1024;

/** Receives CSP violation reports. Logs only the directive and blocked origin, no PII. */
export async function POST(req: Request) {
  try {
    const raw = (await req.text()).slice(0, MAX);
    const body = JSON.parse(raw) as Record<string, unknown>;
    const report = (body["csp-report"] ?? (Array.isArray(body) ? body[0]?.body : body)) as
      | Record<string, unknown>
      | undefined;
    if (report) {
      const directive = String(report["violated-directive"] ?? report["effectiveDirective"] ?? "?").slice(0, 60);
      let blocked = String(report["blocked-uri"] ?? report["blockedURL"] ?? "?");
      try {
        blocked = new URL(blocked).origin;
      } catch {
        blocked = blocked.slice(0, 30);
      }
      const page = (() => {
        try {
          return new URL(String(report["document-uri"] ?? report["documentURL"])).pathname.slice(0, 100);
        } catch {
          return "?";
        }
      })();
      console.warn(`[csp] ${directive} blocked=${blocked} page=${page}`);
    }
  } catch {
    /* ignore malformed reports */
  }
  return new NextResponse(null, { status: 204 });
}

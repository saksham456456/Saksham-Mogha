import "server-only";
import { site } from "../../../content/site";

/**
 * CSRF / cross-site protection for state-changing requests:
 *  - Origin must be present and equal to this deployment's origin (or the
 *    canonical site URL).
 *  - Sec-Fetch-Site, when sent, must be same-origin.
 *  - Callers also require Content-Type: application/json plus a custom
 *    header, which forces a CORS preflight that we never approve.
 */
export function isSameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  const fetchSite = req.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin") return false;

  const allowed = new Set<string>([new URL(site.url).origin]);
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (host) {
    const proto = req.headers.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
    allowed.add(`${proto}://${host}`);
  }
  if (process.env.VERCEL_URL) allowed.add(`https://${process.env.VERCEL_URL}`);
  return allowed.has(origin);
}

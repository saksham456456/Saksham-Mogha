import { NextResponse, type NextRequest } from "next/server";
import { EMBED_ORIGINS } from "@/lib/security/embeds";

/**
 * Per-request nonce + Content-Security-Policy.
 * Static security headers (HSTS, nosniff, …) live in next.config.ts so they
 * also cover static assets.
 *
 * CSP_MODE=report-only switches to Content-Security-Policy-Report-Only for
 * safe rollouts. Default is enforce.
 */

const TURNSTILE = "https://challenges.cloudflare.com";

export function buildCsp(nonce: string, pathname: string, opts: { dev: boolean; localhost: boolean }) {
  const isContact = pathname === "/contact";
  const isLab = pathname === "/lab" || pathname.startsWith("/lab/");

  const frameSrc = isContact ? [TURNSTILE] : isLab ? [...EMBED_ORIGINS] : ["'none'"];

  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      `'nonce-${nonce}'`,
      "'strict-dynamic'",
      ...(isContact ? [TURNSTILE] : []),
      ...(opts.dev ? ["'unsafe-eval'"] : []),
    ],
    "style-src": opts.dev ? ["'self'", "'unsafe-inline'"] : ["'self'", `'nonce-${nonce}'`],
    "img-src": ["'self'", "data:", "blob:"],
    "font-src": ["'self'"],
    "connect-src": ["'self'", ...(isContact ? [TURNSTILE] : []), ...(opts.dev ? ["ws:"] : [])],
    "frame-src": frameSrc,
    "child-src": frameSrc,
    "worker-src": ["'self'"],
    "manifest-src": ["'self'"],
    "media-src": ["'self'"],
    "object-src": ["'none'"],
    "base-uri": ["'none'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"],
    "report-uri": ["/api/csp-report"],
  };

  let csp = Object.entries(directives)
    .map(([k, v]) => `${k} ${v.join(" ")}`)
    .join("; ");
  if (!opts.localhost) csp += "; upgrade-insecure-requests";
  return csp;
}

export function proxy(request: NextRequest) {
  const nonce = btoa(crypto.randomUUID());
  const dev = process.env.NODE_ENV === "development";
  const host = request.headers.get("host") ?? "";
  const localhost = /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host);
  const csp = buildCsp(nonce, request.nextUrl.pathname, { dev, localhost });
  const reportOnly = process.env.CSP_MODE === "report-only";
  const headerName = reportOnly ? "Content-Security-Policy-Report-Only" : "Content-Security-Policy";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  // Next.js reads the nonce from this request header and applies it to its own scripts.
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set(headerName, csp);
  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico|icon|apple-icon|robots.txt|sitemap.xml|rss.xml|\\.well-known).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};

/**
 * Allowlisted origins that may be embedded in /lab via sandboxed iframes.
 * The proxy adds these to `frame-src` on /lab routes ONLY. The global CSP
 * keeps frame-src restricted.
 */
export const EMBED_ORIGINS: readonly string[] = [
  "https://slate-mind.vercel.app",
  "https://tiebreak-omega.vercel.app",
  "https://scanzap.vercel.app",
];

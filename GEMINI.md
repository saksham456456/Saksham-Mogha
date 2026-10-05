# Portfolio Design & Technical Guidelines

## 1. Aesthetic Guidelines (V1 Premium 3D)
- **Vibe:** Modern, techy, cinematic, smooth, attention-seeking.
- **Do:** Use glassmorphism, deep blacks, glowing indigo/cyan/pink gradients, 3D tilt effects (e.g., Framer Motion), smooth inertia scrolling (e.g., Lenis), and clean layout structuring.
- **Don't:** Do not use terminal-themed elements, dense monospace data blocks, cluttered "hacker" UI widgets, or overly flat designs.

## 2. CSP (Content Security Policy) Constraints
- **Framer Motion SSR:** When using Framer Motion or inline styles, ensure `style-src-attr 'unsafe-inline'` is allowed in the CSP (via Next.js middleware/proxy) so animations don't flash on mount.
- **3D Environments (Three.js/Drei):** NEVER use CDN-hosted assets in `@react-three/drei` (e.g., `<Environment preset="city" />`). This violates the `default-src 'self'` CSP. Instead, use local HDR files or build synthetic reflections using arrays of `<Lightformer>` components inside `<Environment>`.

## 3. Data Sourcing & Automation
- **No Generic Scraping:** Do not scrape search engines or generic platform pages (like Medium/LinkedIn search) to find data for "Saksham Mogha" to avoid merging data with other users of the same name.
- **Strict APIs:** Only fetch automated data using authenticated APIs mapped directly to verified handles (e.g. GitHub: `saksham456456`, X: `@SAKSHAM_456456`). Prefer backend/Action-based updates over client-side scraping.

# Saksham Mogha — Personal Website & Apps Hub (v2)

Official website, portfolio, Google Play apps hub, and support portal for **Saksham Mogha** ([saksham-mogha.vercel.app](https://saksham-mogha.vercel.app)).

Architected with Next.js (App Router), TypeScript Strict, Tailwind CSS, MDX, Zod validation, and hardened HTTP/CSP security.

---

## 🚀 Key Architectural Features

- **Single Source of Truth (`/content`):** Every project, app, dev log, and bio is typed and Zod-validated. Add an item once and it appears automatically across Home, Projects, Apps, Lab, Changelog, RSS (`/rss.xml`), Sitemap, and Command Palette (`⌘K`).
- **Identity Disambiguation & Auto-Sync:** Automated synchronization system tracking verified GitHub activity (`saksham456456`) with a strict filter rejecting unrelated namesakes.
- **Enterprise-Grade Security:**
  - Per-request CSP nonce via Edge Proxy (`strict-dynamic`, `frame-ancestors 'none'`).
  - HSTS Preload (`max-age=63072000`), `nosniff`, locked-down `Permissions-Policy`, `COOP`/`CORP`.
  - Secure Contact Form with server-side Zod validation, IP rate limiting (Upstash Redis / Vercel KV), honeypot trap, and Cloudflare Turnstile verification. No raw email addresses exposed in client HTML.
- **Distinctive Tech Aesthetic & Performance:**
  - Minimal dark mode by default with light theme toggle.
  - Interactive bash terminal signature moment on Home with zero-JS accessible fallback.
  - Command Palette (`Cmd+K` / `Ctrl+K`) for instant keyboard navigation.
  - 100% self-hosted fonts (`next/font`), zero third-party tracking scripts, cookieless Vercel Web Analytics.
- **Google Play Compliance:** Stable, preserved URLs for `/support`, `/privacy`, and `/contact` with detailed data deletion policies.

---

## 🛠 Local Development Setup

### 1. Prerequisites
- Node.js 20+
- npm 10+

### 2. Installation
```bash
git clone https://github.com/saksham456456/Saksham-Mogha.git
cd Saksham-Mogha
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in the values:
- `NEXT_PUBLIC_SITE_URL`: Set to `http://localhost:3000` (or `https://saksham-mogha.vercel.app`)
- `RESEND_API_KEY`: API key from [Resend](https://resend.com) (in dev, emails log to console if omitted)
- `CONTACT_TO_EMAIL`: Your destination inbox for contact submissions
- `UPSTASH_REDIS_REST_URL` & `UPSTASH_REDIS_REST_TOKEN`: For distributed rate limiting
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` & `TURNSTILE_SECRET_KEY`: From Cloudflare Turnstile

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

---

## ✍ Adding Content

All content is managed under `/content`. Content is validated with Zod at build time; invalid frontmatter will fail the build immediately.

### Adding a Project
Create a new file in `content/projects/<slug>.mdx`:
```mdx
---
title: My New App
slug: my-new-app
summary: A 1-2 sentence description of what the project does.
type: web # web | app | game | tool | experiment
status: live # live | beta | archived
date: 2026-10-04
featured: true
stack: [Next.js, TypeScript, Tailwind CSS]
tags: [ai, web]
links:
  live: https://my-app.vercel.app
  repo: https://github.com/saksham456456/my-new-app
source: https://github.com/saksham456456/my-new-app
---

## Problem
What real-world problem does this solve?

## Approach
How was it engineered?

## Stack
Key libraries and architecture patterns.
```

### Adding a Google Play App
Create a new file in `content/apps/<slug>.mdx`:
```mdx
---
title: Android Utility
slug: android-utility
summary: An Android utility built with Kotlin.
type: app
status: live
date: 2026-10-04
draft: false
stack: [Kotlin, Jetpack Compose]
tags: [android]
playStoreUrl: https://play.google.com/store/apps/details?id=com.saksham.utility
packageName: com.saksham.utility
privacyUrl: /privacy
features:
  - Instant offline performance
  - Material 3 dynamic theme
data:
  collectsUserData: false
  details: []
  thirdParties: []
  deletion: "Delete all local data via Android App Settings -> Clear Storage."
source: https://github.com/saksham456456
---

## Overview
Case study and feature breakdown.
```

### Adding a Post / Dev Log
Create a new file in `content/writing/<slug>.mdx`:
```mdx
---
title: Building On-Device LLMs
slug: building-on-device-llms
summary: Lessons learned while embedding WebGPU models in the browser.
date: 2026-10-04
tags: [ai, webgpu]
---

Article body in GitHub Flavored Markdown.
```

---

## 🔄 Automated Profile & Activity Sync

1. **Edge API Route (`/api/sync`):** Returns validated, fresh activity for `saksham456456`.
2. **GitHub Action (`.github/workflows/auto-sync.yml`):** Runs daily to check for new public repositories, keeping site stats and releases in sync.
3. **Disambiguation Guard (`src/lib/sync/profile-sync.ts`):** Only data tied to verified accounts is incorporated, filtering out unrelated namesakes.

---

## 🚢 Production Deployment (Vercel)

1. Connect the repository to Vercel.
2. In Project Settings -> Environment Variables, configure production values from `.env.example`.
3. Enable Vercel Web Analytics.
4. Deploy from branch `redesign/v2` to verify preview build, then merge PR into `main`.

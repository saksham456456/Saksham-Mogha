# RESEARCH.md: public facts about Saksham Mogha

Research date: 2026-10-04. Public sources only. Every claim on the site has to trace back to a row here or to Saksham directly.

**Publish values**
- `YES`: safe and published on the site
- `NO`: private or sensitive, never published
- `NEEDS CONFIRMATION`: kept off the site (or behind `draft: true`) until Saksham approves it

## 1. Identity and profiles

| # | Fact | Source | Confidence | Publish |
|---|------|--------|------------|---------|
| 1.1 | Full name is **Saksham Mogha** | GitHub profile `name` field, https://github.com/saksham456456 | high | YES |
| 1.2 | GitHub handle `saksham456456` | https://github.com/saksham456456 | high | YES |
| 1.3 | X/Twitter handle `SAKSHAM_456456` (listed on GitHub profile) | https://api.github.com/users/saksham456456 | high | YES (as `sameAs`) |
| 1.4 | Location: India (country level only) | GitHub profile `location` | high | YES (country only) |
| 1.5 | GitHub bio: "a Student" | GitHub profile `bio` | high | YES, but generic ("student developer"). No institution named |
| 1.6 | Self-description: "Independent app developer, AI engineer, and builder of full-stack, deployable projects spanning web, mobile, and on-device ML. It's always me vs me." | https://github.com/saksham456456/saksham456456 (profile README) | high | YES |
| 1.7 | Roles: "App Developer \| AI Engineer \| Full-Stack Builder" | profile README | high | YES |
| 1.8 | Active on GitHub since Sept 2025 (account created 2025-08-23), 45 public repos | GitHub API | high | YES ("since 2025") |
| 1.9 | Current website is `saksham-mogha.vercel.app` (GitHub `blog` field) | GitHub profile | high | YES (canonical URL) |
| 1.10 | Older portfolios: `self-website-c2kb.onrender.com`, `saksham-mogha.onrender.com` | repo homepage fields | high | NO in `sameAs` (superseded). Point them at the new site |
| 1.11 | Brand: "SAKSHAM.DEV" | existing navbar, Bulletin-Board README | high | YES (secondary only) |
| 1.12 | Google Play developer account named "Saksham Mogha" | Inferred from existing site copy. `play.google.com/store/apps/developer?id=Saksham+Mogha` returned **404** | low | **NEEDS CONFIRMATION**: send the exact developer page URL |
| 1.13 | LinkedIn profile | none found | none | **NEEDS CONFIRMATION**: send the URL if one exists |
| 1.14 | Contact email (from local git config) | git config | high | **NO**: never in HTML. Contact goes through the form only |

## 2. Skills and stack (from profile README)

| # | Fact | Source | Confidence | Publish |
|---|------|--------|------------|---------|
| 2.1 | Languages/frameworks: TypeScript, JavaScript, Python, Kotlin, Dart, Next.js, React, Flutter | profile README | high | YES |
| 2.2 | AI/ML: OpenAI, Google Gemini, WebLLM, WebGPU, on-device inference | profile README | high | YES |
| 2.3 | Backend/cloud: Node.js, Supabase, Firebase, Render, Vercel | profile README | high | YES |
| 2.4 | Android: Jetpack Compose, Room, Coroutines, MVVM | Breefo / Brain-Spark / Excuse-Generator READMEs | high | YES |

## 3. Projects (public GitHub repos)

The descriptions below come from each repo's README. Site copy is kept factual: no performance numbers or user counts unless the README states them, and where it does, the README is credited.

| # | Project | Facts (from README) | Source | Confidence | Publish |
|---|---------|----------------------|--------|------------|---------|
| 3.1 | **Saksham-AI** | LLM that runs in the browser via WebLLM/WebGPU. No API keys, runs on-device. Next.js, TypeScript, Zustand. Live: saksham-ai-gold.vercel.app | github.com/saksham456456/Saksham-AI | high | YES |
| 3.2 | **Phokat-To-Focus** | AI study companion: AI planner, Android strict mode, AI coach, progress tracking. Flutter, Provider, Firebase, Gemini | github.com/saksham456456/Phokat-To-Focus | high | YES |
| 3.3 | **Warzone Intelligence** | 3D globe of active conflicts. Globe.gl, Node.js, OpenAI web search that structures current events | github.com/saksham456456/warzone-intelligence | high | YES |
| 3.4 | **Slate-Mind (Professor Byte)** | Gamified AI teacher on an animated whiteboard. Node.js, HTML5 Canvas, Groq. XP, quizzes, streaks. Live: slate-mind.vercel.app | github.com/saksham456456/Slate-Mind | high | YES |
| 3.5 | **ARIA** | Real-time voice AI co-teacher for online classrooms, built on the Agora Conversational AI Engine. Live: aria-co-teacher.vercel.app | github.com/saksham456456/Aria | high | YES |
| 3.6 | ARIA was "Built for the EchoSphere Hackathon" | Aria README | medium | YES (as "built for", no placement claimed). **NEEDS CONFIRMATION** for any result or award |
| 3.7 | **Tiebreak** | Pairwise-voting ranking engine with Elo ratings. Next.js, Supabase Postgres, Upstash Redis. Live: tiebreak-omega.vercel.app | github.com/saksham456456/Tiebreak | high | YES |
| 3.8 | **Drift** | Privacy-first anonymous "thought network" Android app. Kotlin, Jetpack Compose, Firebase | github.com/saksham456456/Drift | high | YES (as a project, not as a Play app) |
| 3.9 | **Scanzap** | Single-file QR code generator with a credit system, Firebase backend and Razorpay checkout. Live: scanzap.vercel.app | github.com/saksham456456/Scanzap | high | YES |
| 3.10 | **Savage Excuse Generator** | Offline Android app with 1000+ bundled excuses produced by a build-time Python script. Kotlin, Room, Coroutines | github.com/saksham456456/Excuse-Generator | high | YES |
| 3.11 | **Breefo** | Android news app with summaries (TL;DR + key points). Kotlin, Jetpack Compose, MVVM | github.com/saksham456456/Breefo-News-app | high | YES |
| 3.12 | **Brain-Spark** | Gamified cognitive-training Android app. Kotlin, Compose, Room, Firebase Analytics | github.com/saksham456456/Brain-Spark | high | YES |
| 3.13 | **Bulletin-Board** | 3D announcement board and CMS for SAKSHAM.DEV with Basic Auth admin. Next.js, Supabase | github.com/saksham456456/Bulletin-Board | high | YES |
| 3.14 | **Cognito-AI** | Multi-mode personal AI assistant (chat, coding persona, live voice), React/TypeScript/Gemini, IndexedDB persistence | profile README (repo README is the default AI Studio template) | medium | YES |
| 3.15 | **Fraud-GPT** | Listed in profile README, but the repo returns 404 (private or deleted) | profile README | low | **NEEDS CONFIRMATION**: left out |
| 3.16 | Smaller or early repos (Python calculators, quiz, chatbot, birthday/valentine pages, etc.) | GitHub | high | Left out on purpose: personal or very small |

## 4. Google Play apps

| # | Fact | Source | Confidence | Publish |
|---|------|--------|------------|---------|
| 4.1 | Existing site says it hosts support and privacy pages "for applications developed by Saksham Mogha on Google Play" | existing `src/app/layout.tsx` | medium | YES (keeps `/support`, `/privacy` and their meaning) |
| 4.2 | Which apps are live on Play, their package names, and what data each collects | not public / not found | none | **NEEDS CONFIRMATION**. Android projects (Drift, Breefo, Brain-Spark, Excuse-Generator, Orbital-Smash, Money_Clicker) are added under `content/apps/` as `draft: true` and stay hidden until confirmed |
| 4.3 | Existing privacy policy mentions possible use of Google AdMob and analytics/crash reporting | existing `src/app/privacy/page.tsx` | medium | YES (kept word-for-word in meaning) until per-app facts are confirmed |

## 5. Excluded on purpose (privacy rules)

| # | Item | Source | Confidence it is the same person | Publish |
|---|------|--------|------------------|---------|
| 5.1 | A school name, a board-exam subject topper listing and a school cricket team listing for someone named "Saksham Mogha" | vbpsgn.com, cricheroes.com (web search) | low | **NO**: exact school, possibly about a minor, unverified identity |
| 5.2 | Age / date of birth / family / phone / address | not collected | n/a | **NO** |

## 6. Found during the repo audit (security)

| # | Finding | Action |
|---|---------|--------|
| 6.1 | EmailJS service ID, template ID and public key hard-coded in `src/app/contact/page.tsx` (commits `5b8f31b`, `734f5c4`) | Removed. The form now uses a server route. **Rotate or delete the EmailJS keys/template** (see the manual steps) |
| 6.2 | `next.config.ts` had `typescript.ignoreBuildErrors` and `eslint.ignoreDuringBuilds` set | Removed. Build is strict now |
| 6.3 | Privacy page showed `new Date()` as "Last updated", which is inaccurate | Replaced with a fixed, real date |

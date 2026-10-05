/**
 * Single source of truth for identity, links and feature flags.
 * Every fact here must be traceable to RESEARCH.md (status: YES).
 */

export type SocialLink = {
  label: string;
  url: string;
  handle?: string;
  /** Include in JSON-LD `sameAs` and as rel="me". Only verified profiles. */
  verified: boolean;
};

export const site = {
  name: "Saksham Mogha",
  handle: "saksham456456",
  brand: "SAKSHAM.DEV",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://saksham-mogha.vercel.app").replace(/\/$/, ""),
  locale: "en",
  country: "India",
  jobTitle: "Independent App Developer & AI Engineer",
  roles: ["App Developer", "AI Engineer", "Full-Stack Builder"],
  tagline: "Independent app developer and AI engineer building for web, Android and on-device ML.",
  bio: {
    short:
      "Saksham Mogha is an independent app developer and AI engineer from India who builds full-stack, deployable projects across web, mobile and on-device ML.",
    long: [
      "Saksham Mogha is a student developer from India who describes himself as an independent app developer, AI engineer and builder of full-stack, deployable projects spanning web, mobile and on-device machine learning.",
      "He works across TypeScript, React and Next.js on the web, Kotlin and Jetpack Compose on Android, Flutter for cross-platform apps, and Python. On the AI side he builds with cloud LLMs such as Gemini and OpenAI, and runs models directly in the browser with WebLLM and WebGPU.",
      "He has been shipping in public on GitHub since 2025. His motto: it's always me vs me.",
    ],
  },
  motto: "It's always me vs me.",
  activeSince: "2025",
  /** Optional photo in /public. Leave null until an approved photo is provided. */
  photo: null as null | { src: string; alt: string; width: number; height: number },
  /** Optional downloadable CV in /public. Leave null until provided. */
  cvPdf: null as null | string,
  githubUser: "saksham456456",
  socials: [
    { label: "GitHub", url: "https://github.com/saksham456456", handle: "saksham456456", verified: true },
    { label: "X (Twitter)", url: "https://x.com/SAKSHAM_456456", handle: "@SAKSHAM_456456", verified: true },
    // NEEDS CONFIRMATION (RESEARCH.md 1.12, 1.13): add when confirmed.
    // { label: "Google Play", url: "https://play.google.com/store/apps/dev?id=…", verified: true },
    // { label: "LinkedIn", url: "https://www.linkedin.com/in/…", verified: true },
  ] satisfies SocialLink[],
  stack: {
    "Languages & frameworks": ["TypeScript", "JavaScript", "Python", "Kotlin", "Dart", "Next.js", "React", "Flutter"],
    Android: ["Jetpack Compose", "Room", "Coroutines", "MVVM"],
    "AI & ML": ["Gemini", "OpenAI", "WebLLM", "WebGPU", "On-device inference"],
    "Backend & cloud": ["Node.js", "Supabase", "Firebase", "Render", "Vercel"],
  } as Record<string, string[]>,
  /** Optional modules. Ship OFF by default. */
  features: {
    japanese: false,
    gallery3d: false,
    aiAssistant: false,
  },
  nav: [
    { label: "Projects", href: "/projects" },
    { label: "Apps", href: "/apps" },
    { label: "Lab", href: "/lab" },
    { label: "Writing", href: "/writing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footerNav: [
    { label: "Now", href: "/now" },
    { label: "Changelog", href: "/changelog" },
    { label: "CV", href: "/cv" },
    { label: "Media kit", href: "/media" },
    { label: "Support", href: "/support" },
    { label: "Privacy", href: "/privacy" },
    { label: "RSS", href: "/rss.xml" },
  ],
} as const;

export type Site = typeof site;

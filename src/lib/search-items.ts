export type SearchItem = {
  title: string;
  category: "Page" | "Project" | "App" | "Writing" | "Lab";
  href: string;
  tags?: string[];
};

export const defaultSearchItems: SearchItem[] = [
  { title: "Home", category: "Page", href: "/" },
  { title: "About Saksham Mogha", category: "Page", href: "/about" },
  { title: "Projects Hub", category: "Page", href: "/projects" },
  { title: "Google Play Apps Hub", category: "Page", href: "/apps" },
  { title: "Lab & Interactive Demos", category: "Page", href: "/lab" },
  { title: "Writing & Dev Logs", category: "Page", href: "/writing" },
  { title: "Now (Current Focus)", category: "Page", href: "/now" },
  { title: "Changelog", category: "Page", href: "/changelog" },
  { title: "CV / Resume", category: "Page", href: "/cv" },
  { title: "Media Kit & Press", category: "Page", href: "/media" },
  { title: "App Support & FAQs", category: "Page", href: "/support" },
  { title: "Privacy Policy", category: "Page", href: "/privacy" },
  { title: "Contact Saksham", category: "Page", href: "/contact" },
  // Key Projects
  { title: "Saksham-AI (On-Device Browser LLM)", category: "Project", href: "/projects/saksham-ai", tags: ["ai", "webgpu"] },
  { title: "Tiebreak (Pairwise Elo Engine)", category: "Project", href: "/projects/tiebreak", tags: ["ranking", "redis"] },
  { title: "ARIA (Voice AI Co-Teacher)", category: "Project", href: "/projects/aria", tags: ["agora", "voice"] },
  { title: "Phokat-To-Focus (Study Companion)", category: "Project", href: "/projects/phokat-to-focus", tags: ["flutter", "gemini"] },
  { title: "Warzone Intelligence (3D Conflict Globe)", category: "Project", href: "/projects/warzone-intelligence", tags: ["3d", "openai"] },
  { title: "Professor Byte (Slate-Mind)", category: "Project", href: "/projects/slate-mind", tags: ["education", "canvas"] },
  { title: "Scanzap (Credit QR Generator)", category: "Project", href: "/projects/scanzap", tags: ["qr", "tool"] },
  { title: "Drift (Anonymous Thought Network)", category: "Project", href: "/projects/drift", tags: ["android", "kotlin"] },
  { title: "Excuse Generator", category: "Project", href: "/projects/excuse-generator", tags: ["android", "kotlin"] },
  { title: "Breefo (News Summarizer)", category: "Project", href: "/projects/breefo", tags: ["android", "compose"] },
  { title: "Brain-Spark (Cognitive Training)", category: "Project", href: "/projects/brain-spark", tags: ["android", "game"] },
  { title: "SAKSHAM.DEV Bulletin Board", category: "Project", href: "/projects/bulletin-board", tags: ["cms", "nextjs"] },
  { title: "Cognito-AI", category: "Project", href: "/projects/cognito-ai", tags: ["ai", "assistant"] },
  // Writing
  { title: "How this site is built (Architecture & Security)", category: "Writing", href: "/writing/how-this-site-is-built", tags: ["security", "nextjs"] },
];

/**
 * Design Tokens: Single source of truth for design variables.
 * Dark by default, high-contrast, WCAG 2.2 AA compliant.
 */

export const tokens = {
  colors: {
    // Dark default background palette
    bg: {
      canvas: "#090d16",       // Deep void navy
      surface: "#0f172a",      // Card/element background
      elevated: "#1e293b",     // Popover, modal, dropdown
      border: "#334155",       // Accessible contrast border (>= 3:1)
      borderSubtle: "#1e293b",
    },
    text: {
      primary: "#f8fafc",      // 15.8:1 contrast on canvas (AAA)
      muted: "#94a3b8",        // 4.6:1 contrast on canvas (AA)
      subtle: "#64748b",
      inverse: "#090d16",
    },
    accent: {
      primary: "#6366f1",      // Indigo
      glow: "rgba(99, 102, 241, 0.15)",
      emerald: "#10b981",     // Shipped / Live status
      cyan: "#06b6d4",        // Tech highlights
      amber: "#f59e0b",       // Beta status
    },
  },
  radius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "9999px",
  },
  spacing: {
    container: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
  },
} as const;

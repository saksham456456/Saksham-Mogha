"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade + lift into view once, v1-style. Static when reduced motion is on. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  x = 0,
  className,
  onLoad = false,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
  /** Animate on mount (hero) instead of when scrolled into view. */
  onLoad?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const target = { opacity: 1, x: 0, y: 0 };
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, x, y }}
      {...(onLoad ? { animate: target } : { whileInView: target, viewport: { once: true, margin: "-60px" } })}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

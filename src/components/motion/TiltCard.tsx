"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { ReactNode, PointerEvent } from "react";

/**
 * Glass card with a subtle 3D tilt and a soft light that follows the cursor.
 * Tilt is capped at a few degrees so it feels premium, not gimmicky.
 */
export function TiltCard({
  children,
  className = "",
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 200, damping: 20, mass: 0.5 };
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(400px circle at ${x} ${y}, rgba(255,255,255,0.08), transparent 45%)`,
  );

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const base = `glass relative overflow-hidden rounded-2xl ${className}`;
  if (reduce) return <div className={base}>{children}</div>;

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`${base} group transition-[background-color,border-color,box-shadow] duration-300 hover:bg-white/[0.08] hover:border-white/20 hover:shadow-[0_20px_60px_-20px_rgba(79,70,229,0.45)]`}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glare }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

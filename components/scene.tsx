"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, type ReactNode } from "react";
import type { SceneTone } from "@/lib/content";

type SceneProps = {
  tone: SceneTone;
  children: ReactNode;
  className?: string;
  id?: string;
};

/**
 * Scroll-linked scene tone overlay. Drives CSS vars on the section
 * without replacing theme tokens (safe for Terminal).
 */
export function Scene({ tone, children, className = "", id }: SceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const el = ref.current;
    if (!el) return;
    // Peak intensity near mid-viewport (0.35–0.65)
    const intensity = Math.max(0, 1 - Math.abs(v - 0.5) * 2.4);
    el.style.setProperty("--scene-intensity", intensity.toFixed(3));
  });

  return (
    <div
      ref={ref}
      id={id}
      className={`scene scene-${tone} ${className}`.trim()}
      data-scene={tone}
    >
      <div className="scene-overlay" aria-hidden />
      {children}
    </div>
  );
}

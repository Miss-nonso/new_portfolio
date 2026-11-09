"use client";

import {
  motion,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Pace } from "@/lib/content";

type ChapterProps = {
  number: string;
  title: string;
  narration?: string;
  pace?: Pace;
  children: ReactNode;
  className?: string;
  /** Skip title-card (e.g. Hero already has its own entrance) */
  skipCard?: boolean;
};

const paceVars: Record<Pace, { cardMs: number; narrDelay: number; bodyDelay: number }> = {
  fast: { cardMs: 900, narrDelay: 0.12, bodyDelay: 0.28 },
  medium: { cardMs: 1100, narrDelay: 0.16, bodyDelay: 0.4 },
  slow: { cardMs: 1400, narrDelay: 0.22, bodyDelay: 0.55 },
  exhale: { cardMs: 1200, narrDelay: 0.24, bodyDelay: 0.5 },
};

function TitleWithEmphasis({ title }: { title: string }) {
  const words = title.split(" ");
  if (words.length < 2) return <>{title}</>;
  const last = words.pop() as string;
  return (
    <>
      {words.join(" ")} <em>{last}</em>
    </>
  );
}

/**
 * Chapter framing: brief title-card on enter, then settle into layout.
 * Narration line lands before body content.
 */
export function Chapter({
  number,
  title,
  narration,
  pace = "medium",
  children,
  className = "",
  skipCard = false,
}: ChapterProps) {
  const reduce = useReducedMotion();
  const skipAnimation = skipCard || Boolean(reduce);
  const ref = useRef<HTMLDivElement>(null);
  const [showCard, setShowCard] = useState(false);
  const [settled, setSettled] = useState(skipAnimation);
  const played = useRef(false);
  const timing = paceVars[pace];

  // Sync when reduce preference resolves after mount
  const effectiveSettled = skipAnimation || settled;

  useEffect(() => {
    if (skipAnimation) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played.current) return;
        played.current = true;
        setShowCard(true);
        window.setTimeout(() => {
          setShowCard(false);
          setSettled(true);
        }, timing.cardMs);
      },
      { threshold: 0.18, rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [skipAnimation, timing.cardMs]);

  return (
    <div
      ref={ref}
      className={`chapter pace-${pace} ${effectiveSettled ? "is-settled" : ""} ${className}`.trim()}
      data-chapter={number}
    >
      <AnimatePresence>
        {showCard && !reduce && (
          <motion.div
            className="chapter-card"
            aria-hidden
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="chapter-card-number">{number}</p>
            <p className="chapter-card-title">
              <TitleWithEmphasis title={title} />
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {narration ? (
        <motion.p
          className="chapter-narration"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{
            duration: 0.55,
            delay: timing.narrDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {narration}
        </motion.p>
      ) : null}

      <motion.div
        className="chapter-body"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-6% 0px" }}
        transition={{
          duration: pace === "fast" ? 0.45 : pace === "slow" ? 0.75 : 0.6,
          delay: narration ? timing.bodyDelay : timing.narrDelay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>

      <span className="sr-only" aria-live="polite">
        {effectiveSettled ? `Chapter ${number}: ${title}` : ""}
      </span>
    </div>
  );
}

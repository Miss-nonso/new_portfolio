"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Quiet ending beat — logo alone, then tagline, before footer */
export function ClosingBeat() {
  const reduce = useReducedMotion();

  return (
    <section className="closing-beat" aria-label="Closing">
      <motion.div
        className="closing-beat-mark"
        initial={reduce ? false : { opacity: 0, scale: 0.92 }}
        whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      >
        <svg viewBox="0 0 40 40" className="logo-svg" fill="none">
          <path
            className="logo-path"
            d="M26 12.5C26 12.5 20 8 14 12.5C8 17 8 23 14 27.5C20 32 26 27.5 26 27.5M26 12.5V27.5M26 12.5H30C33 12.5 35 14.5 35 20C35 25.5 33 27.5 30 27.5H26"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
      <motion.p
        className="closing-beat-line"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{
          duration: 0.7,
          delay: reduce ? 0 : 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        Built carefully, improved continuously.
      </motion.p>
    </section>
  );
}

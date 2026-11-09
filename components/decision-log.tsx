"use client";

import { useState } from "react";
import { architecture } from "@/lib/content";

/** Exclusive Decision Log — one open at a time, current beat highlighted */
export function DecisionLog() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <ul className="decision-log mt-5">
      {architecture.decisions.map((d, index) => {
        const isOpen = openIndex === index;
        return (
          <li
            key={d.q}
            className={`decision-item ${isOpen ? "is-open is-current" : ""}`}
          >
            <button
              type="button"
              className="decision-trigger"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="font-display text-base font-semibold tracking-tight md:text-lg">
                {d.q}
              </span>
              <span className="decision-plus" aria-hidden>
                +
              </span>
            </button>
            <div className="decision-answer">
              <div className="decision-answer-inner">
                <p>{d.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

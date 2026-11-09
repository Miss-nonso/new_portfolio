"use client";

import { useEffect, useState } from "react";
import { spineChapters } from "@/lib/content";

export function ScrollSpine() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string>("top");

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, scrollTop / max) : 0);

      const offset = window.innerHeight * 0.35;
      let current: string = spineChapters[0].id;
      for (const section of spineChapters) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= offset) {
          current = section.id;
        }
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside
      className="scroll-spine"
      aria-label="Story progress"
      data-active={active}
    >
      <div className="scroll-spine-track throughline-stroke" aria-hidden>
        <div
          className="scroll-spine-fill"
          style={{ transform: `scaleY(${progress})` }}
        />
      </div>
      <nav className="scroll-spine-nav" aria-label="Chapter markers">
        {spineChapters.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`scroll-spine-tick ${active === section.id ? "is-active" : ""}`}
            aria-label={`${section.number} ${section.label}`}
            aria-current={active === section.id ? "true" : undefined}
          >
            <span className="scroll-spine-dot" />
            <span className="scroll-spine-label">
              <span className="scroll-spine-num">{section.number}</span>
              {section.label}
            </span>
          </a>
        ))}
      </nav>
    </aside>
  );
}

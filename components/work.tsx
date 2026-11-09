"use client";

import { useCallback, useRef, useState } from "react";
import { sections, work } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { CursorZone } from "@/components/cursor";
import { Chapter } from "@/components/chapter";
import { Scene } from "@/components/scene";

function ProjectCard({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof work)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const cardRef = useRef<HTMLElement>(null);

  const onMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--cursor-x", `${x}%`);
    el.style.setProperty("--cursor-y", `${y}%`);

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rotX = ((e.clientY - cy) / rect.height) * -6;
    const rotY = ((e.clientX - cx) / rect.width) * 6;
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  }, []);

  const onLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "";
    el.style.setProperty("--cursor-x", "50%");
    el.style.setProperty("--cursor-y", "50%");
  }, []);

  return (
    <article
      ref={cardRef}
      className={`project project-card ${isOpen ? "is-open" : ""}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <button
        type="button"
        className="project-trigger"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span className="font-mono text-sm text-[var(--muted)]">{item.id}</span>
        <div className="min-w-0">
          <p className="section-kicker">{item.category}</p>
          <h3 className="mt-2 max-w-3xl font-display text-xl font-bold tracking-tight md:text-[1.55rem] md:leading-snug">
            {item.title}
          </h3>
          {!isOpen && (
            <p className="mt-3 line-clamp-2 max-w-2xl text-[0.95rem] text-[var(--ink-soft)]">
              {item.summary}
            </p>
          )}
        </div>
        <span className="project-plus" aria-hidden>
          +
        </span>
      </button>

      <div className="project-panel">
        <div className="project-panel-inner">
          <div className="grid gap-6 px-2 pb-10 md:grid-cols-[4.5rem_1fr] md:gap-8 md:px-3">
            <div className="hidden md:block" />
            <div className="max-w-3xl">
              <p className="text-[1.02rem] leading-relaxed text-[var(--ink-soft)]">
                {item.summary}
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--muted)]">
                    Role
                  </p>
                  <p className="mt-1 font-display text-sm font-semibold">{item.role}</p>
                </div>
                <div>
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--muted)]">
                    Impact
                  </p>
                  <p className="mt-1 font-display text-sm font-semibold text-[var(--accent)]">
                    {item.impact}
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.stack.map((tech) => (
                  <span key={tech} className="skill-chip">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="mt-6 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--muted)]">
                Read the case study (+)
              </p>
              <p className="mt-3 text-sm text-[var(--ink-soft)]">
                Full case study detail will be added here. The expand mechanism is
                ready for production copy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Work() {
  const [openId, setOpenId] = useState<string | null>(work[0]?.id ?? null);
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <Scene tone="deep" className="pace-medium">
      <CursorZone
        mode="spotlight"
        label="View"
        id="work"
        className="relative z-10 border-t border-[var(--line)] py-[var(--chapter-pad)]"
      >
        <div className="section-pad section-max">
          <Chapter
            number="02"
            title={sections.work.title}
            narration={sections.work.lede}
            pace="medium"
          >
            <p className="eyebrow">
              {sections.work.eyebrow}
            </p>
            <h2 className="headline mt-5 max-w-[16ch]">
              {sections.work.title}
            </h2>

            <div
              ref={gridRef}
              className="work-spotlight-grid mt-14 border-t border-[var(--line-strong)]"
              onPointerEnter={() => gridRef.current?.classList.add("is-active")}
              onPointerLeave={() =>
                gridRef.current?.classList.remove("is-active")
              }
            >
              {work.map((item, index) => {
                const isOpen = openId === item.id;
                return (
                  <Reveal
                    key={item.id}
                    delay={(Math.min(index + 1, 3) as 1 | 2 | 3)}
                  >
                    <ProjectCard
                      item={item}
                      isOpen={isOpen}
                      onToggle={() => setOpenId(isOpen ? null : item.id)}
                    />
                  </Reveal>
                );
              })}
            </div>
          </Chapter>
        </div>
      </CursorZone>
    </Scene>
  );
}

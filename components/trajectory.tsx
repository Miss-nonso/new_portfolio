"use client";

import { sections, trajectory } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { CursorZone } from "@/components/cursor";
import { Chapter } from "@/components/chapter";
import { Scene } from "@/components/scene";

export function Trajectory() {
  return (
    <Scene tone="base" className="pace-medium">
      <CursorZone
        mode="ring"
        id="trajectory"
        className="relative z-10 border-t border-[var(--line)] py-[var(--chapter-pad)]"
      >
        <div className="section-pad section-max">
          <Chapter number="07" title={sections.trajectory.title} pace="medium">
            <p className="eyebrow">
              {sections.trajectory.eyebrow}
            </p>
            <h2 className="headline mt-5 max-w-[14ch]">
              {sections.trajectory.title}
            </h2>

            <ul className="mt-14">
              {trajectory.map((item, index) => {
                const isFuture = "future" in item && item.future;
                return (
                  <li
                    key={`${item.role}-${item.period}`}
                    className="relative pl-8 md:pl-10"
                  >
                    <span
                      className={`absolute left-0 top-2 h-2.5 w-2.5 rounded-full shadow-[0_0_0_4px_var(--accent-soft)] ${
                        isFuture
                          ? "border border-dashed border-[var(--accent)] bg-transparent"
                          : "bg-[var(--accent)]"
                      }`}
                      aria-hidden
                    />
                    {index < trajectory.length - 1 && (
                      <span
                        className={`traj-line absolute bottom-0 left-[4px] top-5 w-px ${
                          isFuture ? "is-future" : ""
                        }`}
                        aria-hidden
                      />
                    )}
                    <Reveal delay={(Math.min(index + 1, 3) as 1 | 2 | 3)}>
                      <article
                        className={`pb-12 md:pb-14 ${
                          isFuture ? "traj-future mb-2" : ""
                        }`}
                      >
                        <div className="md:grid md:grid-cols-[minmax(0,1fr)_11rem] md:gap-8">
                          <div>
                            <h3 className="font-display text-xl font-bold tracking-tight md:text-[1.35rem]">
                              {item.role}
                            </h3>
                            <p className="mt-3 max-w-2xl text-[0.98rem] leading-relaxed text-[var(--ink-soft)]">
                              {item.detail}
                            </p>
                          </div>
                          <p className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-[var(--muted)] md:mt-1 md:text-right">
                            {item.period}
                          </p>
                        </div>
                      </article>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </Chapter>
        </div>
      </CursorZone>
    </Scene>
  );
}

"use client";

import { evidence, sections } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { CountUp } from "@/components/count-up";
import { CursorZone } from "@/components/cursor";
import { Chapter } from "@/components/chapter";
import { Scene } from "@/components/scene";

export function Evidence() {
  return (
    <Scene tone="base" className="pace-fast">
      <CursorZone
        mode="ring"
        id="evidence"
        className="relative z-10 border-t border-[var(--line)] py-[var(--chapter-pad)]"
      >
        <div className="section-pad section-max">
          <Chapter
            number="01"
            title={sections.evidence.title}
            narration={sections.evidence.lede}
            pace="fast"
          >
            <p className="eyebrow">
              {sections.evidence.eyebrow}
            </p>
            <h2 className="headline mt-5 max-w-[18ch]">
              {sections.evidence.title}
            </h2>

            <div className="evidence-grid mt-10">
              {evidence.map((item, i) => (
                <Reveal
                  key={item.label}
                  delay={(Math.min((i % 3) + 1, 3) as 1 | 2 | 3)}
                >
                  <div className="evidence-cell">
                    <p className="evidence-value">
                      {item.numeric != null ? (
                        <CountUp
                          value={item.numeric}
                          suffix={item.suffix}
                          prefix={item.prefix}
                        />
                      ) : (
                        item.value
                      )}
                    </p>
                    <p className="mt-4 font-display text-base font-semibold tracking-tight">
                      {item.label}
                    </p>
                    <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-[var(--muted)]">
                      {item.detail}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Chapter>
        </div>
      </CursorZone>
    </Scene>
  );
}

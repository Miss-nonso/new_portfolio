"use client";

import { aiEngineering, philosophy, sections } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { CursorZone } from "@/components/cursor";
import { Chapter } from "@/components/chapter";
import { Scene } from "@/components/scene";

export function Approach() {
  return (
    <Scene tone="depth" className="pace-slow">
      <CursorZone
        mode="ring"
        id="approach"
        className="relative z-10 border-t border-[var(--line)] bg-[var(--approach-bg)] py-[var(--chapter-pad)]"
      >
        <div className="section-pad section-max">
          <Chapter
            number="03"
            title={sections.approach.title}
            pace="slow"
          >
            <p className="eyebrow">
              {sections.approach.eyebrow}
            </p>
            <h2 className="headline mt-5 max-w-[16ch]">
              {sections.approach.title}
            </h2>

            <ol className="mt-16 grid gap-0 border-t border-[var(--line-strong)] md:grid-cols-2 lg:grid-cols-3">
              {philosophy.map((item, index) => (
                <li
                  key={item.number}
                  className="border-b border-[var(--line)] py-10 md:border-r md:px-6 md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0 lg:px-7"
                >
                  <Reveal delay={(Math.min((index % 3) + 1, 3) as 1 | 2 | 3)}>
                    <p className="font-mono text-[0.72rem] text-[var(--accent)]">
                      {item.number}
                    </p>
                    <h3 className="mt-4 font-display text-xl italic">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[0.96rem] leading-relaxed text-[var(--ink-soft)]">
                      {item.body}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </Chapter>

          <div id="ai" className="scroll-mt-24">
            <Chapter
              number="04"
              title={aiEngineering.title}
              narration={aiEngineering.lede}
              pace="slow"
            >
              <p className="eyebrow mt-20">
                {sections.ai.eyebrow}
              </p>
              <h3 className="headline mt-5 max-w-[20ch] !text-[clamp(1.8rem,4vw,2.8rem)]">
                {aiEngineering.title}
              </h3>

              <div className="ai-split mt-12">
                <Reveal>
                  <div className="ai-col">
                    <p className="section-kicker">Where I lean on AI</p>
                    <ul className="mt-5 space-y-3">
                      {aiEngineering.leanOn.map((item) => (
                        <li
                          key={item}
                          className="relative pl-4 text-[0.95rem] text-[var(--ink-soft)] before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--signal)]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
                <Reveal delay={2}>
                  <div className="ai-col is-own">
                    <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-[var(--accent)]">
                      Where the buck stops
                    </p>
                    <ul className="mt-5 space-y-3">
                      {aiEngineering.own.map((item) => (
                        <li
                          key={item}
                          className="relative pl-4 text-[0.95rem] text-[var(--ink-soft)] before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--accent)]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </Chapter>
          </div>
        </div>
      </CursorZone>
    </Scene>
  );
}

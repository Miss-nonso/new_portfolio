"use client";

import { architecture, sections } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { CursorZone } from "@/components/cursor";
import { Chapter } from "@/components/chapter";
import { Scene } from "@/components/scene";
import { ArchPipeline } from "@/components/arch-pipeline";
import { DecisionLog } from "@/components/decision-log";

export function Architecture() {
  return (
    <Scene tone="cool" className="pace-slow">
      <CursorZone
        mode="trail"
        label="Systems"
        id="architecture"
        className="relative z-10 border-t border-[var(--line)] py-[var(--chapter-pad)]"
      >
        <div className="section-pad section-max">
          <Chapter
            number="05"
            title={sections.architecture.title}
            narration={sections.architecture.lede}
            pace="slow"
          >
            <p className="eyebrow">
              {sections.architecture.eyebrow}
            </p>
            <h2 className="headline mt-5 max-w-[16ch]">
              {sections.architecture.title}
            </h2>

            <Reveal>
              <p className="section-kicker mt-16">How work typically flows</p>
              <p className="mt-2 max-w-xl text-sm text-[var(--ink-soft)]">
                Push data through the pipeline — drag the handle or use arrow keys.
              </p>
              <ArchPipeline />
            </Reveal>

            <Reveal>
              <div className="arch-modes mt-6">
                {architecture.renderModes.map((mode) => (
                  <div key={mode.code} className="arch-mode">
                    <p className="font-mono text-[0.75rem] font-medium tracking-[0.08em] text-[var(--accent)]">
                      {mode.code}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                      {mode.body}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <p className="section-kicker mt-16">Decisions I make on purpose</p>
              <p className="mt-2 text-sm text-[var(--ink-soft)]">
                Open one at a time — each answer is a beat in the story so far.
              </p>
              <DecisionLog />
            </Reveal>
          </Chapter>
        </div>
      </CursorZone>
    </Scene>
  );
}

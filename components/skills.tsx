"use client";

import { craft, sections } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { CursorZone } from "@/components/cursor";
import { SkillsMarquee } from "@/components/skills-marquee";
import { Chapter } from "@/components/chapter";
import { Scene } from "@/components/scene";

const groups = [
  { title: "Frontend", items: craft.frontend },
  { title: "Backend & Data", items: craft.backend },
  { title: "Practice", items: craft.practice },
  { title: "Domains", items: craft.domains },
] as const;

export function Skills() {
  return (
    <Scene tone="base" className="pace-medium">
      <CursorZone
        mode="ring"
        id="skills"
        className="relative z-10 border-t border-[var(--line)]"
      >
        <div className="bg-[var(--approach-bg)] py-[var(--chapter-pad)]">
          <div className="section-pad section-max">
            <Chapter number="06" title={sections.skills.title} pace="medium">
              <p className="eyebrow">
                {sections.skills.eyebrow}
              </p>
              <h2 className="headline mt-5 max-w-[16ch]">
                {sections.skills.title}
              </h2>

              <div className="mt-14 grid gap-10 md:grid-cols-2">
                {groups.map((group, index) => (
                  <Reveal
                    key={group.title}
                    delay={(Math.min(index + 1, 3) as 1 | 2 | 3)}
                  >
                    <div>
                      <p className="section-kicker">{group.title}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span key={item} className="skill-chip">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Chapter>
          </div>
        </div>
        <SkillsMarquee />
      </CursorZone>
    </Scene>
  );
}

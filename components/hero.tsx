"use client";

import { profile } from "@/lib/content";
import { CursorZone } from "@/components/cursor";
import { Magnetic } from "@/components/magnetic";
import { Scene } from "@/components/scene";

export function Hero() {
  const { hero, trust } = profile;

  return (
    <Scene tone="base">
      <CursorZone
        mode="ring"
        id="top"
        className="relative flex min-h-[100svh] flex-col justify-center pb-20 pt-28 md:pb-24 md:pt-32"
      >
        <div className="section-pad section-max relative z-10 w-full">
          <p className="eyebrow animate-rise">
            {hero.status}
          </p>

          <h1 className="headline animate-rise animate-rise-1 mt-6 max-w-[16ch]">
            I build enterprise software that behaves like a{" "}
            <em className="headline-em">promise kept</em>.
          </h1>

          <p className="subtitle animate-rise animate-rise-2 mt-8 max-w-xl">
            {hero.lede}
          </p>

          <div className="animate-rise animate-rise-3 mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Magnetic>
              <a href={hero.primaryCta.href} className="btn-outline">
                {hero.primaryCta.label}
              </a>
            </Magnetic>
            <Magnetic>
              <a href={hero.secondaryCta.href} className="btn-ghost">
                {hero.secondaryCta.label}
              </a>
            </Magnetic>
            <Magnetic>
              <a href={hero.tertiaryCta.href} className="btn-ghost">
                {hero.tertiaryCta.label}
              </a>
            </Magnetic>
          </div>

          <div className="animate-rise animate-rise-4 trust-strip">
            {trust.map((item) => (
              <span key={item} className="trust-item">
                {item}
              </span>
            ))}
          </div>
        </div>

        <p className="scroll-cue">
          Keep going
        </p>
      </CursorZone>
    </Scene>
  );
}

"use client";

import { profile, sections } from "@/lib/content";
import { CursorZone } from "@/components/cursor";
import { Magnetic } from "@/components/magnetic";
import { Logo } from "@/components/logo";
import { Chapter } from "@/components/chapter";
import { Scene } from "@/components/scene";

export function Contact() {
  return (
    <Scene tone="warm" className="pace-exhale">
      <CursorZone
        mode="label"
        label="Say hello"
        id="contact"
        className="relative z-10 overflow-hidden border-t border-[var(--line)] py-[var(--chapter-pad)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-[var(--signal-soft)] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-[var(--accent-soft)] blur-3xl"
        />

        <div className="section-pad section-max relative">
          <Chapter
            number="08"
            title={sections.contact.title}
            narration={sections.contact.lede}
            pace="exhale"
          >
            <p className="eyebrow">
              {sections.contact.eyebrow}
            </p>
            <h2 className="headline mt-5 max-w-[14ch]">
              {sections.contact.title}
            </h2>

            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a href={`mailto:${profile.email}`} className="btn-outline">
                  Start a conversation
                  <span className="throughline-dot" aria-hidden />
                </a>
              </Magnetic>
            </div>

            <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-[var(--muted)]">
              {profile.replyHint}
            </p>

            <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-[var(--ink-soft)]">
              <Magnetic>
                <a
                  href={`mailto:${profile.email}`}
                  className="hover:text-[var(--accent)]"
                >
                  {profile.email}
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent)]"
                >
                  github.com/Miss-nonso
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent)]"
                >
                  linkedin.com/in/nonso-daniels
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={profile.links.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent)]"
                >
                  pre-portfolio-ten.vercel.app
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={profile.links.resume}
                  className="hover:text-[var(--accent)]"
                >
                  Resume
                </a>
              </Magnetic>
            </div>
          </Chapter>
        </div>
      </CursorZone>
    </Scene>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--line)] py-8">
      <div className="section-pad section-max flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <Logo compact />
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[var(--muted)]">
          © 2026 {profile.name}
        </p>
        <div className="flex items-center gap-5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[var(--muted)]">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent)]"
            aria-label="GitHub"
          >
            GitHub
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent)]"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-[var(--accent)]"
            aria-label="Email"
          >
            Email
          </a>
          <span className="font-display text-sm font-semibold tracking-tight text-[var(--ink-soft)] italic normal-case">
            Lagos → Everywhere.
          </span>
        </div>
      </div>
    </footer>
  );
}

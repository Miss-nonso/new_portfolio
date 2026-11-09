"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Magnetic } from "@/components/magnetic";
import { navSections, profile } from "@/lib/content";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("work");
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setCondensed(y > 80 && y > lastY.current);
      lastY.current = y;

      const offset = window.innerHeight * 0.35;
      let current: string = navSections[0].id;
      for (const section of navSections) {
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
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-[var(--line)] bg-[var(--nav-glass)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="section-pad section-max flex h-[4.25rem] items-center justify-between gap-4">
        <a href="#top" aria-label={`${profile.name}, home`}>
          <Logo compact={condensed} />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-5 lg:flex xl:gap-6">
          {navSections.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-link font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] text-[var(--ink-soft)] transition-colors hover:text-[var(--accent)] ${
                active === link.id ? "is-active" : ""
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggle />
          <Magnetic>
            <a href="#contact" className="btn-outline !px-3 !py-1.5 text-[0.85rem] sm:!px-4">
              Get in touch
            </a>
          </Magnetic>
          <button
            type="button"
            className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--ink-soft)] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="section-pad border-t border-[var(--line)] py-4 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-3">
            {navSections.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--ink-soft)]"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

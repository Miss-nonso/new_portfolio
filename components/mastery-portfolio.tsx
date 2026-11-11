"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { PlaygroundGames } from "@/components/playground-games";
import { ScrollFootprints } from "@/components/scroll-footprints";
import { SkillOrbit } from "@/components/skill-orbit";

const work = [
  {
    number: "01",
    name: "Kanban Dashboard",
    type: "WORKFLOW SYSTEM",
    result:
      "A focused planning surface where status, priority, and movement stay legible.",
    detail:
      "Next.js, React, TypeScript, Tailwind CSS · interaction and state modelling.",
    href: "https://purple-kanban.netlify.app/",
  },
  {
    number: "02",
    name: "Photosnap",
    type: "CONTENT PLATFORM",
    result:
      "A responsive publishing experience built around hierarchy, pace, and repeatable UI patterns.",
    detail: "Next.js, React, Tailwind CSS · responsive system design.",
    href: "https://perfecto-photosnap.netlify.app/",
  },
  {
    number: "03",
    name: "Techember",
    type: "BOOKING FLOW",
    result:
      "A ticketing journey that makes each decision explicit before asking for commitment.",
    detail:
      "Next.js, React, Tailwind CSS · form flow and conversion-focused UX.",
    href: "https://conference-ticket-generator-rolr.vercel.app/",
  },
  {
    number: "04",
    name: "FourDevs",
    type: "PRODUCT NARRATIVE",
    result:
      "A product surface that explains value quickly, then gives the details room to land.",
    detail:
      "Next.js, React, Tailwind CSS · information architecture and motion.",
    href: "https://professionalll.netlify.app/",
  },
  {
    number: "05",
    name: "World Countries",
    type: "DATA EXPLORER",
    result:
      "A browseable data set shaped into a fast, filterable decision interface.",
    detail:
      "Next.js, REST Countries API, Tailwind CSS · API state, search, filtering, theming.",
    href: "https://kodecamp-tau.vercel.app/",
  },
  {
    number: "06",
    name: "WhatsApp Clone",
    type: "INTERFACE STUDY",
    result:
      "A desktop conversation interface rebuilt to study information density and interaction detail.",
    detail:
      "Next.js, React, Tailwind CSS · component composition and UI fidelity.",
    href: "https://whatsapp-vanilla.vercel.app/",
  },
];

const careerJourney = [
  {
    number: "01",
    period: "FOUNDATIONS / FLEXISAF",
    title: "Learning to make quality visible.",
    summary:
      "Built accessible UI and validated multi-step flows so critical journeys stayed usable, reviewable, and easier to support.",
    impact: "ACCESSIBLE BY DEFAULT",
    outcome:
      "Quality moved upstream: fewer exclusions, fewer avoidable form failures, clearer handoff.",
    tags: ["React", "WCAG", "React Hook Form", "Technical demos"],
  },
  {
    number: "02",
    period: "CLIENT DELIVERY / MYLLASH",
    title: "Adapt to the job, not just the stack.",
    summary:
      "Delivered client platforms under pressure, modernised legacy JavaScript, and learned PHP in flight when the scope demanded it.",
    impact: "15% FASTER DELIVERY",
    outcome:
      "Reusable patterns made delivery faster without lowering the bar on what shipped.",
    tags: ["React", "PHP", "REST APIs", "Client delivery"],
  },
  {
    number: "03",
    period: "FOUNDING TEAM / YOUREKAA",
    title: "Own the frontend from question to release.",
    summary:
      "Owned the frontend from research to production: clarified journeys, shaped the UI architecture, shipped, measured, and improved.",
    impact: "40% MORE ENGAGEMENT",
    outcome:
      "Lighthouse reached 92 and initial load fell 25%, giving the product more room to convert.",
    tags: ["Next.js", "Research", "UI architecture", "Deployment"],
  },
  {
    number: "04",
    period: "NOW / POWERLABS",
    title: "Make operational complexity workable.",
    summary:
      "Delivered energy trading, fleet monitoring, support, and multi-tenant workflows where reliability shapes daily decisions.",
    impact: "98.61% LESS WAITING",
    outcome:
      "Reduced data-layer load time and made operational insight faster to reach when it mattered.",
    tags: ["FastAPI", "PostgreSQL", "IoT", "Multi-tenant SaaS"],
  },
];

function DoodleArrow() {
  return (
    <span className="doodle-arrow" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

export function MasteryPortfolio() {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(0);
  const [view, setView] = useState<"grid" | "orbit" | "carousel">("grid");
  const [carouselIndex, setCarouselIndex] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.18,
      easing: (progress) => 1 - Math.pow(1 - progress, 4),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.92,
      anchors: true,
    });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };
    frame = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
  useEffect(() => {
    const move = (event: PointerEvent) => {
      root.current?.style.setProperty("--mx", `${event.clientX}px`);
      root.current?.style.setProperty("--my", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = Math.min(
        1,
        window.scrollY / Math.max(window.innerHeight, 1),
      );
      root.current?.style.setProperty(
        "--scroll-turn",
        `${window.scrollY * 0.06}deg`,
      );
      root.current?.style.setProperty("--scroll-lift", `${progress * -48}px`);
      root.current?.style.setProperty("--scroll-fade", `${1 - progress * 0.3}`);
    };
    const scroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", scroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const candidates = Array.from(
      root.current?.querySelectorAll<HTMLElement>(
        [
          ".skill-orbit-section",
          ".fusion-work",
          ".mastery-proof",
          ".playroom",
          ".mastery-contact",
          ".skill-orbit-heading > *",
          ".skill-segment",
          ".fusion-project",
          ".dream-stop",
          ".game",
          ".mastery-contact > *",
        ].join(","),
      ) ?? [],
    );

    candidates.forEach((element, index) => {
      element.classList.add("scroll-reveal");
      element.style.setProperty("--reveal-order", String(index % 5));
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-in-view", entry.isIntersecting);
        });
      },
      { rootMargin: "-8% 0px -8%", threshold: 0.08 },
    );
    candidates.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      candidates.forEach((element) => {
        element.classList.remove("scroll-reveal", "is-in-view");
        element.style.removeProperty("--reveal-order");
      });
    };
  }, []);
  return (
    <div className="mastery" ref={root}>
      <ScrollFootprints />
      <a className="mastery-skip" href="#work">
        Skip to work
      </a>
      <header className="mastery-nav">
        <a
          href="#top"
          className="mastery-mark"
          aria-label="Chinonso Daniels home"
        >
          CD
          <DoodleArrow />
        </a>
        <p>CHINONSO DANIELS / SOFTWARE ENGINEER</p>
        <nav>
          <a href="#skills">Skills</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <main id="top">
        <section className="mastery-hero fusion-hero">
          <div className="hero-orbit" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="code-construct" aria-hidden="true">
            <div className="code-rotor">
              <span>&lt;/&gt;</span>
              <span>{`{ }`}</span>
              <span>fn()</span>
              <span>01</span>
              <span>API</span>
              <span>→</span>
            </div>
          </div>
          <div className="hero-sticker sticker-one">
            FULL-STACK
            <br />
            ENGINEER
          </div>
          <div className="hero-sticker sticker-two">
            FOLLOW
            <br />
            THE PROBLEM <DoodleArrow />
          </div>
          <div className="mastery-statement">
            <p>CHINONSO DANIELS / LAGOS, NG</p>
            <h1>
              BUILDING SOFTWARE
              <br />
              FOR <em>REAL-WORLD</em>
              <br />
              DECISIONS.
            </h1>
          </div>
          <div className="hero-foot">
            <p>
              I take complicated product requirements and turn them into
              software people can pick up, trust, and use.
            </p>
            <div className="hero-actions">
              <a className="hero-work-link" href="#work">
                See selected work <span>↓</span>
              </a>
              <a
                className="hero-email-link"
                href="mailto:chinonsodaniels2020@gmail.com"
              >
                Email Chinonso <DoodleArrow />
              </a>
              <a className="hero-contact-link" href="#contact">
                Start a conversation <DoodleArrow />
              </a>
            </div>
          </div>
        </section>
        <SkillOrbit />
        <section className="mastery-work fusion-work" id="work">
          <div className="section-label">
            SELECTED WORK / PROBLEMS MADE USEFUL
          </div>
          <h2>
            Built to make
            <br />
            <em>work move.</em>
          </h2>
          <div className="work-viewbar" aria-label="Project gallery view">
            <span>VIEW</span>
            {(["grid", "orbit", "carousel"] as const).map((option) => (
              <button
                key={option}
                onClick={() => setView(option)}
                aria-pressed={view === option}
              >
                {option}
              </button>
            ))}
            <i>{String(work.length).padStart(2, "0")} PROJECTS</i>
          </div>
          <div className={`work-list work-view-${view}`}>
            {work.map((item, index) => (
              <article
                key={item.name}
                className={`fusion-project fusion-project-${index} ${open === index ? "is-open" : ""} ${carouselIndex === index ? "is-current" : ""}`}
              >
                <button
                  onClick={() => {
                    setOpen(index);
                    if (view === "carousel") setCarouselIndex(index);
                  }}
                  aria-expanded={open === index}
                  tabIndex={
                    view === "carousel" && carouselIndex !== index
                      ? -1
                      : undefined
                  }
                >
                  <div className="project-ornament" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                  <span>
                    {item.number} / {item.type}
                  </span>
                  <strong>{item.name}</strong>
                  <small>{item.result}</small>
                  <DoodleArrow />
                </button>
                {open === index && (
                  <div className="work-detail">
                    <p>{item.result}</p>
                    <span>{item.detail}</span>
                    <a
                      className="project-live"
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open live project <DoodleArrow />
                    </a>
                  </div>
                )}
              </article>
            ))}
          </div>
          {view === "carousel" && (
            <div className="carousel-nav">
              <button
                onClick={() =>
                  setCarouselIndex(
                    (index) => (index - 1 + work.length) % work.length,
                  )
                }
                aria-label="Previous project"
              >
                ←
              </button>
              <span>
                {String(carouselIndex + 1).padStart(2, "0")} /{" "}
                {String(work.length).padStart(2, "0")}
              </span>
              <button
                onClick={() =>
                  setCarouselIndex((index) => (index + 1) % work.length)
                }
                aria-label="Next project"
              >
                →
              </button>
            </div>
          )}
          <a className="work-cta" href="#contact">
            Have a problem with stakes? Let’s talk. <DoodleArrow />
          </a>
        </section>
        <section className="mastery-proof" id="proof">
          <div className="proof-title">
            <span>03 / WHAT I BUILD FOR</span>
            <h2>
              Systems that
              <br />
              stay useful
              <br />
              <em>after I leave.</em>
            </h2>
          </div>
          <p className="journey-intro">
            A client should be able to change a rule, add a team, or make a
            decision without reopening the whole product. I build for that kind
            of independence.
          </p>
          <div
            className="career-dreamline"
            aria-label="Professional experience journey"
          >
            <div className="dream-route" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <b>&lt;/&gt;</b>
              <strong>01</strong>
              <em>API</em>
            </div>
            {careerJourney.map((stop, index) => (
              <article
                className={`dream-stop dream-stop-${index + 1}`}
                key={stop.number}
              >
                <div className="dream-stop-number" aria-hidden="true">
                  {stop.number}
                </div>
                <div className="dream-stop-copy">
                  <div className="company-lockup">
                    <b>{stop.period.split(" / ")[1]}</b>
                    <span>{stop.period.split(" / ")[0]}</span>
                  </div>
                  <h3>{stop.title}</h3>
                  <p>{stop.summary}</p>
                  <p className="dream-outcome">
                    <b>BUSINESS IMPACT</b>
                    <span>
                      <strong>{stop.impact}</strong>
                      {stop.outcome}
                    </span>
                  </p>
                  <div
                    className="journey-tags"
                    aria-label="Tools and focus areas"
                  >
                    {stop.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="dream-glyph" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <b>
                      {index === 0
                        ? "a11y"
                        : index === 1
                          ? "php"
                          : index === 2
                            ? "ship"
                            : "sync"}
                    </b>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="operating-principles">
            <span>THE STANDARD</span>
            <ul>
              <li>Consequences before frameworks.</li>
              <li>Simplicity that survives change.</li>
              <li>
                Permissions, failure, and performance are product decisions.
              </li>
              <li>Documentation is part of delivery.</li>
            </ul>
          </div>
        </section>
        <PlaygroundGames />
        <section className="mastery-contact" id="contact">
          <span>04 / LET’S TALK</span>
          <h2>
            When it has
            <br />
            to <em>ship,</em>
            <br />
            bring me in.
          </h2>
          <p className="contact-intent">
            Products need engineers who can think, decide, and deliver...
          </p>
          <a href="mailto:chinonsodaniels2020@gmail.com">
            Start the Conversation. <DoodleArrow />
          </a>
          <div>
            <a href="https://github.com/Miss-nonso">GitHub</a>
            <a href="https://linkedin.com/in/nonso-daniels">LinkedIn</a>
            <a href="/Chinonso-Daniels-CV.txt" download>
              Download CV
            </a>
            <a href="mailto:chinonsodaniels2020@gmail.com">
              Book a conversation
            </a>
          </div>
          <footer className="mastery-footer">
            <a
              className="mastery-footer-mark"
              href="#top"
              aria-label="Back to top"
            >
              CD
              <DoodleArrow />
            </a>
            <p>Build what people can depend on.</p>

            <small>© 2026 CHINONSO DANIELS / LAGOS, NG</small>
          </footer>
        </section>
      </main>
    </div>
  );
}

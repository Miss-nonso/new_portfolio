"use client";

import { useEffect, useRef, useState } from "react";
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
    summary: "Built accessible React components and secure multi-step flows, then explained the architecture in technical demos so implementation could travel beyond one person.",
    outcome: "Accessibility, validation, and clear technical communication became non-negotiables.",
    tags: ["React", "WCAG", "React Hook Form", "Technical demos"],
  },
  {
    number: "02",
    period: "CLIENT DELIVERY / MYLLASH",
    title: "Adapt to the job—not just the stack.",
    summary: "Delivered across corporate and service sites, modernised legacy JavaScript, and stepped into PHP when a client project required it—even though it was outside my original toolkit.",
    outcome: "Reduced average delivery time by 15% by learning what the job needed and turning that learning into reusable delivery patterns.",
    tags: ["React", "PHP", "REST APIs", "Client delivery"],
  },
  {
    number: "03",
    period: "FOUNDING TEAM / YOUREKAA",
    title: "Own the frontend from question to release.",
    summary: "Owned frontend decisions and development end to end: researching the user journey, translating product direction into a component system, building the experience, and carrying it through deployment.",
    outcome: "Improved engagement and retention by 40%; lifted Lighthouse performance to 92 and reduced initial load time by 25% through focused performance work.",
    tags: ["Next.js", "Research", "UI architecture", "Deployment"],
  },
  {
    number: "04",
    period: "NOW / POWERLABS",
    title: "Make operational complexity workable.",
    summary: "Lead frontend delivery across energy-trading flows, fleet monitoring, customer support, and multi-tenant administration—connecting backend, analytics, IoT, and product concerns into tools people can operate confidently.",
    outcome: "Cut data-layer load time by 98.61% after evaluating the system path, while helping shape the architecture behind enterprise-scale workflows.",
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
  const [activeCareerStop, setActiveCareerStop] = useState<number | null>(null);
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
            <a href="#work">
              See selected work <span>↓</span>
            </a>
          </div>
        </section>
        <PlaygroundGames />
        <SkillOrbit />
        <section className="mastery-work fusion-work" id="work">
          <div className="section-label">
            SELECTED WORK / SYSTEMS, FLOWS, INTERFACES
          </div>
          <h2>
            Work made
            <br />
            <em>to be used.</em>
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
        </section>
        <section className="mastery-proof" id="proof">
          <div className="proof-title">
            <span>03 / EXPERIENCE &amp; APPROACH</span>
            <h2>
              Leave the system
              <br />
              stronger—and ready
              <br />
              <em>for what changes next.</em>
            </h2>
          </div>
          <p className="journey-intro">
            I build systems clients can depend on—not one-off solutions that
            need to be reshaped every time the work changes. Choose a chapter to
            see how that point of view was earned.
          </p>
          <div className={`career-journey ${activeCareerStop === null ? "is-sealed" : "is-open"}`} aria-label="Professional experience journey">
            <div className="journey-stops" role="tablist" aria-label="Career stops">
              {careerJourney.map((stop, index) => (
                <button
                  key={stop.number}
                  type="button"
                  role="tab"
                  aria-selected={activeCareerStop === index}
                  aria-controls="career-story"
                  className={activeCareerStop === index ? "is-active" : ""}
                  onClick={() => setActiveCareerStop(index)}
                >
                  <i aria-hidden="true" />
                  <span>{stop.number}</span>
                  <strong>{stop.period.split(" / ")[0]}</strong>
                  <small>{stop.period.split(" / ")[1]}</small>
                  <em>open chapter</em>
                </button>
              ))}
            </div>
            {activeCareerStop === null ? (
              <div className="journey-placeholder" aria-live="polite">
                <span>THE WORK IS IN THE DETAILS</span>
                <p>Open any stop on the trail.</p>
              </div>
            ) : (
              <article className="journey-story" id="career-story" role="tabpanel" key={careerJourney[activeCareerStop].number}>
                <div className="journey-story-index" aria-hidden="true">{careerJourney[activeCareerStop].number}</div>
                <div>
                  <div className="journey-story-topline"><span>{careerJourney[activeCareerStop].period}</span><button type="button" onClick={() => setActiveCareerStop(null)}>close chapter ×</button></div>
                  <h3>{careerJourney[activeCareerStop].title}</h3>
                  <p>{careerJourney[activeCareerStop].summary}</p>
                  <p className="journey-outcome"><b>What changed</b>{careerJourney[activeCareerStop].outcome}</p>
                  <div className="journey-tags" aria-label="Tools and focus areas">
                    {careerJourney[activeCareerStop].tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </article>
            )}
          </div>
          <div className="operating-principles">
            <span>THE DECISIONS I KEEP</span>
            <ul>
              <li>Start with the user, business, and operational consequence—not the framework.</li>
              <li>Choose the simplest architecture that carries today’s constraints and leaves room for tomorrow.</li>
              <li>Treat data shape, permissions, performance, and failure states as product work.</li>
              <li>Write decisions down so design, product, and engineering can move with shared context.</li>
            </ul>
          </div>
        </section>
        <section className="mastery-contact" id="contact">
          <span>04 / START A CONVERSATION</span>
          <h2>
            Have a system
            <br />
            worth improving?
          </h2>
          <a href="mailto:chinonsodaniels2020@gmail.com">
            Let’s find the signal. <DoodleArrow />
          </a>
          <div>
            <a href="https://github.com/Miss-nonso">GitHub</a>
            <a href="https://linkedin.com/in/nonso-daniels">LinkedIn</a>
            <a href="/Chinonso-Daniels-CV.txt" download>
              Download CV
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

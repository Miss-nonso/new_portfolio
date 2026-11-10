"use client";

import { useRef, useState } from "react";

const groups = [
  {
    name: "What people touch",
    items: [
      "TypeScript",
      "JavaScript (ES6+)",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Bootstrap",
      "MobX",
      "Recharts",
      "Chart.js",
      "shadcn/ui",
    ],
  },
  {
    name: "What makes it hold",
    items: [
      "FastAPI",
      "Python",
      "Node.js",
      "REST APIs",
      "Firebase Auth",
      "MongoDB",
      "PostgreSQL",
      "TigerCloud DB",
    ],
  },
  {
    name: "How change stays safe",
    items: [
      "Accessible UI (WCAG)",
      "Performance",
      "Component architecture",
      "Figma to code",
      "Technical documentation",
      "Git · Agile",
      "AI-assisted development",
    ],
  },
  {
    name: "Where it gets real",
    items: [
      "IoT dashboards",
      "Multi-tenant SaaS",
      "Enterprise apps",
      "Growth-stage startups",
    ],
  },
];

export function SkillOrbit() {
  const field = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    field.current?.style.setProperty(
      "--field-x",
      `${((event.clientX - bounds.left) / bounds.width - 0.5) * 7}deg`,
    );
    field.current?.style.setProperty(
      "--field-y",
      `${((event.clientY - bounds.top) / bounds.height - 0.5) * -7}deg`,
    );
  };

  return (
    <section className="skill-orbit-section" id="skills">
      <div className="skill-orbit-heading">
        <span>02 / TOOLS &amp; JUDGMENT</span>
        <h2>
          The stack is
          <br />
          <em>never the strategy.</em>
        </h2>
        <p>
          I learn fast, but I do not chase tools. I choose the clearest way to
          make a system perform now and absorb the change that is already on its
          way.
        </p>
        <a className="capability-cta" href="#work">See the proof <span>↓</span></a>
      </div>
      <div
        className="skill-segment-field"
        ref={field}
        onPointerMove={move}
        onPointerLeave={() => {
          field.current?.style.setProperty("--field-x", "0deg");
          field.current?.style.setProperty("--field-y", "0deg");
        }}
      >
        <div className="field-grid" aria-hidden="true" />
        {groups.map((group, index) => (
          <article
            className={`skill-segment ${active === index ? "is-active" : ""}`}
            key={group.name}
            onPointerEnter={() => setActive(index)}
            onPointerLeave={() => setActive(null)}
            onFocus={() => setActive(index)}
            onBlur={() => setActive(null)}
            style={{ "--segment": index } as React.CSSProperties}
          >
            <span className="segment-number">0{index + 1}</span>
            <h3>{group.name}</h3>
            <div>
              {group.items.map((item) => (
                <button type="button" key={item}>
                  {item}
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

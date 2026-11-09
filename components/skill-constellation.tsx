"use client";

import { useRef, useState } from "react";

const stars = [
  { name: "React", x: 18, y: 58, projects: "Sentinel · Pai" },
  { name: "TypeScript", x: 37, y: 28, projects: "All projects" },
  { name: "Next.js", x: 68, y: 21, projects: "Yourekaa" },
  { name: "FastAPI", x: 74, y: 64, projects: "Sentinel · Pai" },
  { name: "PostgreSQL", x: 47, y: 76, projects: "Pai" },
  { name: "Recharts", x: 87, y: 43, projects: "Sentinel" },
  { name: "Accessibility", x: 26, y: 87, projects: "Every interface" },
];
const links = [[0, 1], [1, 2], [1, 4], [0, 4], [2, 5], [5, 3], [4, 3], [4, 6]];

export function SkillConstellation() {
  const field = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const inertia = useRef({ x: 0, y: 0, vx: 0, vy: 0, frame: 0 });

  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !field.current) return;
    const rect = field.current.getBoundingClientRect();
    const nextX = (event.clientX - rect.left - rect.width / 2) * .018;
    const nextY = (event.clientY - rect.top - rect.height / 2) * .018;
    inertia.current.vx = nextX - inertia.current.x;
    inertia.current.vy = nextY - inertia.current.y;
    inertia.current.x = nextX;
    inertia.current.y = nextY;
    field.current.style.setProperty("--map-x", `${nextX}deg`);
    field.current.style.setProperty("--map-y", `${nextY}deg`);
  };
  const leave = () => {
    if (!field.current) return;
    cancelAnimationFrame(inertia.current.frame);
    const settle = () => {
      inertia.current.vx *= .88; inertia.current.vy *= .88;
      inertia.current.x += inertia.current.vx; inertia.current.y += inertia.current.vy;
      field.current?.style.setProperty("--map-x", `${inertia.current.x}deg`);
      field.current?.style.setProperty("--map-y", `${inertia.current.y}deg`);
      if (Math.abs(inertia.current.vx) + Math.abs(inertia.current.vy) > .02) inertia.current.frame = requestAnimationFrame(settle);
    };
    inertia.current.frame = requestAnimationFrame(settle);
  };

  return <section className="constellation" id="constellation"><div className="constellation-copy"><span className="mini-label">04 / THE CONSTELLATION</span><h2>Skills become useful<br/>when they <em>connect.</em></h2><p>Hover a star to see the work it helps hold together. Move across the field to change its depth.</p><output aria-live="polite">{active === null ? "Choose a star." : `${stars[active].name} → ${stars[active].projects}`}</output></div><div ref={field} className="star-field" onPointerMove={move} onPointerLeave={leave} aria-label="Interactive skill constellation">
    <svg viewBox="0 0 100 100" aria-hidden="true">{links.map(([from, to]) => <line key={`${from}-${to}`} className={active === null || from === active || to === active ? "is-lit" : ""} x1={stars[from].x} y1={stars[from].y} x2={stars[to].x} y2={stars[to].y}/>)}</svg>
    {stars.map((star, index) => <button key={star.name} type="button" className={`star ${active === index ? "is-active" : ""}`} style={{ left: `${star.x}%`, top: `${star.y}%` }} onFocus={() => setActive(index)} onMouseEnter={() => setActive(index)} onClick={() => setActive(index)} aria-label={`${star.name}: ${star.projects}`}><i/><span>{star.name}</span></button>)}
  </div></section>;
}

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function LivingSystem({ children }: { children: ReactNode }) {
  const [awake, setAwake] = useState(false);
  const previous = useRef({ x: 0, y: 0, scroll: 0 });
  const idle = useRef<number | undefined>(undefined);

  useEffect(() => {
    const root = document.documentElement;
    const move = (event: PointerEvent) => {
      const dx = event.clientX - previous.current.x;
      const dy = event.clientY - previous.current.y;
      const velocity = Math.min(1, Math.hypot(dx, dy) / 60);
      previous.current.x = event.clientX; previous.current.y = event.clientY;
      root.style.setProperty("--system-x", `${event.clientX}px`);
      root.style.setProperty("--system-y", `${event.clientY}px`);
      root.style.setProperty("--system-energy", String(velocity));
      root.dataset.systemIdle = "false";
      if (idle.current) window.clearTimeout(idle.current);
      idle.current = window.setTimeout(() => { root.dataset.systemIdle = "true"; }, 1400);
    };
    const scroll = () => {
      const current = window.scrollY;
      const direction = current >= previous.current.scroll ? 1 : -1;
      const velocity = Math.min(1, Math.abs(current - previous.current.scroll) / 80);
      previous.current.scroll = current;
      root.style.setProperty("--system-scroll", String(velocity * direction));
      root.style.setProperty("--system-progress", String(current / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)));
    };
    const impulse = () => { root.style.setProperty("--system-impulse", "1"); window.setTimeout(() => root.style.setProperty("--system-impulse", "0"), 360); };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("pointerdown", impulse, { passive: true });
    scroll();
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("scroll", scroll); window.removeEventListener("pointerdown", impulse); if (idle.current) window.clearTimeout(idle.current); };
  }, []);

  const enter = (recruiter = false) => { setAwake(true); if (recruiter) window.setTimeout(() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }), 80); };
  return <div className={`living-system ${awake ? "is-awake" : "is-dormant"}`}><div className="system-grain" aria-hidden="true"/><div className="system-field" aria-hidden="true"/><div className="system-nodes" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <i key={index}/>)}</div>{!awake && <section className="system-threshold" aria-labelledby="system-title"><span className="system-mark" aria-hidden="true">⊹</span><p>CHINONSO DANIELS / INTERACTIVE PORTFOLIO</p><h1 id="system-title">The system<br/><em>wakes up.</em></h1><span className="system-threshold-copy">Move, click, or enter. Every input changes the field.</span><div><button type="button" onClick={() => enter()}>Enter the system <span>↗</span></button><button type="button" onClick={() => enter(true)}>Recruiter view <span>→</span></button></div></section>}<div className="system-content">{children}</div></div>;
}

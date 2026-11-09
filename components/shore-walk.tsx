"use client";

import { useEffect, useRef } from "react";

export function ShoreWalk() {
  const scene = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = (event: PointerEvent) => {
      const bounds = scene.current?.getBoundingClientRect();
      if (!bounds) return;
      const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
      const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
      scene.current?.style.setProperty("--tilt-x", `${(0.5 - y) * 10}deg`);
      scene.current?.style.setProperty("--tilt-y", `${(x - 0.5) * 14}deg`);
      scene.current?.style.setProperty("--glow-x", `${x * 100}%`);
      scene.current?.style.setProperty("--glow-y", `${y * 100}%`);
    };
    window.addEventListener("pointermove", update, { passive: true });
    return () => window.removeEventListener("pointermove", update);
  }, []);

  return <div className="shore-walk" ref={scene} aria-hidden="true">
    <div className="shore-sun" />
    <div className="shore-glow" />
    <div className="shore-water"><i /><i /><i /><i /></div>
    <div className="shore-sand" />
    <div className="shore-footprints">{Array.from({ length: 9 }, (_, index) => <i key={index} />)}</div>
    <div className="shore-sparkles">{Array.from({ length: 18 }, (_, index) => <i key={index} />)}</div>
  </div>;
}

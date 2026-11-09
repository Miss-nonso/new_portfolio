"use client";

import { useEffect, useRef } from "react";

type JourneyId =
  | "top"
  | "evidence"
  | "work"
  | "approach"
  | "ai"
  | "architecture"
  | "skills"
  | "trajectory"
  | "contact";

const CHAPTERS: JourneyId[] = [
  "top",
  "evidence",
  "work",
  "approach",
  "ai",
  "architecture",
  "skills",
  "trajectory",
  "contact",
];

function parseColor(raw: string, fallback: [number, number, number]) {
  const t = raw.trim();
  const hex = t.match(/^#([0-9a-f]{6})$/i);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as const;
  }
  const rgb = t.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/i);
  if (rgb) return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])] as const;
  return fallback;
}

function seed(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * A living paper-print world. Vertical scroll becomes travel along a path,
 * with drifting clusters, a traveler, and a cursor wake.
 * Inspired by The Bridge's texture — original geometry, not their landmark.
 */
export function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -999, y: -999 };
    let journey: JourneyId = "top";
    let raf = 0;
    let last = 0;
    let time = 0;
    let running = true;

    const clouds = Array.from({ length: 7 }, (_, i) => ({
      x: seed(i + 2) * 1.8,
      y: 0.12 + seed(i + 9) * 0.32,
      s: 10 + seed(i + 4) * 16,
      drift: 0.08 + seed(i + 7) * 0.12,
    }));

    const tokens = () => {
      const s = getComputedStyle(document.documentElement);
      return {
        ink: parseColor(s.getPropertyValue("--ink"), [244, 244, 245]),
        accent: parseColor(s.getPropertyValue("--accent"), [212, 168, 75]),
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const activeChapter = (): JourneyId => {
      const offset = window.innerHeight * 0.38;
      let current: JourneyId = "top";
      for (const id of CHAPTERS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) current = id;
      }
      return current;
    };

    const paint = (dt: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const { ink, accent } = tokens();
      const cell = Math.max(10, Math.round(Math.min(w, h) * 0.011));
      const max = document.documentElement.scrollHeight - h;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      const worldX = reduce ? 0 : window.scrollY * 0.55;
      const roadY = Math.round((h * 0.92) / cell) * cell;
      journey = activeChapter();

      const denser = journey === "work" || journey === "architecture";
      const sparser = journey === "contact" || journey === "top";
      const cool = journey === "architecture" || journey === "ai";

      const px = (x: number, y: number, rgb: readonly number[], a: number) => {
        if (x < -cell || y < -cell || x > w + cell || y > h + cell || a <= 0.02) return;
        const nx = (x - w * 0.4) / (w * 0.36);
        const ny = (y - h * 0.4) / (h * 0.38);
        const read = Math.max(0, 1 - Math.hypot(nx, ny));
        const faded = a * (1 - read * 0.88);
        if (faded <= 0.02) return;
        ctx.globalAlpha = faded;
        ctx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
        ctx.fillRect(
          Math.round(x / cell) * cell,
          Math.round(y / cell) * cell,
          cell - 1,
          cell - 1,
        );
      };

      // Paper field — quieter in the reading column
      const cols = Math.ceil(w / cell) + 2;
      const rows = Math.ceil(h / cell) + 2;
      const fieldAlpha = denser ? 0.08 : sparser ? 0.04 : 0.06;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * cell;
          const y = r * cell;
          const n = seed(c * 13.1 + r * 7.7 + Math.floor(worldX / (cell * 4)) * 0.17);
          if (n > 0.22) continue;
          const dist = Math.hypot(x - pointer.x, y - pointer.y);
          const wake = Math.max(0, 1 - dist / 160);
          px(x, y, cool ? accent : ink, fieldAlpha + wake * 0.14);
        }
      }

      // Drifting clusters (the "clouds")
      if (!reduce) time += dt * 0.00008;
      clouds.forEach((cloud, i) => {
        const cx = ((cloud.x * w + time * cloud.drift * 40 - worldX * 0.2) % (w + 180)) - 60;
        const cy = cloud.y * h + Math.sin(time * 0.9 + i) * 8;
        for (let dy = -cloud.s; dy <= cloud.s; dy += cell) {
          for (let dx = -cloud.s * 1.8; dx <= cloud.s * 1.8; dx += cell) {
            const nx = dx / (cloud.s * 1.8);
            const ny = dy / cloud.s;
            if (nx * nx + ny * ny * 1.5 > 0.85) continue;
            if (seed(i * 40 + dx + dy) < 0.35) continue;
            px(cx + dx, cy + dy, ink, 0.09 + seed(i + dx) * 0.06);
          }
        }
      });

      // Horizon path — the throughline, as a road of pixels
      for (let x = 0; x < w; x += cell) {
        const dip = Math.sin((x + worldX) * 0.004) * (journey === "trajectory" ? 18 : 6);
        px(x, roadY + dip, ink, 0.18);
        px(x, roadY + cell + dip, ink, 0.08);
      }

      // Twin cables — suspension geometry that isn't a landmark
      const amp = h * (journey === "architecture" ? 0.22 : 0.16);
      const span = w * 1.15;
      for (let i = 0; i < 90; i++) {
        const t = i / 89;
        const local = (t * span + worldX * 0.35) % span;
        const u = local / span;
        const y = roadY - amp * 4 * u * (1 - u);
        px(local - 40, y, accent, 0.18);
        px(local - 40 + cell * 18, y + cell * 2, accent, 0.1);
      }

      // Vertical hangers from cable to path
      for (let i = 4; i < 22; i++) {
        const x = (i / 22) * w;
        const u = ((x + worldX * 0.35) % span) / span;
        const cap = roadY - amp * 4 * u * (1 - u);
        for (let y = cap; y < roadY; y += cell * 2) {
          px(x, y, accent, 0.06);
        }
      }

      // Traveler on the path — you, moving with the story
      const tx = w * (0.18 + progress * 0.62);
      const ty = roadY + Math.sin((tx + worldX) * 0.004) * 6;
      px(tx, ty, accent, 0.95);
      px(tx - cell, ty, accent, 0.45);
      px(tx - cell * 2, ty, accent, 0.2);
      px(tx, ty - cell, accent, 0.55);

      // Cursor wake
      if (pointer.x > 0) {
        px(pointer.x, pointer.y, accent, 0.55);
        px(pointer.x + cell, pointer.y, ink, 0.25);
        px(pointer.x, pointer.y + cell, ink, 0.2);
      }

      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      if (!running) return;
      const dt = now - last;
      if (!document.hidden && dt >= 42) {
        last = now;
        paint(reduce ? 0 : dt);
      }
      if (reduce) return;
      raf = requestAnimationFrame(loop);
    };

    resize();
    last = performance.now();
    if (reduce) {
      paint(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onResize = () => {
      resize();
      if (reduce) paint(0);
    };
    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (reduce) paint(0);
    };
    const onLeave = () => {
      pointer.x = -999;
      pointer.y = -999;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", () => reduce && paint(0), { passive: true });

    const themeObs = new MutationObserver(() => {
      if (reduce) paint(0);
    });
    themeObs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      themeObs.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="dot-field" aria-hidden />;
}

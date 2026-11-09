"use client";

import { useEffect, useId, useRef } from "react";

const NODES = [
  { x: 18, y: 22 },
  { x: 42, y: 14 },
  { x: 68, y: 20 },
  { x: 86, y: 36 },
  { x: 72, y: 54 },
  { x: 48, y: 62 },
  { x: 24, y: 52 },
  { x: 36, y: 36 },
  { x: 58, y: 38 },
  { x: 80, y: 72 },
  { x: 14, y: 74 },
  { x: 52, y: 82 },
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 0],
  [0, 7],
  [7, 8],
  [8, 2],
  [8, 4],
  [5, 9],
  [4, 9],
  [6, 10],
  [5, 11],
  [9, 11],
  [10, 11],
  [7, 1],
];

export function SystemField() {
  const uid = useId().replace(/:/g, "");
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let frame = 0;
    let raf = 0;
    const paths = svg.querySelectorAll<SVGPathElement>("[data-edge]");

    const tick = () => {
      frame += 1;
      paths.forEach((path, i) => {
        const len = path.getTotalLength();
        const offset = (frame * (0.35 + (i % 5) * 0.08)) % (len * 2);
        path.style.strokeDasharray = `${len * 0.22} ${len}`;
        path.style.strokeDashoffset = `${-offset}`;
      });
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="field-drift absolute -inset-[8%] opacity-90">
        <svg
          ref={svgRef}
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
        >
          <defs>
            <radialGradient id={`field-glow-${uid}`} cx="70%" cy="35%" r="55%">
              <stop offset="0%" stopColor="var(--glow)" />
              <stop offset="55%" stopColor="var(--accent-soft)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <linearGradient id={`edge-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--line)" />
              <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.7" />
              <stop offset="100%" stopColor="var(--line)" />
            </linearGradient>
          </defs>

          <rect width="100" height="100" fill={`url(#field-glow-${uid})`} />

          <circle
            cx="62"
            cy="40"
            r="28"
            fill="none"
            stroke="var(--line-strong)"
            strokeWidth="0.15"
          />
          <circle
            cx="62"
            cy="40"
            r="40"
            fill="none"
            stroke="var(--line)"
            strokeWidth="0.15"
          />
          <circle
            cx="62"
            cy="40"
            r="52"
            fill="none"
            stroke="var(--line)"
            strokeWidth="0.12"
          />

          {EDGES.map(([a, b]) => {
            const from = NODES[a];
            const to = NODES[b];
            return (
              <path
                key={`${a}-${b}`}
                data-edge
                d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
                fill="none"
                stroke={`url(#edge-${uid})`}
                strokeWidth="0.18"
                strokeLinecap="round"
                opacity={0.85}
              />
            );
          })}

          {NODES.map((node, i) => (
            <g key={`${node.x}-${node.y}`}>
              <circle
                cx={node.x}
                cy={node.y}
                r="0.85"
                fill={i % 3 === 0 ? "var(--accent)" : "var(--ink)"}
                opacity={i % 3 === 0 ? 0.9 : 0.35}
                className={i % 4 === 0 ? "node-pulse" : undefined}
                style={i % 4 === 0 ? { animationDelay: `${i * 0.35}s` } : undefined}
              />
              {i % 3 === 0 && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="2.2"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="0.12"
                  opacity="0.35"
                />
              )}
            </g>
          ))}
        </svg>
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, var(--vignette) 0%, var(--vignette-mid) 45%, transparent 78%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{
          background: "linear-gradient(to top, var(--bg), transparent)",
        }}
      />
    </div>
  );
}

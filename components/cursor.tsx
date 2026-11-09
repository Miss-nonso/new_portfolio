"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type CursorMode = "ring" | "spotlight" | "trail" | "magnetic" | "label";

type CursorContextValue = {
  setMode: (mode: CursorMode) => void;
  setLabel: (label: string) => void;
  setMagneticTarget: (el: HTMLElement | null) => void;
};

const CursorContext = createContext<CursorContextValue | null>(null);

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) {
    return {
      setMode: () => undefined,
      setLabel: () => undefined,
      setMagneticTarget: () => undefined,
    };
  }
  return ctx;
}

export function CursorProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<CursorMode>("ring");
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);
  const magneticRef = useRef<HTMLElement | null>(null);

  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pos = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const trail = useRef(Array.from({ length: 5 }, () => ({ x: 0, y: 0 })));
  const raf = useRef(0);
  const hovering = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const onMove = (e: PointerEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      const magnetic = magneticRef.current;
      if (magnetic) {
        const rect = magnetic.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        const pull = Math.max(0, 1 - dist / 140);
        magnetic.style.transform = `translate(${dx * pull * 0.28}px, ${dy * pull * 0.28}px)`;
      }

      document.documentElement.style.setProperty("--cursor-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${e.clientY}px`);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      hovering.current = Boolean(
        target?.closest("a, button, [data-magnetic], .project-trigger"),
      );
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });

    const tick = () => {
      smooth.current.x += (pos.current.x - smooth.current.x) * 0.18;
      smooth.current.y += (pos.current.y - smooth.current.y) * 0.18;

      const { x, y } = smooth.current;
      const raw = pos.current;

      if (ringRef.current) {
        const scale =
          mode === "magnetic" || hovering.current ? 1.65 : mode === "label" ? 1.2 : 1;
        ringRef.current.style.transform = `translate3d(${x - 18}px, ${y - 18}px, 0) scale(${scale})`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${raw.x - 3}px, ${raw.y - 3}px, 0)`;
      }
      if (spotRef.current) {
        spotRef.current.style.setProperty("--spot-x", `${raw.x}px`);
        spotRef.current.style.setProperty("--spot-y", `${raw.y}px`);
      }

      let prevX = raw.x;
      let prevY = raw.y;
      trail.current.forEach((point, i) => {
        point.x += (prevX - point.x) * (0.38 - i * 0.05);
        point.y += (prevY - point.y) * (0.38 - i * 0.05);
        prevX = point.x;
        prevY = point.y;
        const el = trailRefs.current[i];
        if (el) {
          const size = 10 - i;
          el.style.transform = `translate3d(${point.x - size / 2}px, ${point.y - size / 2}px, 0)`;
          el.style.width = `${size}px`;
          el.style.height = `${size}px`;
          el.style.opacity = `${0.55 - i * 0.1}`;
        }
      });

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.classList.remove("custom-cursor");
      if (magneticRef.current) magneticRef.current.style.transform = "";
    };
  }, [mode]);

  const setMagneticTarget = (el: HTMLElement | null) => {
    if (magneticRef.current && magneticRef.current !== el) {
      magneticRef.current.style.transform = "";
    }
    magneticRef.current = el;
  };

  return (
    <CursorContext.Provider value={{ setMode, setLabel, setMagneticTarget }}>
      {children}
      {enabled && (
        <div className="cursor-root" aria-hidden>
          <div
            ref={spotRef}
            className={`cursor-spotlight ${mode === "spotlight" ? "is-on" : ""}`}
          />
          <div className={`cursor-trails ${mode === "trail" ? "is-on" : ""}`}>
            {trail.current.map((_, i) => (
              <div
                key={i}
                ref={(el) => {
                  trailRefs.current[i] = el;
                }}
                className="cursor-trail-dot"
              />
            ))}
          </div>
          <div ref={ringRef} className={`cursor-ring mode-${mode}`}>
            {label && (mode === "label" || mode === "spotlight") ? (
              <span className="cursor-label">{label}</span>
            ) : null}
          </div>
          <div ref={dotRef} className="cursor-dot" />
        </div>
      )}
    </CursorContext.Provider>
  );
}

/** Attach to a section to switch cursor mode while hovered */
export function CursorZone({
  mode,
  label = "",
  children,
  className = "",
  id,
}: {
  mode: CursorMode;
  label?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const { setMode, setLabel } = useCursor();

  return (
    <section
      id={id}
      className={className}
      data-cursor={mode}
      onPointerEnter={() => {
        setMode(mode);
        setLabel(label);
      }}
      onPointerLeave={() => {
        setMode("ring");
        setLabel("");
      }}
    >
      {children}
    </section>
  );
}

"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useCursor } from "@/components/cursor";

export function Magnetic({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const { setMagneticTarget } = useCursor();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onEnter = () => setMagneticTarget(el);
    const onLeave = () => {
      setMagneticTarget(null);
      el.style.transform = "";
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.style.transform = "";
    };
  }, [setMagneticTarget]);

  return (
    <span ref={ref} className={`magnetic ${className}`.trim()} data-magnetic>
      {children}
    </span>
  );
}

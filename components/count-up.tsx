"use client";

import { animate, useInView, useMotionValue, useMotionValueEvent, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function CountUp({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const motion = useMotionValue(0);
  const spring = useSpring(motion, { stiffness: 80, damping: 22 });
  const display = useTransform(spring, (v) => {
    const n = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString();
    return `${prefix}${n}${suffix}`;
  });
  const [text, setText] = useState(`${prefix}0${suffix}`);

  useMotionValueEvent(display, "change", setText);

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      motion.set(value);
      return;
    }
    const controls = animate(motion, value, { duration: 1.4, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, motion, value]);

  return <span ref={ref}>{text}</span>;
}

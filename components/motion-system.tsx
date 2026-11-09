"use client";

import Lenis from "lenis";
import { MotionConfig, motion, useScroll, useSpring, useMotionValue } from "framer-motion";
import { createContext, useContext, useEffect, useState, useSyncExternalStore } from "react";

const preference = "(prefers-reduced-motion: reduce)";
function subscribe(callback: () => void) {
  const media = window.matchMedia(preference);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
const MotionContext = createContext({ disabled: false, systemReduced: false, toggle: () => {} });
type Theme = "light" | "dark";
const ThemeContext = createContext({ theme: "light" as Theme, toggleTheme: () => {} });
export const useMotionSettings = () => useContext(MotionContext);

export function MotionSystem({ children }: { children: React.ReactNode }) {
  const [paused, setPaused] = useState(false);
  // Keep the first client render identical to SSR. The layout's inline script
  // applies a saved visual preference before paint; the next user toggle syncs state.
  const [theme, setTheme] = useState<Theme>("light");
  const systemReduced = useSyncExternalStore(subscribe, () => window.matchMedia(preference).matches, () => false);
  const disabled = paused || systemReduced;
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 32 });

  useEffect(() => {
    document.documentElement.dataset.motion = disabled ? "off" : "on";
    if (disabled) return;
    const lenis = new Lenis({ duration: .95, smoothWheel: true, wheelMultiplier: 1, syncTouch: false, autoRaf: true, anchors: { offset: -90 } });
    return () => lenis.destroy();
  }, [disabled]);

  const toggleTheme = () => {
    setTheme(() => {
      const currentTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
      const nextTheme = currentTheme === "light" ? "dark" : "light";
      document.documentElement.dataset.theme = nextTheme;
      localStorage.setItem("cd-theme", nextTheme);
      return nextTheme;
    });
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}><MotionContext.Provider value={{ disabled, systemReduced, toggle: () => setPaused(value => !value) }}>
    <MotionConfig reducedMotion={disabled ? "always" : "user"}>
      <div className={disabled ? "motion-off" : "motion-on"}>
        <motion.div className="reading-progress" aria-hidden="true" style={{ scaleX: disabled ? scrollYProgress : progress }} />
        {children}
      </div>
    </MotionConfig>
  </MotionContext.Provider></ThemeContext.Provider>;
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  return <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${isDark ? "light" : "dark"} theme`} aria-pressed={isDark} suppressHydrationWarning>
    <span className="theme-toggle-icon" aria-hidden="true">{isDark ? "☀" : "◐"}</span>
    <span>{isDark ? "Light" : "Dark"}</span>
  </button>;
}

export function MotionToggle() {
  const { disabled, systemReduced, toggle } = useMotionSettings();
  return <button className="motion-toggle" onClick={toggle} disabled={systemReduced} aria-pressed={disabled} aria-label={systemReduced ? "Motion reduced by system preference" : disabled ? "Resume animations" : "Pause animations"} title={systemReduced ? "Follows your reduced-motion preference" : undefined}>
    <span aria-hidden="true">{disabled ? "▷" : "Ⅱ"}</span><span>{disabled ? "Motion off" : "Motion on"}</span>
  </button>;
}

export function MagneticLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  const { disabled } = useMotionSettings();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18 });
  const springY = useSpring(y, { stiffness: 220, damping: 18 });
  return <motion.a href={href} className={className} style={{ x: disabled ? 0 : springX, y: disabled ? 0 : springY }}
    onPointerMove={event => {
      if (disabled || event.pointerType !== "mouse") return;
      const rect = event.currentTarget.getBoundingClientRect();
      x.set((event.clientX - rect.left - rect.width / 2) * .07);
      y.set((event.clientY - rect.top - rect.height / 2) * .12);
    }} onPointerLeave={() => { x.set(0); y.set(0); }}>
    {children}
  </motion.a>;
}

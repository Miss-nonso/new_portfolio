"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/content";

type LogoProps = {
  compact?: boolean;
  className?: string;
};

/** CD monogram — continuous stroke mark + Chinonso Daniels */
export function Logo({ compact = false, className = "" }: LogoProps) {
  const [state, setState] = useState<"draw" | "static">("draw");

  useEffect(() => {
    const played = sessionStorage.getItem("cd-logo-drawn");
    if (played) {
      setState("static");
      return;
    }
    const timer = window.setTimeout(() => {
      sessionStorage.setItem("cd-logo-drawn", "1");
      setState("static");
    }, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <span
      className={`logo ${state === "draw" ? "is-drawn" : "is-static"} ${compact ? "logo-compact" : ""} ${className}`.trim()}
    >
      <span className="logo-mark" aria-hidden>
        <svg viewBox="0 0 40 40" className="logo-svg" fill="none">
          <path
            className="logo-path"
            d="M26 12.5C26 12.5 20 8 14 12.5C8 17 8 23 14 27.5C20 32 26 27.5 26 27.5M26 12.5V27.5M26 12.5H30C33 12.5 35 14.5 35 20C35 25.5 33 27.5 30 27.5H26"
          />
        </svg>
      </span>
      <span className="logo-text">
        <span className="logo-first">{profile.firstName}</span>
        <span className="logo-last">{profile.lastName}</span>
      </span>
    </span>
  );
}

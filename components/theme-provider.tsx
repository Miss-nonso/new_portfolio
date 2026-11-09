"use client";

import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextTheme,
} from "next-themes";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "obsidian" | "daylight" | "terminal";

const ORDER: Theme[] = ["obsidian", "daylight", "terminal"];

type ThemeContextValue = {
  theme: Theme;
  cycleAt: (point: { clientX: number; clientY: number }) => void;
  mounted: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function ThemeBridge({ children }: { children: ReactNode }) {
  const { theme, setTheme, resolvedTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const apply = useCallback(
    (next: Theme, from?: { x: number; y: number }) => {
      const root = document.documentElement;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!reduce && from && "startViewTransition" in document) {
        root.style.setProperty("--theme-x", `${from.x}px`);
        root.style.setProperty("--theme-y", `${from.y}px`);
        (
          document as Document & {
            startViewTransition: (cb: () => void) => void;
          }
        ).startViewTransition(() => {
          setTheme(next);
        });
      } else {
        setTheme(next);
      }
    },
    [setTheme],
  );

  const cycleAt = useCallback(
    (point: { clientX: number; clientY: number }) => {
      const current = (resolvedTheme ?? theme ?? "obsidian") as Theme;
      const idx = ORDER.indexOf(current);
      const next = ORDER[(idx + 1) % ORDER.length];
      apply(next, { x: point.clientX, y: point.clientY });
    },
    [apply, resolvedTheme, theme],
  );

  const value = useMemo(
    () => ({
      theme: ((mounted ? resolvedTheme : "obsidian") ?? "obsidian") as Theme,
      cycleAt,
      mounted,
    }),
    [mounted, resolvedTheme, cycleAt],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="obsidian"
      enableSystem
      storageKey="cd-theme"
      themes={["obsidian", "daylight", "terminal"]}
    >
      <ThemeBridge>{children}</ThemeBridge>
    </NextThemesProvider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

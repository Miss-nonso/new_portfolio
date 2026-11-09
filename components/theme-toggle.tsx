"use client";

import { useTheme, type Theme } from "@/components/theme-provider";

const icons: Record<Theme, string> = {
  obsidian: "◐",
  daylight: "◑",
  terminal: "▣",
};

const labels: Record<Theme, string> = {
  obsidian: "Obsidian theme",
  daylight: "Daylight theme",
  terminal: "Terminal theme",
};

export function ThemeToggle() {
  const { theme, cycleAt, mounted } = useTheme();

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={mounted ? `Cycle theme (current: ${labels[theme]})` : "Cycle theme"}
      onClick={(e) => cycleAt(e)}
      suppressHydrationWarning
    >
      <span className="theme-toggle-track" aria-hidden>
        <span
          className={`theme-toggle-thumb ${mounted ? `is-${theme}` : "is-obsidian"}`}
        />
      </span>
      <span className="theme-icon font-mono text-[0.75rem]" suppressHydrationWarning>
        {mounted ? icons[theme] : icons.obsidian}
      </span>
    </button>
  );
}

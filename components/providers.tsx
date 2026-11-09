"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { CursorProvider } from "@/components/cursor";
import { SmoothScroll } from "@/components/smooth-scroll";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <CursorProvider>{children}</CursorProvider>
      </SmoothScroll>
    </ThemeProvider>
  );
}

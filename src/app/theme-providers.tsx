"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export function ThemeProviders({ children, theme }: { children: ReactNode, theme: string }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={theme} enableSystem={false} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
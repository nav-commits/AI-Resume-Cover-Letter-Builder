"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "../components/theme-toggle";

interface ThemeLayoutProps {
  children: React.ReactNode;
}

export function ThemeLayout({ children }: Readonly<ThemeLayoutProps>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeToggle />
      <main className="min-h-screen bg-background">{children}</main>
    </ThemeProvider>
  );
}

"use client";

import { useTheme } from "@/components/providers/ThemeProvider";
import { Sun, Moon, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div
        className="h-9 w-9 rounded-lg bg-muted animate-pulse"
        aria-hidden="true"
      />
    );
  }

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <button
      onClick={cycleTheme}
      className="p-2 rounded-lg hover:bg-muted transition-colors relative"
      aria-label={`Switch theme (current: ${theme})`}
      title={`Current theme: ${theme}. Click to cycle.`}
    >
      {theme === "dark" ? (
        <Moon className="h-4 w-4" />
      ) : theme === "system" ? (
        <Monitor className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </button>
  );
}

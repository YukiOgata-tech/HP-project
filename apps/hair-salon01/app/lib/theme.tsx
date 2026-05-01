"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  resolvedTheme: Theme | undefined;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  resolvedTheme: undefined,
  setTheme: () => {},
});

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme?: Theme;
}) {
  const [resolvedTheme, setResolvedTheme] = useState<Theme | undefined>(initialTheme);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved) {
      if (!document.documentElement.classList.contains(saved)) {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(saved);
      }
      setResolvedTheme(saved);
    } else {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setResolvedTheme(isDark ? "dark" : "light");
    }
  }, []);

  function setTheme(theme: Theme) {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    document.cookie = `theme=${theme};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
    try { localStorage.setItem("theme", theme); } catch { /* ignore */ }
    setResolvedTheme(theme);
  }

  return (
    <ThemeContext.Provider value={{ resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

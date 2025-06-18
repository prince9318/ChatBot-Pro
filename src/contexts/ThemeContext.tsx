import React, { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../utils/constants";
import type { ThemeContextType } from "../types";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useLocalStorage<"light" | "dark" | "system">(
    STORAGE_KEYS.THEME,
    "system"
  );

  const getResolvedTheme = (): "light" | "dark" => {
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return theme;
  };

  const [resolvedTheme, setResolvedTheme] = React.useState<"light" | "dark">(
    getResolvedTheme()
  );

  // Function to update the theme in the DOM
  const updateResolvedTheme = () => {
    const resolved = getResolvedTheme();
    setResolvedTheme(resolved);

    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolved);
  };

  // Apply theme on mount and when theme changes
  useEffect(() => {
    updateResolvedTheme();

    // Listen for system theme changes if using system preference
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const listener = () => updateResolvedTheme();

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", listener);
        return () => mediaQuery.removeEventListener("change", listener);
      } else {
        mediaQuery.addListener(listener);
        return () => mediaQuery.removeListener(listener);
      }
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

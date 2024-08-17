"use client";

import { createContext, useState } from "react";

interface ThemeContextProps {
  theme: string;
  setTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, switchTheme] = useState("");

  const setTheme = () => {
    switchTheme(theme === "dark" ? "" : "dark");
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;

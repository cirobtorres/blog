"use client";

import { Inter } from "next/font/google";
import useTheme from "../../hooks/useTheme";
import NightThemeSwitcher from "../NightThemeSwitch";
const inter = Inter({ subsets: ["latin"] });

export default function Body({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <body
      className={`${inter.className} ${theme} min-h-svh flex flex-col justify-center items-center bg-main dark:bg-dark-main`}
    >
      <header className="w-full h-20 bg-header dark:bg-dark-header">
        <div className="h-full flex items-center max-w-webpage mx-auto">
          <NightThemeSwitcher />
        </div>
      </header>
      <main className="w-full h-full flex-1 flex flex-col">{children}</main>
      <footer className="w-full h-40 bg-footer dark:bg-dark-footer"></footer>
    </body>
  );
}

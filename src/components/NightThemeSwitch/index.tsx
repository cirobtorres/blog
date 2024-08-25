"use client";

import { IoMoon, IoSunny } from "react-icons/io5";
import saveThemeToCookies from "../../lib/setTheme";

export default function NightThemeSwitcher({ theme }: { theme: string }) {
  const handleToggleTheme = (event: React.MouseEvent) => {
    saveThemeToCookies(theme === "dark" ? "" : "dark");
  };

  return (
    <div className="relative group">
      <label
        onClick={handleToggleTheme}
        className={`
        flex flex-shrink-0 justify-center items-center 
        rounded-full size-10 duration-700 cursor-pointer 
        bg-base-100 dark:bg-dark-base-100 
      `}
      >
        <div
          className="absolute pointer-events-none duration-[600ms]"
          style={{
            opacity: theme === "dark" ? 1 : 0,
            scale: theme === "dark" ? 1 : 0,
            transform: theme === "dark" ? "rotate(360deg)" : "rotate(0deg)",
          }}
        >
          <IoMoon className="text-2xl text-base-green" />
        </div>
        <div
          className="absolute pointer-events-none duration-[600ms]"
          style={{
            opacity: theme !== "dark" ? 1 : 0,
            scale: theme !== "dark" ? 1 : 0,
            transform: theme !== "dark" ? "rotate(0deg)" : "rotate(360deg)",
          }}
        >
          <IoSunny className="text-2xl text-base-yellow" />
        </div>
      </label>
      <p
        className={`
          transition-opacity duration-200 mt-3 opacity-0 group-hover:opacity-100 pointer-events-none 
          absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded 
          text-base-neutral dark:text-dark-base-neutral bg-base-150 dark:bg-dark-base-150 
          before:w-0 before:h-0 before:absolute before:bottom-full before:left-1/2 before:-translate-x-1/2 
          before:border-8 before:border-t-0 before:border-transparent 
          before:border-b-base-150 before:dark:border-b-dark-base-150 
        `}
      >
        Tema escuro
      </p>
    </div>
  );
}

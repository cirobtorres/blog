"use client";

import { IoMoon, IoSunny } from "react-icons/io5";
import setTheme from "../../lib/setTheme";

export default function NightThemeSwitcher({ theme }: { theme: string }) {
  const handleToggleTheme = (event: React.MouseEvent) => {
    setTheme(theme === "dark" ? "" : "dark");
  };

  return (
    <label
      onClick={handleToggleTheme}
      className={`
        relative 
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
  );
}

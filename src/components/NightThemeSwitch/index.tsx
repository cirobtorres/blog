"use client";

import { IoMoon, IoSunny } from "react-icons/io5";
import useTheme from "../../hooks/useTheme";

export default function NightThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = (event: React.MouseEvent) => {
    event.preventDefault();
    setTheme();
  };

  return (
    <label
      onClick={handleToggleTheme}
      className={`
        relative 
        flex flex-shrink-0 justify-center items-center 
        rounded-full size-10 duration-700 cursor-pointer 
        bg-white dark:bg-slate-700 
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
        <IoMoon className="text-2xl text-emerald-400" />
      </div>
      <div
        className="absolute pointer-events-none duration-[600ms]"
        style={{
          opacity: theme !== "dark" ? 1 : 0,
          scale: theme !== "dark" ? 1 : 0,
          transform: theme !== "dark" ? "rotate(0deg)" : "rotate(360deg)",
        }}
      >
        <IoSunny className="text-2xl text-yellow-500" />
      </div>
    </label>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MegaMenu from "../MegaMenu";
import NightThemeSwitcher from "../NightThemeSwitch";

export default function Header({ theme }: { theme: string }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const currentScrollPosition = window.scrollY;
    const controlNavbar = () => {
      if (scrollPosition > currentScrollPosition) {
        if (headerRef.current) headerRef.current.style.top = "0";
        setScrollPosition(currentScrollPosition);
      } else {
        if (headerRef.current) headerRef.current.style.top = "-80px"; // 80px = header height
        setScrollPosition(currentScrollPosition);
      }
    };
    window.addEventListener("scroll", controlNavbar);
    // cleanup function
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  });

  return (
    <header
      ref={headerRef}
      id="header-navbar"
      className="fixed top-0 transition-[top] duration-300 h-20 w-full z-10 bg-base-200 dark:bg-dark-base-200 border-b border-base-100 dark:border-dark-base-100"
    >
      <div className="h-full -translate-y-full animate-header">
        <nav className="h-full flex items-center justify-between max-w-webpage mx-auto">
          <ul className="grid grid-cols-header items-center justify-between">
            <li>
              <Link
                href="/"
                className="text-base-neutral dark:text-dark-base-neutral uppercase font-extrabold"
              >
                Ciro Torres
              </Link>
            </li>
            <li className="text-center">
              <Link
                href="/"
                className="font-[500] text-base-neutral dark:text-dark-base-neutral"
              >
                Front-end
              </Link>
            </li>
            <li className="text-center">
              <Link
                href="/"
                className="font-[500] text-base-neutral dark:text-dark-base-neutral"
              >
                Back-end
              </Link>
            </li>
            <li className="text-center">
              <Link
                href="/"
                className="font-[500] text-base-neutral dark:text-dark-base-neutral"
              >
                Javascript
              </Link>
            </li>
            <li className="text-center">
              <Link
                href="/"
                className="font-[500] text-base-neutral dark:text-dark-base-neutral"
              >
                Python
              </Link>
            </li>
            <li className="text-center">
              <Link
                href="/"
                className="font-[500] text-base-neutral dark:text-dark-base-neutral"
              >
                Java
              </Link>
            </li>
            <li className="h-full">
              <MegaMenu />
            </li>
          </ul>
          <NightThemeSwitcher theme={theme} />
        </nav>
      </div>
    </header>
  );
}

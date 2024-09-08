"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import MainMenu from "../MainMenu";
import ProgressBar from "../ProgressBar";
import NightThemeSwitcher from "../NightThemeSwitch";
import HiddenDashboard from "./HiddenDashboard";

export default function Header({
  privileges,
  theme,
}: {
  theme: string;
  privileges: number | null;
}) {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  const hideNavbarListener = () => {
    let prevScrollPos = window.scrollY;
    const threshold = 500; // threshold to maintain header on top, beyond which it is allowed to hide

    const handleScroll = () => {
      const currScrollPos = window.scrollY;
      if (currScrollPos < threshold || currScrollPos < prevScrollPos) {
        if (headerRef.current) headerRef.current.style.top = "0";
      } else {
        if (headerRef.current) headerRef.current.style.top = "-64px"; // 64px = header height
      }
      prevScrollPos = currScrollPos;
    };

    return handleScroll;
  };

  useEffect(() => {
    const handleScroll = hideNavbarListener();
    window.addEventListener("scroll", handleScroll);
    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      id="floating-header"
      className={`
        ${
          pathname.startsWith("/artigos") ? "fixed" : "static"
        } top-0 transition-[top] duration-300 h-16 w-full z-10 backdrop-blur-sm 
        border-b border-base-100 dark:border-dark-base-border
        bg-base-200/90 dark:bg-dark-base-300/90 
      `}
    >
      <div className="h-full mx-4 smartphone:mx-10 tablet:mx-20">
        <nav className="h-full flex items-center justify-between mx-auto">
          <div className="h-full flex items-center">
            <div
              className="pt-1 h-full"
              style={{ borderBottom: "3px solid transparent" }}
            >
              <Link
                href="/"
                className="w-24 tablet:w-28 text-lg tablet:text-xl uppercase font-extrabold h-full flex items-center text-base-neutral dark:text-dark-base-neutral hover:text-base-neutral-hover hover:dark:text-[#b8bdc9]"
              >
                HOME
              </Link>
            </div>
            <ul className="pt-1 h-full hidden smartphone:grid grid-cols-header items-center justify-between">
              {/* <li
                className="h-full"
                style={{
                  borderBottom: pathname.startsWith("/artigos")
                    ? "2px solid var(--base-green)"
                    : "2px solid transparent",
                }}
              >
                <Link
                  href="/artigos"
                  className="text-xs smartphone:text-sm h-full flex justify-center items-center font-[500] hover:text-base-green dark:hover:text-dark-base-green text-base-neutral dark:text-dark-base-neutral"
                >
                  Artigos
                </Link>
              </li> */}
              <li
                className="h-full"
                style={{
                  borderBottom: pathname.startsWith("/contato")
                    ? "2px solid var(--base-green)"
                    : "2px solid transparent",
                }}
              >
                <Link
                  href="/contato"
                  className="text-xs smartphone:text-sm h-full flex justify-center items-center font-[500] hover:text-base-green dark:hover:text-dark-base-green text-base-neutral dark:text-dark-base-neutral"
                >
                  Contato
                </Link>
              </li>
              <li
                className="h-full"
                style={{
                  borderBottom: pathname.startsWith("/sobre-mim")
                    ? "2px solid var(--base-green)"
                    : "2px solid transparent",
                }}
              >
                <Link
                  href="/sobre-mim"
                  className="text-xs smartphone:text-sm h-full flex justify-center items-center font-[500] hover:text-base-green dark:hover:text-dark-base-green text-base-neutral dark:text-dark-base-neutral"
                >
                  Sobre mim
                </Link>
              </li>
            </ul>
          </div>
          <ul className="h-full flex items-center justify-between gap-2 smartphone:gap-4 tablet:gap-8">
            <HiddenDashboard privileges={privileges} />
            <li className="flex justify-center items-center h-full">
              <NightThemeSwitcher theme={theme} />
            </li>
          </ul>
        </nav>
      </div>
      <ProgressBar />
    </header>
  );
}

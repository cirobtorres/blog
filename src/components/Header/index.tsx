"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import NightThemeSwitcher from "../NightThemeSwitch";
import MainMenu from "../MainMenu";
import { User } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";

export default function Header({
  user,
  theme,
}: {
  theme: string;
  user: User | null;
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
      className="fixed top-0 transition-[top] duration-300 h-16 w-full min-w-[300px] z-10 backdrop-blur bg-base-200/90 dark:bg-dark-base-300/90 border-b border-base-100 dark:border-dark-base-border"
    >
      <div className="h-full mx-4 smartphone:mx-10 tablet:mx-20">
        <nav className="h-full flex items-center justify-between max-w-webpage mx-auto">
          <div className="h-full flex items-center">
            <div
              className="pt-1 h-full"
              style={{ borderBottom: "3px solid transparent" }}
            >
              <Link
                href="/"
                className="w-32 text-xl uppercase font-extrabold h-full flex items-center text-base-neutral dark:text-dark-base-neutral hover:text-base-neutral-hover hover:dark:text-[#b8bdc9]"
              >
                HOME
              </Link>
            </div>
            <ul className="pt-1 h-full hidden smartphone:grid grid-cols-header items-center justify-between">
              <li
                className="h-full"
                style={{
                  borderBottom: pathname.startsWith("/artigos")
                    ? "3px solid var(--base-green)"
                    : "3px solid transparent",
                }}
              >
                <Link
                  href="/artigos"
                  className="text-sm h-full flex justify-center items-center font-[500] hover:text-base-green dark:hover:text-dark-base-green text-base-neutral dark:text-dark-base-neutral"
                >
                  Artigos
                </Link>
              </li>
              <li
                className="h-full"
                style={{
                  borderBottom: pathname.startsWith("/contato")
                    ? "3px solid var(--base-green)"
                    : "3px solid transparent",
                }}
              >
                <Link
                  href="/contato"
                  className="text-sm h-full flex justify-center items-center font-[500] hover:text-base-green dark:hover:text-dark-base-green text-base-neutral dark:text-dark-base-neutral"
                >
                  Contato
                </Link>
              </li>
              <li
                className="h-full"
                style={{
                  borderBottom: pathname.startsWith("/sobre-mim")
                    ? "3px solid var(--base-green)"
                    : "3px solid transparent",
                }}
              >
                <Link
                  href="/sobre-mim"
                  className="text-sm h-full flex justify-center items-center font-[500] hover:text-base-green dark:hover:text-dark-base-green text-base-neutral dark:text-dark-base-neutral"
                >
                  Sobre mim
                </Link>
              </li>
            </ul>
          </div>
          <ul className="h-full flex items-center justify-between gap-8">
            <li className="h-full">
              <MainMenu user={user} />
            </li>
            <li className="flex justify-center items-center h-full">
              <NightThemeSwitcher theme={theme} />
            </li>
          </ul>
        </nav>
      </div>
      {/* <div className="fixed top-full left-0 w-full h-1 bg-base-green dark:bg-dark-base-green block xl:hidden" /> */}
    </header>
  );
}

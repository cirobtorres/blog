"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import NightThemeSwitcher from "../NightThemeSwitch";
import MegaMenu from "../MegaMenu";

export default function Header({ theme }: { theme: string }) {
  const headerRef = useRef<HTMLElement>(null);

  const hidelNavbar = () => {
    const threshold = 384; // threshold to maintain header on top, beyond which it is allowed to hide
    let prevScrollPos = window.scrollY;
    window.addEventListener("scroll", () => {
      window.onscroll = () => {
        const currScrollPos = window.scrollY;
        if (currScrollPos < threshold || currScrollPos < prevScrollPos) {
          if (headerRef.current) headerRef.current.style.top = "0";
        } else {
          if (headerRef.current) headerRef.current.style.top = "-80px"; // 80px = header height
        }
        prevScrollPos = currScrollPos;
      };
    });
  };

  useEffect(() => {
    hidelNavbar();
    // cleanup function
    return () => {
      window.removeEventListener("scroll", hidelNavbar);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      id="header-navbar"
      className="fixed top-0 transition-[top] duration-300 h-20 w-full z-10 bg-base-200 dark:bg-dark-base-200 border-b border-base-100 dark:border-dark-base-100"
    >
      <div className="h-full -translate-y-full animate-header">
        <nav className="h-full flex items-center justify-between max-w-webpage mx-auto">
          <ul className="h-full grid grid-cols-header items-center justify-between">
            <li>
              <MegaMenu />
            </li>
            <li className="flex justify-center group">
              <Link
                href="/"
                className="text-xl uppercase font-extrabold text-base-neutral dark:text-dark-base-neutral group-hover:text-[#442255] group-hover:dark:text-[#b8bdc9]"
              >
                HOME
              </Link>
            </li>
            <li className="h-full text-center">
              <Link
                href="/"
                className="h-full flex items-center font-[500] hover:text-base-green dark:hover:text-dark-base-green text-base-neutral dark:text-dark-base-neutral"
              >
                Front-end
              </Link>
            </li>
            <li className="h-full text-center">
              <Link
                href="/"
                className="h-full flex items-center font-[500] hover:text-base-green dark:hover:text-dark-base-green text-base-neutral dark:text-dark-base-neutral"
              >
                Back-end
              </Link>
            </li>
            <li className="h-full text-center">
              <Link
                href="/"
                className="h-full flex items-center font-[500] hover:text-base-green dark:hover:text-dark-base-green text-base-neutral dark:text-dark-base-neutral"
              >
                Javascript
              </Link>
            </li>
            <li className="h-full text-center">
              <Link
                href="/"
                className="h-full flex items-center font-[500] hover:text-base-green dark:hover:text-dark-base-green text-base-neutral dark:text-dark-base-neutral"
              >
                Python
              </Link>
            </li>
            <li className="h-full text-center">
              <Link
                href="/"
                className="h-full flex items-center font-[500] hover:text-base-green dark:hover:text-dark-base-green text-base-neutral dark:text-dark-base-neutral"
              >
                Java
              </Link>
            </li>
          </ul>
          <ul className="h-full flex items-center justify-between gap-8">
            <li className="flex justify-center items-center h-full">
              <Link
                href="/"
                className="text-xl uppercase font-extrabold text-base-neutral dark:text-dark-base-neutral hover:text-[#442255] hover:dark:text-[#b8bdc9]"
              >
                Quem Sou?
              </Link>
            </li>
            <Link
              href="entrar"
              className="w-24 flex flex-1 justify-center items-center text-xl px-2 py-1 font-[500] rounded text-dark-base-green hover:text-dark-base-green-hover"
            >
              Entrar
            </Link>
            <li className="flex justify-center items-center h-full">
              <NightThemeSwitcher theme={theme} />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

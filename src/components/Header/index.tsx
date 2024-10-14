"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import ProgressBar from "../ProgressBar";
import NightThemeSwitcher from "../NightThemeSwitch";
import HiddenDashboard from "./HiddenDashboard";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { signOut } from "@/lib/authentication";

const Header = ({
  user,
  privileges,
  theme,
}: {
  user: User | null;
  theme: string;
  privileges: number | null;
}) => {
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
    !pathname.includes("painel") && (
      <header
        ref={headerRef}
        id="floating-header"
        className={`${
          pathname.startsWith("/artigos")
            ? "fixed bg-base-100/80 dark:bg-dark-base-100/80"
            : "static bg-base-100 dark:bg-dark-base-100"
        } [z-index:10] top-0 transition-[top] duration-300 h-12 w-full backdrop-blur-sm border-b border-base-border dark:border-dark-base-border
    `}
      >
        <div className="h-full pl-4 pr-6">
          <nav className="w-full h-full flex items-center justify-between">
            <div className="h-full flex items-center">
              <div
                className="h-full"
                style={{ borderBottom: "3px solid transparent" }}
              >
                <Link
                  href="/"
                  className="w-24 tablet:w-28 text-lg tablet:text-xl uppercase font-extrabold h-full flex items-center text-base-neutral dark:text-dark-base-neutral hover:text-base-neutral-hover hover:dark:text-[#b8bdc9]"
                >
                  HOME
                </Link>
              </div>
              <ul className="h-full hidden smartphone:flex gap-4 items-center justify-between">
                <li
                  className="w-20 h-full"
                  style={{
                    borderBottom: pathname.startsWith("/contato")
                      ? "2px solid var(--base-green)"
                      : "2px solid transparent",
                  }}
                >
                  <Link
                    href="/contato"
                    className="text-xs smartphone:text-sm h-full flex justify-center items-center font-[500] hover:text-base-neutral-hover dark:hover:text-[#fff] text-base-neutral dark:text-dark-base-neutral"
                  >
                    Contato
                  </Link>
                </li>
                <li
                  className="w-20 h-full"
                  style={{
                    borderBottom: pathname.startsWith("/sobre-mim")
                      ? "2px solid var(--base-green)"
                      : "2px solid transparent",
                  }}
                >
                  <Link
                    href="/sobre-mim"
                    className="text-xs smartphone:text-sm h-full flex justify-center items-center font-[500] hover:text-base-neutral-hover dark:hover:text-[#fff] text-base-neutral dark:text-dark-base-neutral"
                  >
                    Sobre mim
                  </Link>
                </li>
              </ul>
            </div>
            <ul className="h-full flex items-center justify-between gap-2 smartphone:gap-4 tablet:gap-8">
              <HiddenDashboard user={user} privileges={privileges} />
              <li className="flex justify-center items-center h-full">
                <NightThemeSwitcher theme={theme} />
              </li>
            </ul>
          </nav>
        </div>
        <ProgressBar />
      </header>
    )
  );
};

const HeaderDashboard = ({
  user,
  theme,
}: {
  user: User | null;
  theme: string;
}) => {
  return (
    <header className="flex-shrink-0 flex items-center w-full h-12 pl-20 tablet:pl-6 pr-6 border-b border-base-border dark:border-dark-base-border">
      <nav className="w-full h-full flex items-center justify-between">
        <p className="text-xs text-base-placeholder dark:text-dark-base-placeholder">
          Painel de Artigos
        </p>
        <ul className="h-full flex items-center justify-between gap-2 smartphone:gap-4 tablet:gap-8">
          <li className="flex items-center gap-2">
            <Image
              src={
                user?.user_metadata.picture || "/images/user-placeholder.png"
              }
              alt={`Avatar do usuário${
                user?.user_metadata.picture
                  ? " " + user?.user_metadata.name
                  : ""
              }`}
              width={30}
              height={30}
              className="rounded-full"
            />
            <p className="max-w-20 truncate text-sm text-base-neutral dark:text-dark-base-neutral">
              <Link
                href="/painel/configurar"
                className="font-extrabold hover:underline"
              >
                {user?.user_metadata.name || user?.email}
              </Link>
              <br />
              <button
                onClick={(event) => {
                  event.preventDefault();
                  signOut();
                }}
                className="hover:underline"
              >
                Sair
              </button>
            </p>
          </li>
          <li className="flex justify-center items-center h-full">
            <NightThemeSwitcher theme={theme} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
export { HeaderDashboard };

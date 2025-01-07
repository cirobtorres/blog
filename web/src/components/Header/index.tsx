"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const Header = () => {
  const headerRef = useRef<HTMLElement>(null);

  const hideNavbarListener = () => {
    let prevScrollPos = window.scrollY;
    const threshold = 500; // threshold to maintain header on top, beyond which it is allowed to hide

    const handleScroll = () => {
      const currScrollPos = window.scrollY;
      if (currScrollPos < threshold || currScrollPos < prevScrollPos) {
        if (headerRef.current) headerRef.current.style.top = "0";
      } else {
        if (headerRef.current) headerRef.current.style.top = "-48px"; // 48px = header height
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
      className="fixed h-12 w-full backdrop-blur-sm bg-blog-dark-widgets/80 shrink-0 [z-index:10] top-0 transition-[top] duration-300"
    >
      <div className="h-full pl-4 pr-6 max-w-screen-2xl mx-auto">
        <nav className="w-full h-full flex items-center justify-between">
          <div className="h-full flex items-center justify-center gap-4">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center justify-between text-sm uppercase font-extrabold h-full hover:text-white"
              >
                HOME
              </Link>
            </div>
            <ul
              className={
                "flex gap-4 items-center justify-between mx-20" +
                " [&_li]:flex [&_li]:items-center [&_li]:justify-between" +
                " [&_li_a]:text-sm [&_li_a]:font-[500] hover:[&_li_a]:text-white"
              }
            >
              <li>
                <Link href="/contato">Contato</Link>
              </li>
              <li>
                <Link href="/sobre-mim">Sobre mim</Link>
              </li>
            </ul>
          </div>
          {/* <ul className="h-full flex items-center justify-between gap-2 smartphone:gap-4 tablet:gap-8">
              <HiddenDashboard user={user} privileges={privileges} />
              <li className="flex justify-center items-center h-full">
                <NightThemeSwitcher theme={theme} />
              </li>
            </ul> */}
        </nav>
      </div>
      {/* <ProgressBar /> */}
    </header>
  );
};

export default Header;
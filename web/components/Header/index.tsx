"use client";

import { useEffect, useRef } from "react";
import { linkVariants } from "../../utils/className";
import { Link } from "../Links";
import { ProgressBar } from "../ProgressBar";

const content = [
  {
    path: "/",
    text: "Consectetur",
  },
  {
    path: "/",
    text: "Cecessitatibus",
  },
  {
    path: "https://github.com/cirobtorres",
    text: "Github",
  },
];

export function Header({
  fixed = true,
  progress = false,
}: {
  fixed?: boolean;
  progress?: boolean;
}) {
  const headerRef = useRef<HTMLElement>(null);
  const scrollingDownRef = useRef(0);

  const hideNavbarListener = () => {
    let prevScrollPos = window.scrollY;
    const threshold = 1000; // Header is static for the first 1000 px on top

    const handleScroll = () => {
      const currScrollPos = window.scrollY;

      if (!headerRef.current) return;
      const headerHeight = headerRef.current.offsetHeight;

      if (
        currScrollPos < threshold || // Show header when on top
        currScrollPos < prevScrollPos || // Show header when scrolling up
        (currScrollPos > prevScrollPos && scrollingDownRef.current < 1000) // Hide header after scrolling 1000 px down
      ) {
        headerRef.current.style.top = "0"; // Show
      } else {
        headerRef.current.style.top = `-${headerHeight}px`; // Hide
      }
      if (currScrollPos > prevScrollPos) {
        // scrollingDownRef.current keeps header static for a certain amout of scrolling down before hiding it
        scrollingDownRef.current += currScrollPos - prevScrollPos;
      } else {
        // It is restarted when scrolling up
        scrollingDownRef.current = 0;
      }
      prevScrollPos = currScrollPos;
    };
    return handleScroll;
  };

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.log("Header: MOUNT");
    } // DEBUG

    if (fixed) return;

    const handleScroll = hideNavbarListener();

    window.addEventListener("scroll", handleScroll);

    return () => {
      // Cleanup

      if (process.env.NODE_ENV !== "production") {
        console.log("Header: UNMOUNT");
      } // DEBUG

      window.removeEventListener("scroll", handleScroll);
    };
  }, [fixed]);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 z-10 h-header w-full transition-[top] duration-300 flex items-center px-6 backdrop-blur-sm border-b border-neutral-200 bg-neutral-100/50 dark:border-neutral-900 dark:bg-neutral-950/50"
      style={{ top: 0 }}
    >
      <div className="w-full flex items-center justify-between max-w-360 mx-auto">
        <nav className="md:flex flex-1 hidden gap-6">
          {content?.map(({ path, text }, index) => (
            <Link
              key={index}
              href={path}
              className={linkVariants({ variant: "internal" })}
            >
              {text}
            </Link>
          ))}
        </nav>
        <div className="md:flex hidden gap-6 ml-auto">
          <Link href="/login">Entrar</Link>
          <Link href="/cadastro">Cadastrar</Link>
        </div>
        <div />
      </div>
      {progress && <ProgressBar />}
    </header>
  );
}

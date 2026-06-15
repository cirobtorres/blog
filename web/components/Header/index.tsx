"use client";

import React from "react";
import { Link } from "../Links";
import { ProgressBar } from "./ProgressBar";
import { cn, linkVariants } from "../../utils/variants";
import { externalUrls } from "../../routing/routes";
import { useAuth } from "../../providers/AuthProvider";
import { VariantProps } from "class-variance-authority";
import UserAuthGate from "./UserSignedIn";

interface ContentProps extends VariantProps<typeof linkVariants> {
  path: string;
  text: string;
}

const content: ContentProps[] = [
  {
    path: "/about",
    variant: "internal",
    text: "About",
  },
  {
    path: "/contact",
    variant: "internal",
    text: "Contact",
  },
  {
    path: externalUrls.myGitHub,
    text: "Github",
  },
];

export default function Header({
  className,
  sticky = false,
  progress = false,
}: {
  className?: string;
  sticky?: boolean;
  progress?: boolean;
}) {
  const headerRef = React.useRef<HTMLElement>(null);
  const scrollingDownRef = React.useRef(0);
  const { user } = useAuth();

  const hideNavbarListener = () => {
    let prevScrollPos = window.scrollY;
    const threshold = 1000;

    const handleScroll = () => {
      const currScrollPos = window.scrollY;

      if (!headerRef.current) return;

      if (
        currScrollPos < threshold || // Bring header back when near the top of the page
        currScrollPos < prevScrollPos || // Bring header back when scrolling up
        (currScrollPos > prevScrollPos && scrollingDownRef.current < threshold) // Hide header after scrolling down "threshold"pxs
      ) {
        headerRef.current.classList.remove("header-hidden");
      } else {
        headerRef.current.classList.add("header-hidden");
      }
      if (currScrollPos > prevScrollPos) {
        // Keeps header static for a certain amout of scrolling down before hiding it
        scrollingDownRef.current += currScrollPos - prevScrollPos;
      } else {
        // It is restarted when scrolling up
        scrollingDownRef.current = 0;
      }
      prevScrollPos = currScrollPos;
    };
    return handleScroll;
  };

  React.useEffect(() => {
    if (!sticky) return;
    const handleScroll = hideNavbarListener();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sticky]);

  return (
    <header
      id="main-header"
      ref={headerRef}
      className={cn(
        "z-50 sticky top-0 left-0 right-0 h-header flex items-center border-b px-3 transition-transform duration-300 will-change-transform bg-stone-200 dark:bg-stone-900",
        sticky ? "" : "static",
        className,
      )}
    >
      <div className="w-full flex items-center justify-between max-w-300 mx-auto">
        <Link href="/" className="border border-transparent md:mr-6">
          <div className="size-8 rounded-full bg-neutral-900 dark:bg-neutral-100" />
        </Link>
        <nav className="md:flex flex-1 hidden gap-6">
          {content?.map(({ path, variant, text }, index) => (
            <Link
              key={index}
              href={path}
              variant={variant}
              className="text-sm font-normal text-neutral-900 dark:text-neutral-100 border border-transparent"
            >
              {text}
            </Link>
          ))}
        </nav>
        <UserAuthGate user={user} />
      </div>
      {progress && <ProgressBar />}
    </header>
  );
}

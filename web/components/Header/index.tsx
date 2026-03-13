"use client";

import { useEffect, useRef, useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { Link } from "../Links";
import { cn, linkVariants } from "../../utils/variants";
import { externalUrls, publicWebUrls } from "../../config/routes";
import { Skeleton } from "../Skeleton";
import getUser from "../../services/auth/session/client/getUser";
import UserSignedIn from "./UserSignedIn";

interface ContentProps {
  path: string;
  variant: "internal" | "external" | "button" | "title" | null | undefined;
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
    variant: "external",
    text: "Github",
  },
];

export function Header({
  className,
  sticky = false,
  progress = false,
}: {
  className?: string;
  sticky?: boolean;
  progress?: boolean;
}) {
  const [user, setUser] = useState<AuthSession | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const scrollingDownRef = useRef(0);

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
        // headerRef.current.style.transform = "translateY(0)";
        headerRef.current.classList.remove("header-hidden");
      } else {
        // headerRef.current.style.transform = "translateY(-50px)";
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

  useEffect(() => {
    if (!sticky) return;
    const handleScroll = hideNavbarListener();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sticky]);

  useEffect(() => {
    getUser().then(setUser);
  }, []);

  function renderAuthArea() {
    if (user === null) return <UserSkeleton />;

    if (user.ok) {
      return <UserSignedIn user={user} setUserState={setUser} />;
    }

    return <UserSignedOff />;
  }

  return (
    <header
      ref={headerRef}
      className={cn(
        "z-10 sticky top-0 left-0 right-0 h-header flex items-center border-b px-6 transition-transform duration-300 will-change-transform bg-container",
        sticky ? "" : "static",
        className,
      )}
    >
      <div className="w-full flex items-center justify-between max-w-300 mx-auto">
        <div className="mr-6">
          <Link href="/">
            <div className="size-8 rounded-full bg-neutral-900 dark:bg-neutral-100" />
          </Link>
        </div>
        <nav className="md:flex flex-1 hidden gap-6">
          {content?.map(({ path, variant, text }, index) => (
            <Link
              key={index}
              href={path}
              variant={variant}
              className={cn(
                linkVariants({ variant: "internal" }),
                "text-sm font-normal text-neutral-900 dark:text-neutral-100",
              )}
            >
              {text}
            </Link>
          ))}
        </nav>
        {renderAuthArea()}
        <div />
      </div>
      {progress && <ProgressBar />}
    </header>
  );
}

const UserSkeleton = () => (
  <div className="flex items-center gap-2">
    <Skeleton className="flex justify-center items-center shrink-0 size-8 rounded-full" />
    <Skeleton className="w-20 h-6 shrink-0" />
  </div>
);

const UserSignedOff = () => (
  <div className="flex items-center gap-2 ml-auto mr-0">
    <Link
      href={publicWebUrls.signIn}
      className="text-sm font-normal text-neutral-900 dark:text-neutral-100"
    >
      Entrar
    </Link>
    <div className="w-px h-4 bg-stone-800" />
    <Link
      href={publicWebUrls.signUp}
      className="text-sm font-normal text-neutral-900 dark:text-neutral-100"
    >
      Cadastrar
    </Link>
  </div>
);

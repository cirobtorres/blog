"use client";

import React from "react";
import { ProgressBar } from "./ProgressBar";
import { Link } from "../Links";
import { cn, linkVariants } from "../../utils/variants";
import { externalUrls, publicWebUrls } from "../../config/routes";
import { Skeleton } from "../Skeleton";
import getUser from "../../services/auth/session/client/getUser";
import UserSignedIn from "./UserSignedIn";
import Spinner from "../Spinner";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";

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
  const [user, setUser] = React.useState<AuthSession | null>(null);
  const headerRef = React.useRef<HTMLElement>(null);
  const scrollingDownRef = React.useRef(0);

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

  React.useEffect(() => {
    if (!sticky) return;
    const handleScroll = hideNavbarListener();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sticky]);

  React.useEffect(() => {
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
        "z-10 sticky top-0 left-0 right-0 h-header flex items-center border-b px-6 transition-transform duration-300 will-change-transform bg-stone-200 dark:bg-stone-900",
        sticky ? "" : "static",
        className,
      )}
    >
      <div className="w-full flex items-center justify-between max-w-300 mx-auto">
        <Link href="/" className="mr-6">
          <div className="size-8 rounded-full bg-neutral-900 dark:bg-neutral-100" />
        </Link>
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
  <div className="flex items-center gap-2 ml-auto mr-0">
    <Skeleton className="flex justify-center items-center shrink-0 size-8 rounded-full">
      <Spinner />
    </Skeleton>
  </div>
);

const UserSignedOff = () => (
  <Popover>
    <PopoverTrigger className="cursor-pointer flex justify-center items-center ml-auto mr-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-8 p-1 border rounded-full bg-stone-800"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </PopoverTrigger>
    <PopoverContent
      align="end"
      className="w-30 flex flex-col gap-0 p-1 bg-stone-200 dark:bg-stone-900 [&_a]:text-sm [&_a]:font-normal [&_a]:text-neutral-900 [&_a]:dark:text-neutral-100 [&_a]:transition-background [&_a]:duration-300 [&_a]:hover:bg-stone-800 [&_a]:w-full [&_a]:py-1 [&_a]:px-2"
    >
      <Link href={publicWebUrls.signIn}>Entrar</Link>
      <Link href={publicWebUrls.signUp}>Cadastrar</Link>
    </PopoverContent>
  </Popover>
);

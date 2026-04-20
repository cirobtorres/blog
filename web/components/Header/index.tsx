"use client";

import React from "react";
import { Link } from "../Links";
import { ProgressBar } from "./ProgressBar";
import { cn, linkVariants } from "../../utils/variants";
import { externalUrls } from "../../routing/routes";
import { Skeleton } from "../Skeleton";
import UserSignedIn from "./UserSignedIn";
import Spinner from "../Spinner";
import UserSignedOff from "./UserSignedOff";
import { useAuth } from "../../providers/AuthProvider";
import { VariantProps } from "class-variance-authority";

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

export function Header({
  className,
  sticky = false,
  progress = false,
}: {
  className?: string;
  sticky?: boolean;
  progress?: boolean;
}) {
  // ----------------------------------------------------------------------
  // Forcing it to render as Client Component
  // Suppress Hydration error due dynamic IDs mismatch between RadixUI & Next.js
  // Because one was rendered on server and the other on client
  // const [isMounted, setIsMounted] = React.useState(false);
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

  // React.useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  // if (!isMounted) return <Unmounted />;

  function renderAuthArea() {
    if (user === null) return <UserSkeleton />;

    if (user.ok) return <UserSignedIn user={user} />;

    return <UserSignedOff />;
  }

  return (
    <header
      ref={headerRef}
      className={cn(
        "z-50 sticky top-0 left-0 right-0 h-header flex items-center border-b px-6 transition-transform duration-300 will-change-transform bg-stone-200 dark:bg-stone-900",
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
              className="text-sm font-normal text-neutral-900 dark:text-neutral-100 border border-transparent"
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

// const Unmounted = () => (
//   <div className="flex justify-center items-center ml-auto mr-0">
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className="size-8 p-1 border rounded-full not-default:shadow bg-stone-100 border-stone-300 dark:border-stone-700 dark:bg-stone-800"
//     >
//       <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
//       <circle cx="12" cy="7" r="4" />
//     </svg>
//   </div>
// );

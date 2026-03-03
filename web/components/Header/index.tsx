"use client";

import { useEffect, useRef, useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { Link } from "../Links";
import { cn, linkVariants } from "../../utils/className";
import { logout } from "../../services/auth/logout";
import { Skeleton } from "../Skeleton";
import getUser from "../../services/auth/session/client/getUser";
import { webUrls } from "../../urls";

const content = [
  {
    path: "/about",
    text: "About",
  },
  {
    path: webUrls.myGithub,
    text: "Github",
  },
];

export function Header({
  sticky = false,
  progress = false,
}: {
  sticky?: boolean;
  progress?: boolean;
}) {
  const [session, setSession] = useState<AuthSession | null>(null);
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
    if (process.env.NODE_ENV !== "production") {
      console.log("Header: MOUNT");
    } // DEBUG

    if (!sticky) return;

    const handleScroll = hideNavbarListener();

    window.addEventListener("scroll", handleScroll);

    return () => {
      // Cleanup

      if (process.env.NODE_ENV !== "production") {
        console.log("Header: UNMOUNT");
      } // DEBUG

      window.removeEventListener("scroll", handleScroll);
    };
  }, [sticky]);

  useEffect(() => {
    getUser().then(setSession);
  }, []);

  function renderAuthArea() {
    if (session === null)
      return (
        <div className="grid grid-cols-[120px_17px_25px] items-center ml-auto mr-0">
          <Skeleton className="shrink-0 h-6 w-full" />
          <div className="w-px h-4 mx-2 bg-neutral-800" />
          <Skeleton className="shrink-0 h-6 w-full" />
        </div>
      );

    if (session.ok) {
      return (
        <div className="grid grid-cols-[1fr_17px_25px] items-center ml-auto mr-0">
          <Link
            href="/author"
            className={cn(
              linkVariants({ variant: "button" }),
              "max-w-30 cursor-pointer bg-inherit dark:bg-inherit hover:bg-inherit hover:dark:bg-inherit",
            )}
          >
            <p className="truncate text-nowrap justify-start">
              {session.data.name}
            </p>
          </Link>
          <div className="w-px h-4 mx-2 bg-neutral-800" />
          <button
            onClick={async () => {
              await logout();
              setSession({ ok: false, data: null });
            }}
            className={cn(
              linkVariants({ variant: "button" }),
              "w-full max-w-6.25 cursor-pointer bg-inherit dark:bg-inherit hover:bg-inherit hover:dark:bg-inherit",
            )}
          >
            Sair
          </button>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 ml-auto mr-0">
        <Link
          href="/sign-in"
          className={cn(
            linkVariants({ variant: "button" }),
            "size-fit cursor-pointer bg-inherit dark:bg-inherit hover:bg-inherit hover:dark:bg-inherit",
          )}
        >
          Entrar
        </Link>
        <div className="w-px h-4 bg-muted" />
        <Link
          href="/sign-up"
          className={cn(
            linkVariants({ variant: "button" }),
            "size-fit cursor-pointer bg-inherit dark:bg-inherit hover:bg-inherit hover:dark:bg-inherit",
          )}
        >
          Cadastrar
        </Link>
      </div>
    );
  }

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 left-0 right-0 h-header border-b flex items-center px-6 transition-transform duration-300 will-change-transform bg-background",
        sticky ? "z-10 backdrop-blur-sm" : "static",
      )}
    >
      <div className="w-full flex items-center justify-between max-w-360 mx-auto">
        <div className="mr-6">
          <Link href="/" className="no-underline">
            LOGO
          </Link>
        </div>
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
        {renderAuthArea()}
        <div />
      </div>
      {progress && <ProgressBar />}
    </header>
  );
}

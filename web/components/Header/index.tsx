"use client";

import { useEffect, useRef, useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { Link } from "../Links";
import { cn, focusRing, linkVariants } from "../../utils/className";
import { logout } from "../../services/auth/logout";
import { Skeleton } from "../Skeleton";
import getUser from "../../services/auth/session/client/getUser";
import { webUrls } from "../../urls";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import Image from "next/image";
import { Button } from "../Buttons";

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
    getUser().then(setUser);
  }, []);

  function renderAuthArea() {
    if (user === null)
      return (
        <div className="grid grid-cols-[120px_17px_25px] items-center ml-auto mr-0">
          <Skeleton className="shrink-0 h-6 w-full" />
          <div className="w-px h-4 mx-2 bg-neutral-800" />
          <Skeleton className="shrink-0 h-6 w-full" />
        </div>
      );

    if (user.ok) {
      return (
        <div className="ml-auto mr-0">
          <Popover>
            <PopoverTrigger
              asChild
              tabIndex={0}
              className={cn(
                "flex items-center justify-start gap-2 cursor-pointer rounded-full p-1 transition-[background-color,box-shadow] duration-300 group",
                focusRing,
              )}
            >
              <div>
                <Image
                  src="https://placehold.co/32x32/0a0a0a/f5f5f5/jpg" // TODO
                  alt="User avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <p className="max-w-30 text-sm font-sans truncate text-nowrap justify-start text-muted-foreground group-hover:text-foreground dark:group-hover:text-foreground transition-color duration-300">
                  {user.data.name}
                </p>
              </div>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              sideOffset={10}
              className="flex flex-col items-center justify-center p-4 gap-2"
            >
              <p className="text-sm text-muted-foreground line-clamp-2">
                {user.data.email}
              </p>
              <Image
                src="https://placehold.co/100x100/0a0a0a/f5f5f5/jpg" // TODO
                alt="User avatar"
                width={100}
                height={100}
                className="rounded-full"
              />
              <p className="text-sm text-muted-foreground truncate text-nowrap">
                {user.data.name}
              </p>
              <div className="flex gap-1">
                <Link
                  href="/author"
                  className="w-20 h-10 inline-flex items-center justify-center text-foreground text-center no-underline rounded-l-full bg-primary"
                >
                  Painel
                </Link>
                <Button
                  onClick={async () => {
                    await logout();
                    setUser({ ok: false, data: null });
                  }}
                  variant="outline"
                  className="w-20 h-10 rounded-r-full"
                >
                  Sair
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 ml-auto mr-0">
        <Link href="/sign-in" className="no-underline">
          Entrar
        </Link>
        <div className="w-px h-4 bg-muted" />
        <Link href="/sign-up" className="no-underline">
          Cadastrar
        </Link>
      </div>
    );
  }

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 left-0 right-0 h-header border-b flex items-center px-6 transition-transform duration-300 will-change-transform",
        sticky
          ? "z-10 backdrop-blur-sm bg-muted/75 dark:bg-card/75"
          : "static bg-muted dark:bg-card",
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

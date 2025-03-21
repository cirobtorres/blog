"use client";

import { useEffect, useRef } from "react";
import ProgressBar from "./ProgressBar";
import HeaderContent from "./HeaderContent";

const FloatingHeader = ({ currentUser }: { currentUser: User }) => {
  const headerRef = useRef<HTMLElement>(null);

  const hideNavbarListener = () => {
    let prevScrollPos = window.scrollY;
    const threshold = 400 + 480 + 80; // threshold to maintain header on top, beyond which it is allowed to hide

    const handleScroll = () => {
      const currScrollPos = window.scrollY;
      if (currScrollPos < threshold || currScrollPos < prevScrollPos) {
        if (headerRef.current) headerRef.current.style.top = "0";
      } else {
        if (headerRef.current) headerRef.current.style.top = "-49px"; // 48px header height + 1px border width
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
      className="fixed h-12 w-full backdrop-blur-sm shrink-0 [z-index:10] top-0 transition-[top] duration-300 bg-blog-background-backdrop"
    >
      <HeaderContent currentUser={currentUser} />
      <ProgressBar />
    </header>
  );
};

const StaticHeader = ({ currentUser }: { currentUser: User }) => {
  return (
    <header
      id="floating-header"
      className="z-10 h-12 w-full backdrop-blur-sm shrink-0 bg-blog-background-backdrop"
    >
      <HeaderContent currentUser={currentUser} />
    </header>
  );
};

export { FloatingHeader, StaticHeader };

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const ProgressBar = () => {
  const pathname = usePathname();
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressBarBlurRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const lineProgressOnScroll = () => {
      const elementHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (!elementHeight) return;

      const scrollTop = window.scrollY;
      const percentage =
        scrollTop < elementHeight ? (scrollTop / elementHeight) * 100 : 100;
      setProgress(percentage);

      if (progressBarRef.current && progressBarBlurRef.current) {
        progressBarRef.current.style.width = `${percentage}%`;
        progressBarBlurRef.current.style.width = `${percentage}%`;
      }
    };

    if (process.env.NODE_ENV !== "production") {
      console.log("ProgressBar: MOUNT");
    } // DEBUG

    window.addEventListener("scroll", lineProgressOnScroll);
    return () => {
      // Cleanup

      if (process.env.NODE_ENV !== "production") {
        console.log("ProgressBar: UNMOUNT");
      } // DEBUG

      window.removeEventListener("scroll", lineProgressOnScroll);
    };
  }, []);

  if (!pathname.startsWith("/article")) return null;

  return (
    <div
      id="progress"
      role="progressbar"
      aria-labelledby="progressbar-label"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-[calc(100%+1px)] left-0 h-1 w-full inline-grid"
    >
      <div
        ref={progressBarRef}
        style={{ width: "0%" }}
        className="h-full col-start-1 row-start-1 bg-gradient-linear-right bg-blend-hard-light blur-xl rounded-full"
      />
      <div
        ref={progressBarBlurRef}
        style={{ width: "0%" }}
        className="h-full col-start-1 row-start-1 bg-gradient-linear-right bg-blend-hard-light rounded-full"
      />
      <span id="progressbar-label" className="sr-only">
        Progresso de rolagem da página
      </span>
    </div>
  );
};

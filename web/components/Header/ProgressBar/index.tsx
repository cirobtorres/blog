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

    window.addEventListener("scroll", lineProgressOnScroll);
    return () => {
      // Cleanup

      window.removeEventListener("scroll", lineProgressOnScroll);
    };
  }, []);

  if (!pathname.startsWith("/articles")) return null;

  return (
    <div
      id="progress"
      role="progressbar"
      aria-labelledby="progressbar-label"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      // border: top-[calc(100%+1px)]
      // No border: top-full
      className="fixed top-[calc(100%+1px)] left-0 h-1 w-full lg:hidden inline-grid"
    >
      <div
        ref={progressBarRef}
        style={{ width: "0%" }}
        className="h-full col-start-1 row-start-1 bg-primary bg-blend-hard-light blur"
      />
      <div
        ref={progressBarBlurRef}
        style={{ width: "0%" }}
        className="h-full col-start-1 row-start-1 bg-primary bg-blend-hard-light"
      />
      <span id="progressbar-label" className="sr-only">
        Progresso de rolagem da página
      </span>
    </div>
  );
};

"use client";

import { useEffect, useState } from "react";
import { cn, focusRing } from "../../../utils/className";

export default function BackToTopButton() {
  const diameter = 65;
  const strokeWidth = 5;
  const outerRadius = diameter / 2;
  const innerRadius = diameter / 2 - strokeWidth * 2;
  const circumference = 2 * Math.PI * innerRadius;

  const [progress, setProgress] = useState(0); // 0 → 100

  useEffect(() => {
    const onScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (totalHeight <= 0) return;

      const scrollTop = window.scrollY;
      const percentage = Math.min(100, (scrollTop / totalHeight) * 100);

      setProgress(percentage);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    if (process.env.NODE_ENV !== "production") {
      console.log("BackToTopButton: MOUNT");
    } // DEBUG

    return () => {
      if (process.env.NODE_ENV !== "production") {
        console.log("BackToTopButton: UNMOUNT");
      } // DEBUG
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const strokeDashoffset = circumference - (circumference * progress) / 100;

  return (
    <div className="hidden lg:block sticky top-[calc(50%-var(--height-header))] size-fit ml-0 mr-auto">
      <button
        id="btt-btn"
        data-testid="btt-btn"
        type="button"
        aria-label="Voltar ao topo da página"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "relative flex cursor-pointer rounded transition-all duration-300 group",
          focusRing,
        )}
      >
        <svg
          className="relative -rotate-90"
          aria-hidden="true"
          style={{ width: diameter, height: diameter }}
        >
          <defs>
            <linearGradient
              id="progressGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="oklch(69.6% 0.17 162.48)" />
              <stop offset="12%" stopColor="oklch(66% 0.19 190)" />
              <stop offset="25%" stopColor="oklch(64% 0.2 220)" />
              <stop offset="35%" stopColor="oklch(62.3% 0.214 259.815)" />
              <stop offset="50%" stopColor="oklch(62.7% 0.265 303.9)" />
              <stop offset="75%" stopColor="oklch(70.5% 0.213 47.604)" />
              <stop offset="100%" stopColor="oklch(64.5% 0.246 16.439)" />
            </linearGradient>
          </defs>
          <circle
            cx={outerRadius}
            cy={outerRadius}
            r={innerRadius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            className="fill-none stroke-neutral-100 dark:stroke-neutral-800"
          />
          <circle
            cx={outerRadius}
            cy={outerRadius}
            r={innerRadius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            fill="none"
            stroke="url(#progressGradient)"
            className="fill-none"
          />
          <circle
            cx={outerRadius}
            cy={outerRadius}
            r={innerRadius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            fill="none"
            stroke="url(#progressGradient)"
            className="fill-none blur-xs pointer-events-none"
          />
        </svg>
        <svg
          stroke="currentColor"
          fill="currentColor"
          viewBox="0 0 448 512"
          height="16px"
          width="16px"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 group-hover:animate-bouncing-arrow group-focus-visible:animate-bouncing-arrow"
        >
          <path d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z" />
        </svg>
      </button>
    </div>
  );
}

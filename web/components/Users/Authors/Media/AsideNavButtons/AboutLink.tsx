"use client";

import Link from "next/link";
import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../../HoverCard";
import { protectedWebUrls } from "../../../../../routing/routes";
import { cn, focusRing } from "../../../../../utils/variants";
import { usePathname } from "next/navigation";
import { Transition, useAnimation, motion } from "motion/react";

export interface AboutLinkHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AboutLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  size?: number;
}

const DEFAULT_TRANSITION: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 12,
  mass: 0.4,
};

export const AboutLink = React.forwardRef<AboutLinkHandle, AboutLinkProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = React.useRef(false);
    const path = "/about";
    const pathname = usePathname();
    const currentLink = pathname
      .split(protectedWebUrls.authors)[1]
      .startsWith(path);

    React.useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = React.useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter],
    );

    const handleMouseLeave = React.useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave],
    );

    return (
      <HoverCard openDelay={100} closeDelay={100}>
        <HoverCardTrigger asChild>
          <Link
            href={protectedWebUrls.authors + path}
            className={cn(
              "rounded-lg p-2 mx-2 transition-background duration-300 border border-transparent hover:bg-stone-200 dark:hover:bg-stone-750",
              currentLink && "bg-stone-200 dark:bg-stone-750",
              focusRing,
              className,
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
          >
            <svg
              fill="none"
              height={size}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width={size}
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.line
                animate={controls}
                initial={false}
                transition={DEFAULT_TRANSITION}
                variants={{
                  normal: {
                    x2: 14,
                  },
                  animate: {
                    x2: 10,
                  },
                }}
                x1="21"
                x2="14"
                y1="4"
                y2="4"
              />
              <motion.line
                animate={controls}
                transition={DEFAULT_TRANSITION}
                variants={{
                  normal: {
                    x1: 10,
                  },
                  animate: {
                    x1: 5,
                  },
                }}
                x1="10"
                x2="3"
                y1="4"
                y2="4"
              />

              <motion.line
                animate={controls}
                transition={DEFAULT_TRANSITION}
                variants={{
                  normal: {
                    x2: 12,
                  },
                  animate: {
                    x2: 18,
                  },
                }}
                x1="21"
                x2="12"
                y1="12"
                y2="12"
              />

              <motion.line
                animate={controls}
                transition={DEFAULT_TRANSITION}
                variants={{
                  normal: {
                    x1: 8,
                  },
                  animate: {
                    x1: 13,
                  },
                }}
                x1="8"
                x2="3"
                y1="12"
                y2="12"
              />

              <motion.line
                animate={controls}
                transition={DEFAULT_TRANSITION}
                variants={{
                  normal: {
                    x2: 12,
                  },
                  animate: {
                    x2: 4,
                  },
                }}
                x1="3"
                x2="12"
                y1="20"
                y2="20"
              />

              <motion.line
                animate={controls}
                transition={DEFAULT_TRANSITION}
                variants={{
                  normal: {
                    x1: 16,
                  },
                  animate: {
                    x1: 8,
                  },
                }}
                x1="16"
                x2="21"
                y1="20"
                y2="20"
              />

              <motion.line
                animate={controls}
                transition={DEFAULT_TRANSITION}
                variants={{
                  normal: {
                    x1: 14,
                    x2: 14,
                  },
                  animate: {
                    x1: 9,
                    x2: 9,
                  },
                }}
                x1="14"
                x2="14"
                y1="2"
                y2="6"
              />

              <motion.line
                animate={controls}
                transition={DEFAULT_TRANSITION}
                variants={{
                  normal: {
                    x1: 8,
                    x2: 8,
                  },
                  animate: {
                    x1: 14,
                    x2: 14,
                  },
                }}
                x1="8"
                x2="8"
                y1="10"
                y2="14"
              />

              <motion.line
                animate={controls}
                transition={DEFAULT_TRANSITION}
                variants={{
                  normal: {
                    x1: 16,
                    x2: 16,
                  },
                  animate: {
                    x1: 8,
                    x2: 8,
                  },
                }}
                x1="16"
                x2="16"
                y1="18"
                y2="22"
              />
            </svg>
          </Link>
        </HoverCardTrigger>
        <HoverCardContent side="right" className="text-sm">
          Sobre
        </HoverCardContent>
      </HoverCard>
    );
  },
);

AboutLink.displayName = "AboutLink";

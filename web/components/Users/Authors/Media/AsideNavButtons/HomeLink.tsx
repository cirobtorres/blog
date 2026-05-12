"use client";

import React from "react";
import Link from "next/link";
import { Transition, useAnimation, Variants, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { protectedWebUrls } from "../../../../../routing/routes";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../../HoverCard";
import { cn, focusRing } from "../../../../../utils/variants";

export interface HomeLinkHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface HomeLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  size?: number;
}

const DEFAULT_TRANSITION_HOME: Transition = {
  duration: 0.6,
  opacity: { duration: 0.2 },
};

const PATH_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
  },
};

export const HomeLink = React.forwardRef<HomeLinkHandle, HomeLinkProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = React.useRef(false);
    const path = "";
    const pathname = usePathname();
    const currentLink = pathname.split(protectedWebUrls.authors)[1] === "";

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
              <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <motion.path
                animate={controls}
                d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"
                transition={DEFAULT_TRANSITION_HOME}
                variants={PATH_VARIANTS}
              />
            </svg>
          </Link>
        </HoverCardTrigger>
        <HoverCardContent side="right" className="text-sm">
          Resumo
        </HoverCardContent>
      </HoverCard>
    );
  },
);

HomeLink.displayName = "HomeLink";

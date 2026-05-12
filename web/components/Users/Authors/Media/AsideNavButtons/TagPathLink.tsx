"use client";

import { useAnimation, Variants, motion } from "motion/react";
import { usePathname } from "next/navigation";
import React from "react";
import { protectedWebUrls } from "../../../../../routing/routes";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../../HoverCard";
import Link from "next/link";
import { cn, focusRing } from "../../../../../utils/variants";

export interface TagLinkHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface TagLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  size?: number;
}

const BOOKMARK_VARIANTS: Variants = {
  normal: { scaleY: 1, scaleX: 1 },
  animate: {
    scaleY: [1, 1.3, 0.9, 1.05, 1],
    scaleX: [1, 0.9, 1.1, 0.95, 1],
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const CHECK_VARIANTS: Variants = {
  normal: { opacity: 1, strokeDashoffset: 0 },
  animate: {
    strokeDashoffset: [1, 0],
    opacity: [0, 1],
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export const TagLink = React.forwardRef<TagLinkHandle, TagLinkProps>(
  ({ className, size = 28, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = React.useRef(false);
    const path = "/tags";
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
              <motion.path
                animate={controls}
                d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"
                style={{ originX: 0.5, originY: 0.5 }}
                variants={BOOKMARK_VARIANTS}
              />

              <motion.path
                animate={controls}
                d="m9 10 2 2 4-4"
                initial="normal"
                pathLength="1"
                strokeDasharray="1 1"
                variants={CHECK_VARIANTS}
              />
            </svg>
          </Link>
        </HoverCardTrigger>
        <HoverCardContent side="right" className="text-sm">
          Tags
        </HoverCardContent>
      </HoverCard>
    );
  },
);

TagLink.displayName = "TagLink";

"use client";

import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../../HoverCard";
import { cn, focusRing } from "../../../../../utils/variants";
import { protectedWebUrls } from "../../../../../routing/routes";
import { usePathname } from "next/navigation";
import { useAnimation, Variants, motion } from "motion/react";
import React from "react";

export interface MediaLinkHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MediaLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  size?: number;
}

const PATH_VARIANTS_ATTACH: Variants = {
  normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    transition: {
      delay: 0.1,
      duration: 0.4,
      opacity: { duration: 0.1, delay: 0.1 },
    },
  },
};

export const MediaLink = React.forwardRef<MediaLinkHandle, MediaLinkProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = React.useRef(false);
    const path = "/media";
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
                d="M6 7.90909V16C6 19.3137 8.68629 22 12 22V22C15.3137 22 18 19.3137 18 16V6C18 3.79086 16.2091 2 14 2V2C11.7909 2 10 3.79086 10 6V15.1818C10 16.2864 10.8954 17.1818 12 17.1818V17.1818C13.1046 17.1818 14 16.2864 14 15.1818V8"
                initial="normal"
                variants={PATH_VARIANTS_ATTACH}
              />
            </svg>
          </Link>
        </HoverCardTrigger>
        <HoverCardContent side="right" className="text-sm">
          Biblioteca de Mídia
        </HoverCardContent>
      </HoverCard>
    );
  },
);

MediaLink.displayName = "MediaLink";

"use client";

import React from "react";
import { cn, focusRing } from "../../../../../utils/variants";
import { motion, useAnimation } from "motion/react";
import { FolderCardInfos } from "./FolderCardsUtils";
import { Variants } from "motion/react";

export interface FolderCardButtonIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FolderCardButtonIconProps extends React.HTMLAttributes<HTMLButtonElement> {
  folder: Folder;
  size?: number;
}

const ARROW_VARIANTS: Variants = {
  normal: {
    y: 0,
    transition: {
      repeat: 0,
      duration: 0.2,
    },
  },
  animate: {
    y: [0, -3, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

const FolderCardButton = React.forwardRef<
  FolderCardButtonIconHandle,
  FolderCardButtonIconProps
>(
  (
    { onMouseEnter, onMouseLeave, className, folder, size = 28, ...props },
    ref,
  ) => {
    const controls = useAnimation();
    const isControlledRef = React.useRef(false);

    React.useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter],
    );

    const handleMouseLeave = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave],
    );
    return (
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "cursor-pointer w-full max-w-70 flex-1 flex shrink-0 items-center gap-2 p-2 transition-border duration-300 rounded border hover:border-primary not-dark:shadow bg-stone-200 dark:bg-stone-900 hover:bg-stone-300 dark:hover:bg-stone-800 focus-within:border-primary dark:focus-within:border-primary focus-within:bg-stone-300 dark:focus-within:bg-stone-800 group",
          focusRing,
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            "block w-fit rounded-lg p-3 transition-all duration-300 border border-stone-300 dark:border-stone-800 bg-stone-200 dark:bg-stone-925 group-hover:border-stone-400 dark:group-hover:border-stone-700 group-hover:bg-stone-300 dark:group-hover:bg-stone-900 group-focus-within:border-stone-400 dark:group-focus-within:border-stone-700 group-focus-within:bg-stone-300 dark:group-focus-within:bg-stone-900",
            focusRing,
          )}
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
            <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
            <motion.g
              animate={controls}
              initial="normal"
              variants={ARROW_VARIANTS}
            >
              <path d="M12 10v6" />
              <path d="m9 13 3-3 3 3" />
            </motion.g>
          </svg>
        </div>
        <FolderCardInfos folder={folder} />
      </button>
    );
  },
);

FolderCardButton.displayName = "FolderCardButton";

export default FolderCardButton;

"use client";

import React from "react";
import type { Variants, Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";
import { cn } from "../../../../../utils/variants";

const DURATION = 0.5;
const REPEAT_DELAY = 2;

const CALCULATE_DELAY = (i: number) => i * DURATION;
const LOOP_TRANSITION = (index: number): Transition => ({
  duration: DURATION,
  delay: CALCULATE_DELAY(index),
  repeat: Infinity,
  repeatDelay: REPEAT_DELAY,
  repeatType: "loop",
  ease: "easeInOut",
});

const MediaPullRequestIcon = ({
  className,
  size = 32,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  size?: number;
}) => {
  const controls = useAnimation();

  React.useEffect(() => {
    controls.start("animate");
  }, [controls]);

  const commonVariants: Variants = {
    normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
    animate: {
      pathLength: [0, 1],
      opacity: [0, 1],
    },
  };

  return (
    <div
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width={size}
        height={size}
      >
        <motion.circle
          cx="18"
          cy="18"
          r="3"
          animate={controls}
          variants={commonVariants}
          transition={LOOP_TRANSITION(0)}
        />
        <motion.path
          d="M13 6h3a2 2 0 0 1 2 2v7"
          animate={controls}
          variants={{
            ...commonVariants,
            animate: { ...commonVariants.animate, pathOffset: [1, 0] },
          }}
          transition={LOOP_TRANSITION(1)}
        />
        <motion.circle
          cx="6"
          cy="6"
          r="3"
          animate={controls}
          variants={commonVariants}
          transition={LOOP_TRANSITION(2)}
        />
        <motion.line
          x1="6"
          x2="6"
          y1="9"
          y2="21"
          animate={controls}
          variants={commonVariants}
          transition={LOOP_TRANSITION(3)}
        />
      </svg>
    </div>
  );
};

export { MediaPullRequestIcon };

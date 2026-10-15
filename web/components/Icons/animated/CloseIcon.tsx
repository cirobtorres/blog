import React, { HTMLAttributes } from "react";
import { useAnimation, motion } from "motion/react";
import { cn } from "../../../utils/variants";

interface CloseIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CloseIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CloseIcon = React.forwardRef<CloseIconHandle, CloseIconProps>(
  ({ className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = React.useRef(false);

    React.useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    return (
      <div className={cn(className)} {...props}>
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
            d="M18 6 6 18"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.path
            d="m6 6 12 12"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          />
        </svg>
      </div>
    );
  },
);

CloseIcon.displayName = "CloseIcon";

export default CloseIcon;

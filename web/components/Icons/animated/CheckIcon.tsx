import React, { HTMLAttributes } from "react";
import { useAnimation, motion } from "motion/react";
import { cn } from "../../../utils/variants";

interface CheckIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CheckIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CheckIcon = React.forwardRef<CheckIconHandle, CheckIconProps>(
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
            d="M4 12 9 17L20 6"
            initial="initial"
            animate="animate"
            variants={{
              initial: { pathLength: 0, opacity: 0 },
              animate: {
                pathLength: 1,
                opacity: 1,
                transition: { duration: 0.4, ease: "easeOut" },
              },
            }}
          />
        </svg>
      </div>
    );
  },
);

CheckIcon.displayName = "CheckIcon";

export default CheckIcon;

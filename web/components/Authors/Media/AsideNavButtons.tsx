"use client";

import Link from "next/link";
import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import { cn, focusRing } from "../../../utils/variants";
import { usePathname } from "next/navigation";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../../HoverCard";
import { protectedWebUrls } from "../../../routing/routes";

export function HomePathLink() {
  const path = "";
  const pathname = usePathname();
  const currentLink = pathname.split(protectedWebUrls.authors)[1] === "";

  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Link
          href={protectedWebUrls.authors + path}
          className={cn(
            "rounded-lg p-2 mx-2 transition-background duration-300 border border-transparent hover:bg-stone-200 dark:hover:bg-stone-750",
            currentLink && "bg-stone-200 dark:bg-stone-750",
            focusRing,
          )}
        >
          <HomeIcon />
        </Link>
      </HoverCardTrigger>
      <HoverCardContent side="right" className="text-sm">
        Resumo
      </HoverCardContent>
    </HoverCard>
  );
}

export function ArticlesPathLink() {
  const path = "/articles";
  const pathname = usePathname();
  const currentLink = pathname
    .split(protectedWebUrls.authors)[1]
    .startsWith(path);

  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Link
          href={protectedWebUrls.authors + path}
          className={cn(
            "rounded-lg p-2 mx-2 transition-background duration-300 border border-transparent hover:bg-stone-200 dark:hover:bg-stone-750",
            currentLink && "bg-stone-200 dark:bg-stone-750",
            focusRing,
          )}
        >
          <SquarePenIcon />
        </Link>
      </HoverCardTrigger>
      <HoverCardContent side="right" className="text-sm">
        Criar Artigos
      </HoverCardContent>
    </HoverCard>
  );
}

export function MediaPathLink() {
  const path = "/media";
  const pathname = usePathname();
  const currentLink = pathname
    .split(protectedWebUrls.authors)[1]
    .startsWith(path);

  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Link
          href={protectedWebUrls.authors + path}
          className={cn(
            "rounded-lg p-2 mx-2 transition-background duration-300 border border-transparent hover:bg-stone-200 dark:hover:bg-stone-750",
            currentLink && "bg-stone-200 dark:bg-stone-750",
            focusRing,
          )}
        >
          <AttachFileIcon />
        </Link>
      </HoverCardTrigger>
      <HoverCardContent side="right" className="text-sm">
        Biblioteca de Mídia
      </HoverCardContent>
    </HoverCard>
  );
}

export function TagPathLink() {
  const path = "/tags";
  const pathname = usePathname();
  const currentLink = pathname
    .split(protectedWebUrls.authors)[1]
    .startsWith(path);

  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Link
          href={protectedWebUrls.authors + path}
          className={cn(
            "rounded-lg p-2 mx-2 transition-background duration-300 border border-transparent hover:bg-stone-200 dark:hover:bg-stone-750",
            currentLink && "bg-stone-200 dark:bg-stone-750",
            focusRing,
          )}
        >
          <BookmarkCheckIcon />
        </Link>
      </HoverCardTrigger>
      <HoverCardContent side="right" className="text-sm">
        Tags
      </HoverCardContent>
    </HoverCard>
  );
}

export function UsersPathLink() {
  const path = "/users";
  const pathname = usePathname();
  const currentLink = pathname
    .split(protectedWebUrls.authors)[1]
    .startsWith(path);

  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Link
          href={protectedWebUrls.authors + path}
          className={cn(
            "rounded-lg p-2 mx-2 transition-background duration-300 border border-transparent hover:bg-stone-200 dark:hover:bg-stone-750",
            currentLink && "bg-stone-200 dark:bg-stone-750",
            focusRing,
          )}
        >
          <UsersIcon />
        </Link>
      </HoverCardTrigger>
      <HoverCardContent side="right" className="text-sm">
        Usuários
      </HoverCardContent>
    </HoverCard>
  );
}

export function AboutPathLink() {
  const path = "/about";
  const pathname = usePathname();
  const currentLink = pathname
    .split(protectedWebUrls.authors)[1]
    .startsWith(path);

  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Link
          href={protectedWebUrls.authors + path}
          className={cn(
            "rounded-lg p-2 mx-2 transition-background duration-300 border border-transparent hover:bg-stone-200 dark:hover:bg-stone-750",
            currentLink && "bg-stone-200 dark:bg-stone-750",
            focusRing,
          )}
        >
          <SlidersHorizontalIcon />
        </Link>
      </HoverCardTrigger>
      <HoverCardContent side="right" className="text-sm">
        Sobre
      </HoverCardContent>
    </HoverCard>
  );
}

export interface HomeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface HomeIconProps extends HTMLAttributes<HTMLDivElement> {
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

const HomeIcon = forwardRef<HomeIconHandle, HomeIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter],
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave],
    );
    return (
      <div
        className={cn(className)}
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
      </div>
    );
  },
);

HomeIcon.displayName = "HomeIcon";

export interface SquarePenIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SquarePenIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PEN_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    x: 0,
    y: 0,
  },
  animate: {
    rotate: [-0.5, 0.5, -0.5],
    x: [0, -1, 1.5, 0],
    y: [0, 1.5, -1, 0],
  },
};

const SquarePenIcon = forwardRef<SquarePenIconHandle, SquarePenIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter],
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave],
    );

    return (
      <div
        className={cn(className)}
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
          style={{ overflow: "visible" }}
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <motion.path
            animate={controls}
            d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
            variants={PEN_VARIANTS}
          />
        </svg>
      </div>
    );
  },
);

SquarePenIcon.displayName = "SquarePenIcon";

export interface AttachFileIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AttachFileIconProps extends HTMLAttributes<HTMLDivElement> {
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

const AttachFileIcon = forwardRef<AttachFileIconHandle, AttachFileIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter],
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave],
    );

    return (
      <div
        className={cn(className)}
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
      </div>
    );
  },
);

AttachFileIcon.displayName = "AttachFileIcon";

export interface BookmarkCheckIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BookmarkCheckIconProps extends HTMLAttributes<HTMLDivElement> {
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

const BookmarkCheckIcon = forwardRef<
  BookmarkCheckIconHandle,
  BookmarkCheckIconProps
>(({ className, size = 28, onMouseEnter, onMouseLeave, ...props }, ref) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;
    return {
      startAnimation: () => controls.start("animate"),
      stopAnimation: () => controls.start("normal"),
    };
  });

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        onMouseEnter?.(e);
      } else {
        controls.start("animate");
      }
    },
    [controls, onMouseEnter],
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        onMouseLeave?.(e);
      } else {
        controls.start("normal");
      }
    },
    [controls, onMouseLeave],
  );

  return (
    <div
      className={cn(className)}
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
    </div>
  );
});

BookmarkCheckIcon.displayName = "BookmarkCheckIcon";

export interface UsersIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface UsersIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PATH_VARIANTS_USERS: Variants = {
  normal: {
    translateX: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 13,
    },
  },
  animate: {
    translateX: [-6, 0],
    transition: {
      delay: 0.1,
      type: "spring",
      stiffness: 200,
      damping: 13,
    },
  },
};

const UsersIcon = forwardRef<UsersIconHandle, UsersIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter],
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave],
    );

    return (
      <div
        className={cn(className)}
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
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <motion.path
            animate={controls}
            d="M22 21v-2a4 4 0 0 0-3-3.87"
            variants={PATH_VARIANTS_USERS}
          />
          <motion.path
            animate={controls}
            d="M16 3.13a4 4 0 0 1 0 7.75"
            variants={PATH_VARIANTS_USERS}
          />
        </svg>
      </div>
    );
  },
);

UsersIcon.displayName = "UsersIcon";

export interface IdCardIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface IdCardIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const VARIANTS_ID_CARD: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: (custom: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 0.3,
      delay: custom * 0.1,
    },
  }),
};

const IdCardIcon = forwardRef<IdCardIconHandle, IdCardIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter],
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave],
    );

    return (
      <div
        className={cn(className)}
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
            custom={2}
            d="M16 10h2"
            variants={VARIANTS_ID_CARD}
          />
          <motion.path
            animate={controls}
            custom={2}
            d="M16 14h2"
            variants={VARIANTS_ID_CARD}
          />
          <motion.path
            animate={controls}
            custom={0}
            d="M6.17 15a3 3 0 0 1 5.66 0"
            variants={VARIANTS_ID_CARD}
          />
          <motion.circle
            animate={controls}
            custom={1}
            cx="9"
            cy="11"
            r="2"
            variants={VARIANTS_ID_CARD}
          />
          <rect height="14" rx="2" width="20" x="2" y="5" />
        </svg>
      </div>
    );
  },
);

IdCardIcon.displayName = "IdCardIcon";

export interface SlidersHorizontalIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SlidersHorizontalIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const DEFAULT_TRANSITION: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 12,
  mass: 0.4,
};

const SlidersHorizontalIcon = forwardRef<
  SlidersHorizontalIconHandle,
  SlidersHorizontalIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;

    return {
      startAnimation: () => controls.start("animate"),
      stopAnimation: () => controls.start("normal"),
    };
  });

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        onMouseEnter?.(e);
      } else {
        controls.start("animate");
      }
    },
    [controls, onMouseEnter],
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        onMouseLeave?.(e);
      } else {
        controls.start("normal");
      }
    },
    [controls, onMouseLeave],
  );

  return (
    <div
      className={cn(className)}
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
    </div>
  );
});

SlidersHorizontalIcon.displayName = "SlidersHorizontalIcon";

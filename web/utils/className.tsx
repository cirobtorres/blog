import clsx from "clsx";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

type ClassValue = string | number | null | undefined | boolean;

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-neutral-100 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black";

export const linkVariants = cva(
  cn(
    "w-fit text-sm text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-100 font-sans rounded-xs font-bold transition-[color,box-shadow,background] duration-300",
    focusRing,
  ),
  {
    variants: {
      variant: {
        title:
          "text-black dark:text-neutral-100 dark:hover:underline text-xl no-underline",
        internal: "no-underline",
        external: "underline underline-offset-2",
        button:
          "w-full flex items-center justify-center h-10 rounded no-underline text-neutral-500 hover:text-neutral-600 bg-neutral-200 hover:bg-neutral-300 dark:text-neutral-500 dark:bg-neutral-900 dark:hover:text-neutral-100 dark:hover:bg-neutral-800",
      },
    },
    defaultVariants: {
      variant: "external",
    },
  },
);

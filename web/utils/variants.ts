import clsx from "clsx";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

type ClassValue = string | number | null | undefined | boolean;

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

export const focusRing =
  "focus-visible:outline-none! dark:focus-visible:outline-none! focus-visible:ring-2! dark:focus-visible:ring-2! focus-visible:ring-primary! dark:focus-visible:ring-stone-100! dark:focus-visible:ring-offset-2! dark:focus-visible:ring-offset-stone-950! focus-visible:border-primary! dark:focus-visible:border-primary!";

export const focusWithinRing =
  "focus-within:outline-none! dark:focus-within:outline-none! focus-within:ring-2! dark:focus-within:ring-2! focus-within:ring-primary! dark:focus-within:ring-stone-100! dark:focus-within:ring-offset-2! dark:focus-within:ring-offset-stone-950! focus-within:border-primary dark:focus-within:border-primary!";

export const edtAccFocusWithinRing =
  "has-[[data-slot=accordion-trigger]:focus-visible]:outline-none has-[[data-slot=accordion-trigger]:focus-visible]:ring-2 dark:has-[[data-slot=accordion-trigger]:focus-visible]:ring-2 has-[[data-slot=accordion-trigger]:focus-visible]:ring-primary dark:has-[[data-slot=accordion-trigger]:focus-visible]:ring-stone-100 dark:has-[[data-slot=accordion-trigger]:focus-visible]:ring-offset-2 has-[[data-slot=accordion-trigger]:focus-visible]:ring-offset-neutral-950 has-[[data-slot=accordion-trigger]:focus-visible]:border-primary dark:has-[[data-slot=accordion-trigger]:focus-visible]:border-primary!";

export const btnGroupStyle =
  "w-fit flex [&_button]:border [&_button]:first:rounded-l [&_button]:last:rounded-r [&_button]:focus-visible:z-10";

export const dashedBgStyle =
  "w-1 border-y dark:bg-[repeating-linear-gradient(315deg,#44403b_0,#44403b_1px,transparent_0,transparent_50%)] bg-size-[5px_5px]";

export const btnActive =
  "[&_svg]:stroke-primary bg-stone-125 dark:bg-stone-800";

export const btnNotActive =
  "[&_svg]:stroke-neutral-400 dark:[&_svg]:stroke-neutral-500 bg-stone-100 dark:bg-stone-900";

export const buttonVariants = cva(
  "cursor-pointer border disabled:cursor-auto rounded text-sm font-medium inline-flex items-center justify-center whitespace-nowrap transition-all duration-300 shrink-0 outline-none group/button select-none h-9.5 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 not-dark:shadow focus-visible:border-primary dark:focus-visible:border-primary [&_svg]:shrink-0 [&_svg]:pointer-events-none [&_svg]:size-4 " +
    focusRing,
  {
    variants: {
      variant: {
        default: "text-neutral-100 bg-primary/75 border-primary",
        outline:
          "text-neutral-500 dark:text-neutral-500 border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-900",
        ghost:
          "opacity-50 text-neutral-500 dark:text-neutral-500 border-transparent",
        destructive:
          "text-destructive dark:text-neutral-100 border-destructive/50 dark:border-destructive/50 bg-destructive/25 dark:bg-destructive/25 focus-visible:border-destructive/50 dark:focus-visible:border-destructive/50",
        link: "text-primary bg-stone-100 dark:bg-stone-925",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        disabled: false,
        className: "focus-visible:bg-primary/80",
      },
      {
        variant: "outline",
        disabled: false,
        className: ["dark:focus-visible:bg-stone-800"].join(" "),
      },
      {
        variant: "ghost",
        disabled: false,
        className: [
          "focus-visible:opacity-100 focus-visible:border-primary dark:focus-visible:border-primary focus-visible:bg-stone-125 dark:focus-visible:bg-stone-800",
        ].join(" "),
      },
      {
        variant: "destructive",
        disabled: false,
        className: [
          "focus-visible:border-destructive dark:focus-visible:border-destructive",
        ].join(" "),
      },
    ],
    defaultVariants: {
      variant: "default",
      disabled: false,
    },
  },
);

export const linkVariants = cva(
  cn(
    "w-fit text-sm inline-flex rounded transition-all duration-300",
    focusRing,
  ),
  {
    variants: {
      variant: {
        internal:
          "font-bold text-neutral-500 dark:text-neutral-500 no-underline",
        external: "font-bold text-primary/75 underline underline-offset-2",
        markdown:
          "border text-base font-medium rounded-lg px-1 py-0.5 bg-stone-200 dark:bg-stone-900 text-primary/75 duration-300 italic underline underline-offset-2 focus-visible:border-primary dark:focus-visible:border-primary",
        button:
          "w-full flex items-center justify-center h-10.5 no-underline text-neutral-500 bg-stone-200 dark:bg-stone-900 border border-transparent border-stone-300 focus-visible:border-primary dark:border-stone-700 focus-visible:border-primary dark:focus-visible:border-primary",
      },
    },
    defaultVariants: {
      variant: "external",
    },
  },
);

export const alertVariants = cva(
  "border w-full text-left text-xs p-4 rounded bg-linear-90 from-5% to-90% not-dark:shadow",
  {
    variants: {
      variant: {
        default:
          "[&_p]:text-neutral-900 dark:[&_p]:text-neutral-300 [&_svg]:stroke-neutral-900 dark:[&_svg]:stroke-neutral-100 from-neutral-300/30 to-neutral-300/10 dark:from-neutral-700/30 dark:to-neutral-600/10",
        info: "[&_p]:text-blue-900 dark:[&_p]:text-neutral-300 border-informative/50 [&_svg]:stroke-blue-900 dark:[&_svg]:stroke-neutral-100 from-informative/25 to-informative/5",
        warn: "[&_p]:text-yellow-900 dark:[&_p]:text-neutral-100 border-warning/50 [&_svg]:stroke-yellow-900 dark:[&_svg]:stroke-neutral-100 from-warning/25 to-warning/5",
        success:
          "[&_p]:text-emerald-900 dark:[&_p]:text-neutral-300 border-success/50 [&_svg]:stroke-emerald-900 dark:[&_svg]:stroke-neutral-100 from-success/25 to-success/5",
        alert:
          "[&_p]:text-rose-900 dark:[&_p]:text-neutral-300 border-destructive/50 [&_svg]:stroke-rose-900 dark:[&_svg]:stroke-neutral-100 from-destructive/25 to-destructive/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

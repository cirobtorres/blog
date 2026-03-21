import clsx from "clsx";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

type ClassValue = string | number | null | undefined | boolean;

const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-3 dark:focus-visible:ring-2 focus-visible:ring-stone-900/25 dark:focus-visible:ring-stone-100 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 focus-visible:border-primary dark:focus-visible:border-primary";

const hoverRing =
  "hover:outline-none hover:ring-3 dark:hover:ring-2 hover:ring-stone-900/25 dark:hover:ring-stone-100 hover:ring-offset-2 hover:ring-offset-neutral-950";

const focusRingOTPGroup =
  "outline-none has-aria-invalid:outline-none has-aria-invalid:ring-2 has-aria-invalid:ring-destructive has-aria-invalid:ring-offset-2 has-aria-invalid:ring-offset-stone-900 has-aria-invalid:bg-destructive/15";

const focusRingOTPSlot =
  "data-[active=true]:outline-none data-[active=true]:z-10 data-[active=true]:ring-3 data-[active=true]:ring-offset-2 data-[active=true]:ring-stone-900/25 data-[active=true]:ring-offset-stone-950 dark:data-[active=true]:ring-2 dark:data-[active=true]:ring-stone-100 dark:data-[active=true]:ring-offset-stone-900";

const focusWithinRing =
  "focus-within:outline-none focus-within:ring-3 dark:focus-within:ring-2 focus-within:ring-stone-900/25 dark:focus-within:ring-stone-100 focus-within:ring-offset-2 focus-within:ring-offset-stone-950 focus-within:border-primary dark:focus-within:border-primary";

const buttonVariants = cva(
  "border cursor-pointer disabled:cursor-not-allowed rounded bg-clip-padding text-sm font-medium [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all duration-300 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none h-10.5 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 not-dark:shadow focus-visible:border-primary dark:focus-visible:border-primary " +
    focusRing,
  {
    variants: {
      variant: {
        default:
          "text-neutral-100 bg-primary/65 border-primary hover:bg-primary/80",
        outline:
          "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 bg-stone-200 dark:bg-stone-900 hover:bg-stone-300 dark:hover:bg-stone-800 dark:hover:text-neutral-100 hover:border-stone-400 dark:hover:border-stone-600",
        ghost:
          "opacity-50 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-stone-400 dark:hover:border-stone-600 hover:bg-stone-300 dark:hover:bg-stone-800",
        destructive:
          "border-destructive/50 dark:border-destructive/50 bg-destructive/25 dark:bg-destructive/25 hover:border-destructive/75 dark:hover:border-destructive/75 hover:bg-destructive/30 dark:hover:bg-destructive/30 focus-visible:border-destructive dark:focus-visible:border-destructive",
        link: "text-primary bg-stone-200 dark:bg-stone-925 hover:border-stone-400 dark:hover:bg-stone-900 dark:hover:border-stone-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const linkVariants = cva(
  cn(
    "w-fit text-sm inline-flex rounded transition-all duration-300",
    focusRing,
  ),
  {
    variants: {
      variant: {
        internal:
          "font-bold text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 no-underline",
        external:
          "font-bold text-primary/75 hover:text-primary dark:hover:text-primary underline underline-offset-2",
        markdown:
          "border text-base font-medium rounded-lg px-1 py-0.5 bg-stone-200 dark:bg-stone-900 text-primary/75 hover:text-primary duration-300 italic underline underline-offset-2 focus-visible:border-primary dark:focus-visible:border-primary",
        button:
          "w-full flex items-center justify-center h-10.5 no-underline text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-400 bg-stone-200 dark:bg-stone-900 border border-transparent border-stone-300 hover:border-stone-400 focus-visible:border-primary dark:border-stone-700 dark:hover:border-stone-600 focus-visible:border-primary dark:focus-visible:border-primary",
      },
    },
    defaultVariants: {
      variant: "external",
    },
  },
);

const alertVariants = cva(
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

export {
  cn,
  focusRing,
  hoverRing,
  focusRingOTPGroup,
  focusRingOTPSlot,
  focusWithinRing,
  buttonVariants,
  linkVariants,
  alertVariants,
};

import clsx from "clsx";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

type ClassValue = string | number | null | undefined | boolean;

const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-neutral-100 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black";

const focusRingOTPGroup =
  "outline-none has-aria-invalid:outline-none has-aria-invalid:ring-2 has-aria-invalid:ring-destructive has-aria-invalid:ring-offset-2 has-aria-invalid:ring-offset-black has-aria-invalid:bg-destructive/15";

const focusRingOTPSlot =
  "outline-none data-[active=true]:outline-none data-[active=true]:z-10 data-[active=true]:ring-2 data-[active=true]:ring-offset-2 data-[active=true]:ring-black data-[active=true]:ring-offset-white dark:data-[active=true]:ring-neutral-100 dark:data-[active=true]:ring-offset-black";

const inputBorder =
  "border not-disabled:hover:text-neutral-400 not-disabled:hover:border-border-accent not-disabled:focus-visible:text-neutral-400 not-disabled:focus-visible:border-border-accent bg-neutral-900 focus-visible:[&_svg]:stroke-neutral-400";

const buttonVariants = cva(
  "cursor-pointer disabled:cursor-not-allowed rounded bg-clip-padding text-sm font-medium [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all duration-300 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none h-10.5 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 " +
    focusRing,
  {
    variants: {
      variant: {
        default:
          "bg-primary border border-transparent disabled:bg-primary/50 text-primary-foreground [a]:hover:bg-primary/80",
        outline:
          "text-muted-foreground hover:not-disabled:text-foreground disabled:text-muted-foreground/50 disabled:border-muted-foreground/40 disabled:bg-neutral-800 " +
          inputBorder,
        secondary:
          "bg-secondary border border-transparent text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "border border-transparent hover:bg-muted hover:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/20 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/30",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const linkVariants = cva(
  cn(
    "w-fit text-sm font-sans rounded-xs transition-[border,color,box-shadow,background] duration-300",
    focusRing,
  ),
  {
    variants: {
      variant: {
        title: "font-bold text-xl text-foreground no-underline",
        internal:
          "font-bold text-muted-foreground hover:text-foreground no-underline",
        external:
          "font-bold text-muted-foreground hover:text-foreground underline underline-offset-2",
        button:
          "w-full flex items-center justify-center h-10.5 no-underline text-muted-foreground bg-muted hover:text-foreground dark:bg-card dark:hover:text-foreground border dark:hover:border-border-accent",
      },
    },
    defaultVariants: {
      variant: "external",
    },
  },
);

export {
  cn,
  focusRing,
  focusRingOTPGroup,
  focusRingOTPSlot,
  inputBorder,
  buttonVariants,
  linkVariants,
};

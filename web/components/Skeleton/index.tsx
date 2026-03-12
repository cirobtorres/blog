import { cn } from "../../utils/variants";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "animate-skeleton rounded-sm",
        // Light Mode: Stone-200
        "bg-stone-200 [background:linear-gradient(120deg,transparent_40%,rgba(255,255,255,0.6)_50%,transparent_60%)_#e7e5e4_0_0/200%_100%_fixed]",
        // Dark Mode: Stone-800
        "dark:bg-stone-800 dark:[background:linear-gradient(120deg,transparent_40%,rgba(255,255,255,0.04)_50%,transparent_60%)_#292524_0_0/200%_100%_fixed]",
        className,
      )}
      data-slot="skeleton"
      {...props}
    />
  );
}

export { Skeleton };

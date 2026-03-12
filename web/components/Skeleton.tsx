import { cn } from "../utils/variants";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "animate-skeleton rounded-sm",
        "bg-container [background:linear-gradient(120deg,transparent_40%,rgba(255,255,255,0.6)_50%,transparent_60%)_#e7e5e4_0_0/200%_100%_fixed]",
        "dark:bg-container dark:[background:linear-gradient(120deg,transparent_40%,rgba(255,255,255,0.04)_50%,transparent_60%)_#292524_0_0/200%_100%_fixed]",
        className,
      )}
      data-slot="skeleton"
      {...props}
    />
  );
}

export { Skeleton };

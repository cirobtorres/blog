import { cn } from "../../../utils/className";

export function P({
  children,
  className,
  ...props
}: React.ComponentProps<"p"> & {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      {...props}
      className={cn("font-sans text-black dark:text-neutral-500", className)}
    >
      {children}
    </p>
  );
}

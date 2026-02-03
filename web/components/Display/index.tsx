import { cn } from "../../utils/className";

export function Grid({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & { children: React.ReactNode }) {
  return (
    <div
      {...props}
      className={cn(
        "h-full min-h-screen grid grid-rows-[60px_1fr_80px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Flex({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & { children: React.ReactNode }) {
  return (
    <div
      {...props}
      className={cn("h-full min-h-screen flex flex-col", className)}
    >
      {children}
    </div>
  );
}

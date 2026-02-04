import { cn } from "../../utils/className";

// Header + Main + Footer
export function WebGrid({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children: React.ReactNode;
  className?: string;
}) {
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

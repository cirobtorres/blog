import { ReactNode } from "react";
import { cn } from "../../utils/className";

export function Main({
  children,
  className,
  ...props
}: React.ComponentProps<"main"> & { children: ReactNode }) {
  return (
    <main
      {...props}
      className={cn("w-full max-w-360 mx-auto px-6 my-8", className)}
    >
      {children}
    </main>
  );
}

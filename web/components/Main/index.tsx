import { ReactNode } from "react";
import { cn } from "../../utils/className";

export function Main({
  children,
  className,
  ...props
}: React.ComponentProps<"main"> & { children: ReactNode }) {
  return (
    <div className="px-6 my-8">
      <main {...props} className={cn("w-full max-w-360 mx-auto", className)}>
        {children}
      </main>
    </div>
  );
}

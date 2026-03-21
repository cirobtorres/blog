import React from "react";
import { cn } from "../utils/variants";

export function DashedBackground({
  className,
  ...props
}: React.ComponentProps<"div"> & { className?: string }) {
  return (
    <div
      className={cn(
        "w-full h-full shrink-0 bg-fixed bg-[repeating-linear-gradient(315deg,#d6d3d1_0,#d6d3d1_1px,transparent_0,transparent_50%)] dark:bg-[repeating-linear-gradient(315deg,#292524_0,#292524_1px,transparent_0,transparent_50%)] bg-size-[10px_10px]",
        className,
      )}
      {...props}
    />
  );
}

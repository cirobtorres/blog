"use client";

import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";

import { CheckIcon } from "lucide-react";
import { cn, focusRing } from "../../utils/className";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "relative shrink-0 outline-none border hover:border-border-accent bg-input/30 transition-[border,box-shadow] duration-300 flex size-4 items-center justify-center rounded group-has-disabled/field:opacity-50 focus-visible:ring-3 peer",
        "data-checked:bg-primary data-checked:text-primary-foreground data-checked:border-primary",
        "after:absolute after:-inset-x-3 after:-inset-y-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:aria-checked:border-primary aria-invalid:aria-checked:bg-primary aria-invalid:border-destructive aria-invalid:bg-destructive/25",
        focusRing,
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="[&>svg]:size-3.5 grid place-content-center text-current transition-none"
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };

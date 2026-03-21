"use client";

import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";

import { CheckIcon } from "lucide-react";
import { cn, focusRing } from "../../../utils/variants";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "relative flex size-4 items-center justify-center rounded shrink-0 outline-none not-dark:shadow border bg-stone-200 dark:bg-stone-800 border-stone-300 dark:border-stone-700 hover:bg-stone-250 dark:hover:bg-stone-750 hover:border-stone-400 dark:hover:border-stone-600 data-checked:hover:bg-primary dark:data-checked:hover:bg-primary hover:data-checked:border-primary dark:data-checked:hover:border-primary data-checked:bg-primary data-checked:border-primary data-checked:text-neutral-100 transition-all duration-300 after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:aria-checked:border-primary aria-invalid:aria-checked:bg-primary aria-invalid:not-aria-checked:border-destructive/50 aria-invalid:bg-destructive/25 peer group-has-disabled/field:opacity-50",
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

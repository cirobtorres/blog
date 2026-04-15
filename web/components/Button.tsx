import { Slot } from "radix-ui";
import { buttonVariants, cn } from "../utils/variants";

export function Button({
  className,
  variant = "default",
  asChild = false,
  ...props
}: BlogButton) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  );
}

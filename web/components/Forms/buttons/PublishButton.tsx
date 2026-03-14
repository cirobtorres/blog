import { cn } from "../../../utils/variants";
import { Button } from "../../Buttons";

export function PublishButton({
  label,
  className,
  action,
  ...props
}: {
  label: string;
  className?: string;
  action: () => void;
}) {
  return (
    <Button
      formAction={action}
      type="submit"
      className={cn("w-full", className)}
      {...props}
    >
      {label}
    </Button>
  );
}

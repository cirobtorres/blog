import { cn } from "../../../utils/variants";
import { Button } from "../../Buttons";
import Spinner from "../../Spinner";

export function PublishButton({
  label,
  className,
  action,
  ...props
}: React.ComponentProps<"button"> & {
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
      {props.disabled && <Spinner />} {label}
    </Button>
  );
}

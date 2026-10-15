import { cn } from "../../../../utils/variants";

const Row = ({
  children,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> & { className?: string }) => (
  <div
    className={cn(
      "w-full flex flex-row justify-center items-center",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

const Col = ({
  children,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> & { className?: string }) => (
  <div className={cn("w-full", className)} {...props}>
    {children}
  </div>
);

export { Row, Col };

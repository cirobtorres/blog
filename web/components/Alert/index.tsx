import { VariantProps } from "class-variance-authority";
import { alertVariants, cn } from "../../utils/variants";

const AlertWrapper = ({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) => {
  return (
    <div
      data-slot="variant"
      role="variant"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
};

const AlertTitle = ({ className, ...props }: React.ComponentProps<"p">) => (
  <p className={cn("font-bold", className)} {...props} />
);

const AlertDescription = ({
  className,
  ...props
}: React.ComponentProps<"p">) => {
  return <p className={cn("font-medium", className)} {...props} />;
};

const Alert = ({
  title,
  children,
  variant,
  className,
}: { title: string; children: string; className?: string } & VariantProps<
  typeof alertVariants
>) => {
  switch (variant) {
    case "info":
      return (
        <AlertWrapper
          variant={variant}
          className={cn(
            "grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 [&_svg]:size-4",
            className,
          )}
        >
          <AlertInfoIcon />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription className="row-start-2 col-start-2">
            {children}
          </AlertDescription>
        </AlertWrapper>
      );
    case "warn":
      return (
        <AlertWrapper
          variant={variant}
          className={cn(
            "grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 [&_svg]:size-4",
            className,
          )}
        >
          <AlertInfoIcon />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription className="row-start-2 col-start-2">
            {children}
          </AlertDescription>
        </AlertWrapper>
      );
    case "alert":
      return (
        <AlertWrapper
          variant={variant}
          className={cn(
            "grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 [&_svg]:size-4",
            className,
          )}
        >
          <AlertInfoIcon />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription className="row-start-2 col-start-2">
            {children}
          </AlertDescription>
        </AlertWrapper>
      );
    case "success":
      return (
        <AlertWrapper
          variant={variant}
          className={cn(
            "grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 [&_svg]:size-4",
            className,
          )}
        >
          <AlertSuccessIcon />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription className="row-start-2 col-start-2">
            {children}
          </AlertDescription>
        </AlertWrapper>
      );
    default:
      return (
        <AlertWrapper
          variant={variant}
          className={cn(
            "grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 [&_svg]:size-4",
            className,
          )}
        >
          <AlertInfoIcon />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription className="row-start-2 col-start-2">
            {children}
          </AlertDescription>
        </AlertWrapper>
      );
  }
};

const AlertInfoIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

const AlertSuccessIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export { Alert };

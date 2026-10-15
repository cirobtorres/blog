import { VariantProps } from "class-variance-authority";
import { alertVariants, cn } from "../utils/variants";
import { AlertInfoIcon, AlertSuccessIcon } from "./Icons";

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
}: React.ComponentProps<"div">) => {
  return <div className={cn("font-medium", className)} {...props} />;
};

const alWraClasses = "grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 [&_svg]:size-4";

const alDesClasses =
  "row-start-2 col-start-2 [&_h2_svg]:size-6 [&_h3_svg]:size-6 [&_h4_svg]:size-6";

const Alert = ({
  title,
  children,
  variant,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
} & VariantProps<typeof alertVariants>) => {
  switch (variant) {
    case "info":
      return (
        <AlertWrapper variant={variant} className={cn(alWraClasses, className)}>
          <AlertInfoIcon />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription className={alDesClasses}>
            {children}
          </AlertDescription>
        </AlertWrapper>
      );
    case "warn":
      return (
        <AlertWrapper variant={variant} className={cn(alWraClasses, className)}>
          <AlertInfoIcon />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription className={alDesClasses}>
            {children}
          </AlertDescription>
        </AlertWrapper>
      );
    case "alert":
      return (
        <AlertWrapper variant={variant} className={cn(alWraClasses, className)}>
          <AlertInfoIcon />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription className={alDesClasses}>
            {children}
          </AlertDescription>
        </AlertWrapper>
      );
    case "success":
      return (
        <AlertWrapper variant={variant} className={cn(alWraClasses, className)}>
          <AlertSuccessIcon />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription className={alDesClasses}>
            {children}
          </AlertDescription>
        </AlertWrapper>
      );
    default:
      return (
        <AlertWrapper variant={variant} className={cn(alWraClasses, className)}>
          <AlertInfoIcon />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription className={alDesClasses}>
            {children}
          </AlertDescription>
        </AlertWrapper>
      );
  }
};

export { Alert };

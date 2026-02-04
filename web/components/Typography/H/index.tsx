import { cn } from "../../../utils/className";

export function H1({
  children,
  className,
  ...props
}: React.ComponentProps<"h1"> & {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      {...props}
      className={cn(
        "text-3xl lg:text-5xl font-semibold text-black dark:text-neutral-100",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function H2({
  children,
  className,
  ...props
}: React.ComponentProps<"h2"> & {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      {...props}
      className={cn(
        "text-lg lg:text-2xl font-semibold text-black dark:text-neutral-100",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function H3({
  children,
  className,
  ...props
}: React.ComponentProps<"h3"> & {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      {...props}
      className={cn(
        "text-xl font-semibold text-black dark:text-neutral-100",
        className,
      )}
    >
      {children}
    </h3>
  );
}

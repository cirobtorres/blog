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
    <div className="mb-8">
      <h1
        {...props}
        className={cn(
          "text-5xl text-black dark:text-neutral-100 font-semibold",
          className,
        )}
      >
        {children}
      </h1>
    </div>
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
    <div className="mb-3 pb-3">
      <h2
        {...props}
        className={cn(
          "text-3xl text-black dark:text-neutral-100 font-semibold",
          className,
        )}
      >
        {children}
      </h2>
    </div>
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
    <div className="mb-3 pb-3">
      <h3
        {...props}
        className={cn(
          "text-2xl text-black dark:text-neutral-100 font-semibold",
          className,
        )}
      >
        {children}
      </h3>
    </div>
  );
}

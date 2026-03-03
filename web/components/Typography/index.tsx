import { cn } from "../../utils/className";

export function H2({
  className,
  ...props
}: React.ComponentProps<"h2"> & { className?: string }) {
  return (
    <h2
      {...props}
      className={cn(
        "text-lg lg:text-2xl font-semibold text-foreground scroll-m-20 tracking-tight text-balance not-first:mt-6",
        className,
      )}
    />
  );
}

export function H3({
  className,
  ...props
}: React.ComponentProps<"h3"> & { className?: string }) {
  return (
    <h3
      {...props}
      className={cn(
        "text-lg lg:text-2xl font-semibold text-foreground scroll-m-20 tracking-tight not-first:mt-6",
        className,
      )}
    />
  );
}

export function H4({
  className,
  ...props
}: React.ComponentProps<"h4"> & { className?: string }) {
  return (
    <h4
      {...props}
      className={cn(
        "text-lg lg:text-2xl font-semibold text-foreground scroll-m-20 tracking-tight not-first:mt-6",
        className,
      )}
    />
  );
}

export function H5({
  className,
  ...props
}: React.ComponentProps<"h5"> & { className?: string }) {
  return (
    <h5
      {...props}
      className={cn(
        "text-lg lg:text-2xl font-semibold text-foreground scroll-m-20 tracking-tight not-first:mt-6",
        className,
      )}
    />
  );
}

export function H6({
  className,
  ...props
}: React.ComponentProps<"h6"> & { className?: string }) {
  return (
    <h6
      {...props}
      className={cn(
        "text-lg lg:text-2xl font-semibold text-foreground scroll-m-20 tracking-tight not-first:mt-6",
        className,
      )}
    />
  );
}

export function P({
  className,
  ...props
}: React.ComponentProps<"p"> & { className?: string }) {
  return (
    <p
      {...props}
      className={cn(
        "text-base font-normal font-sans leading-7 not-first:mt-6 text-black dark:text-neutral-400",
        className,
      )}
    />
  );
}

export function Blockquote({
  className,
  ...props
}: React.ComponentProps<"blockquote"> & { className?: string }) {
  return (
    <blockquote
      {...props}
      className={cn(
        "border-l-2 pl-6 not-first:mt-6 italic text-black dark:text-neutral-400",
        className,
      )}
    />
  );
}

export function Ul({
  className,
  ...props
}: React.ComponentProps<"ul"> & { className?: string }) {
  return (
    <ul
      {...props}
      className={cn("not-first:mt-6 ml-6 list-disc [&>li]:mt-4", className)}
    />
  );
}

export function Ol({
  className,
  ...props
}: React.ComponentProps<"ol"> & { className?: string }) {
  return (
    <ol
      {...props}
      className={cn("not-first:mt-6 ml-6 list-decimal [&>li]:mt-4", className)}
    />
  );
}

export function Li({
  className,
  ...props
}: React.ComponentProps<"li"> & { className?: string }) {
  return (
    <li
      {...props}
      className={cn("text-black dark:text-neutral-400", className)}
    />
  );
}

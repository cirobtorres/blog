import NextLink from "next/link";
import { cn, linkVariants } from "../../utils/variants";

export function Link({
  children,
  href,
  variant = "internal",
  className,
  ...props
}: ExternalLinkProps) {
  return (
    <NextLink
      {...props}
      href={href}
      data-variant={variant}
      target={
        props.target
          ? props.target
          : variant === "external"
            ? "_blank"
            : undefined
      }
      className={cn(
        variant === "external" && "inline-flex",
        linkVariants({ variant }),
        className,
      )}
    >
      {children}
      {variant === "external" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
      )}
    </NextLink>
  );
}

Link.displayName = "Link";

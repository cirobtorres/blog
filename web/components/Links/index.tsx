import NextLink from "next/link";
import { cn, linkVariants } from "../../utils/variants";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../HoverCard";

export function Link({
  children,
  href,
  variant = "internal",
  className,
  ...props
}: ExternalLinkProps) {
  const isHrefExternal = href.startsWith("https");

  if (isHrefExternal)
    return (
      <HoverCard>
        <HoverCardTrigger asChild className="inline-flex">
          <NextLink
            {...props}
            href={href}
            data-variant="external"
            target="_blank"
            className={cn(linkVariants({ variant }), className)}
          >
            {children}
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
          </NextLink>
        </HoverCardTrigger>
        <HoverCardContent>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            {href}
          </p>
        </HoverCardContent>
      </HoverCard>
    );

  return (
    <NextLink
      {...props}
      href={href}
      data-variant={variant}
      className={cn(linkVariants({ variant }), className)}
    >
      {children}
    </NextLink>
  );
}

Link.displayName = "Link";

import Link from "next/link";
import { ComponentPropsWithRef } from "react";
import { cn, linkVariants } from "../../../utils/className";

interface ExternalLinkProps extends ComponentPropsWithRef<typeof Link> {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export function A({ children, href, className, ...props }: ExternalLinkProps) {
  const external = href.startsWith("http") || href.startsWith("https");
  return (
    <Link
      {...props}
      href={href}
      target={props.target ? props.target : external ? "_blank" : undefined}
      className={cn(linkVariants(), external && "inline-flex", className)}
    >
      {children}
      {external && (
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
          className="lucide lucide-arrow-up-right-icon lucide-arrow-up-right"
        >
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
      )}
    </Link>
  );
}

A.displayName = "A";

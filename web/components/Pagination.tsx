import * as React from "react";

import { cn } from "../utils/variants";
import { Button } from "./Buttons";
import Link from "next/link";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("gap-0.5 flex items-center", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & React.ComponentProps<typeof Button> &
  React.ComponentProps<typeof Link>;

function PaginationLink({
  className,
  isActive,
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      asChild
      variant={isActive ? "outline" : "ghost"}
      className={cn("h-8", className)}
    >
      <Link
        aria-current={isActive ? "page" : undefined}
        data-slot="pagination-link"
        data-active={isActive}
        {...props}
      />
    </Button>
  );
}

function PaginationPrevious({
  className,
  text = "Voltar",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Navegar para página anterior"
      className={cn("pl-1.5!", className)}
      {...props}
    >
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
        className="inline-start cn-rtl-flip"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  text = "Próxima",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Navegar para próxima página"
      className={cn("pr-1.5!", className)}
      {...props}
    >
      <span className="hidden sm:block">{text}</span>
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
        className="inline-end cn-rtl-flip"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "size-8 [&_svg:not([class*='size-'])]:size-4 flex items-center justify-center",
        className,
      )}
      {...props}
    >
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
      >
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
      </svg>
      <span className="sr-only">More pages</span>
    </span>
  );
}

const HomePagination = () => (
  <div className="mx-auto w-full flex justify-center items-center gap-4 my-6">
    <div className="flex items-center text-sm text-neutral-500 px-2 py-1 border rounded bg-stone-200 dark:bg-stone-900">
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
        className="size-4 inline-start"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>{" "}
      Anterior
    </div>
    <div className="text-sm text-neutral-500">Página 2 de 39</div>
    <div className="flex items-center text-sm text-neutral-500 px-2 py-1 border rounded bg-stone-200 dark:bg-stone-900">
      Próxima{" "}
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
        className="size-4 inline-end"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </div>
    <div className="text-sm text-neutral-500 px-2 py-1 border rounded bg-stone-200 dark:bg-stone-900">
      Última
    </div>
  </div>
);

export {
  HomePagination,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};

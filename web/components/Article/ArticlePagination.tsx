"use client";

import { useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../Pagination";
import { cn } from "../../utils/variants";

export default function ArticlePagination({ number, totalPages }: Pagination) {
  const searchParams = useSearchParams();
  const currentPage = number;
  const displayPage = currentPage + 1;
  const isFirst = currentPage === 0;
  const isLast = currentPage >= totalPages - 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  const generatePages = () => {
    const items: (number | string)[] = [];
    if (totalPages <= 1) return items;

    items.push(1);

    if (displayPage > 3) {
      items.push("ellipsis-start");
    }

    const start = Math.max(2, displayPage - 1);
    const end = Math.min(totalPages - 1, displayPage + 1);

    for (let i = start; i <= end; i++) {
      items.push(i);
    }

    if (displayPage < totalPages - 2) {
      items.push("ellipsis-end");
    }

    if (totalPages > 1 && !items.includes(totalPages)) {
      items.push(totalPages);
    }

    return items;
  };

  const pageItems = generatePages();

  return (
    totalPages > 1 && (
      <Pagination>
        <PaginationContent className="my-6 gap-1">
          <PaginationItem>
            <PaginationPrevious
              href={createPageURL(currentPage - 1)}
              tabIndex={isFirst ? -1 : 0}
              disabled={isFirst}
              aria-disabled={isFirst}
              onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                if (isFirst) {
                  e.preventDefault();
                }
              }}
              className={cn(
                "w-24 rounded-lg",
                isFirst && "pointer-events-none opacity-25",
              )}
            />
          </PaginationItem>
          {pageItems.map((item, index) => {
            if (typeof item === "string") {
              return (
                <PaginationItem key={`${item}-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            return (
              <PaginationItem key={item}>
                <PaginationLink
                  href={createPageURL(item - 1)}
                  className="rounded-lg size-8"
                  isActive={displayPage === item}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationNext
              href={createPageURL(currentPage + 1)}
              tabIndex={isLast ? -1 : 0}
              disabled={isLast}
              aria-disabled={isLast}
              onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                if (isLast) {
                  e.preventDefault();
                }
              }}
              className={cn(
                "w-24 rounded-lg",
                isLast && "pointer-events-none opacity-25",
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  );
}

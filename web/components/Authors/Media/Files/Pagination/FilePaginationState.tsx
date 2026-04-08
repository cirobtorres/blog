"use client";

import { useArticleStore } from "../../../../../zustand-store/article-state";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../../Pagination";
import { cn } from "../../../../../utils/variants";

export default function FilePaginationState({
  totalPages,
}: {
  totalPages: number;
}) {
  const { currentModalPage, setModalPage } = useArticleStore();

  const currentPage = currentModalPage;
  const displayPage = currentPage + 1;
  const isFirst = currentPage === 0;
  const isLast = currentPage >= totalPages - 1;

  const generatePages = () => {
    const items: (number | string)[] = [];
    if (totalPages <= 1) return items;

    items.push(1);
    if (displayPage > 3) items.push("ellipsis-start");

    const start = Math.max(2, displayPage - 1);
    const end = Math.min(totalPages - 1, displayPage + 1);

    for (let i = start; i <= end; i++) items.push(i);

    if (displayPage < totalPages - 2) items.push("ellipsis-end");
    if (totalPages > 1 && !items.includes(totalPages)) items.push(totalPages);

    return items;
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent className="gap-1">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (!isFirst) setModalPage(currentPage - 1);
            }}
            className={cn(
              "w-24 rounded-lg cursor-pointer",
              isFirst && "opacity-25 pointer-events-none",
            )}
          />
        </PaginationItem>

        {generatePages().map((item, index) => {
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
                href="#"
                isActive={displayPage === item}
                onClick={(e) => {
                  e.preventDefault();
                  setModalPage(item - 1);
                }}
                className="rounded-lg size-8 cursor-pointer"
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (!isLast) setModalPage(currentPage + 1);
            }}
            className={cn(
              "w-24 rounded-lg cursor-pointer",
              isLast && "opacity-25 pointer-events-none",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

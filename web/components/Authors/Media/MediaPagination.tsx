import { cn } from "../../../utils/variants";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../Pagination";

export function MediaPagination({
  first,
  last,
  currentPage,
  totalPages,
}: {
  first: boolean;
  last: boolean;
  currentPage: number;
  totalPages: number;
}) {
  // Spring returns first page as zero, since these are list indexes
  const page = currentPage + 1;

  const generatePages = () => {
    const items: (number | string)[] = [];

    if (totalPages <= 1) return items;

    items.push(1);

    if (page > 3) {
      items.push("ellipsis-start");
    }

    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(totalPages - 1, page + 1);
      i++
    ) {
      items.push(i);
    }

    if (page < totalPages - 2) {
      items.push("ellipsis-end");
    }

    items.push(totalPages);

    return items;
  };

  const pageItems = generatePages();

  return (
    totalPages > 1 && (
      <Pagination>
        <PaginationContent className="my-6">
          <PaginationItem>
            <PaginationPrevious
              href={`?page=${currentPage - 1}`}
              disabled={first}
              className={cn(
                "w-24 border-none rounded-lg",
                first && "pointer-events-none opacity-50",
              )}
            />
          </PaginationItem>
          {pageItems.map((item, index) => {
            if (typeof item === "string") {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            return (
              <PaginationItem key={item}>
                <PaginationLink
                  href={`?page=${item - 1}`}
                  className="rounded-lg size-8"
                  isActive={page === item}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationNext
              href={`?page=${currentPage + 1}`}
              disabled={last}
              className={cn(
                "w-24 border-none rounded-lg",
                last && "pointer-events-none opacity-50",
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  );
}

"use server";

import { Button } from "../../../../components/Buttons";
import { Checkbox } from "../../../../components/Fieldset/Checkbox";
import { cn, focusRing } from "../../../../utils/variants";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  HomePagination,
} from "../../../../components/Pagination";
import { FolderUpIcon } from "../../../../components/Icons";
import { MediaFileCard } from "../../../../components/Authors/Media/MediaFileCard";
import { apiServerUrls } from "../../../../config/routes";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { Skeleton } from "../../../../components/Skeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/Popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/Select";

const NoCardsFoundPlaceholder = ({
  mediaResponse,
}: {
  mediaResponse: Response;
}) => (
  <div className="w-full max-w-xl mx-auto opacity-50 mt-4 min-h-80 rounded-xl border grid grid-rows-[40px_1fr] overflow-hidden">
    <div className="w-full h-full border-b flex items-center justify-start px-3 gap-2 dark:bg-stone-800">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="size-2 rounded-full dark:bg-white" />
      ))}
    </div>
    <div className="w-full h-full flex flex-col justify-center items-center gap-2 px-10 dark:bg-stone-900">
      <strong className="text-7xl">{mediaResponse.status}</strong>
      {mediaResponse.statusText && (
        <div className="px-10">
          <p className="text-xl text-center line-clamp-3">
            {mediaResponse.statusText}
          </p>
        </div>
      )}
    </div>
  </div>
);

const MediaFileCardsLoading = () => (
  <section className="flex flex-col items-start justify-center gap-2">
    <h2 className="text-xl flex items-center">
      Arquivos &#40;{<Skeleton className="size-6" />}&#41;
    </h2>
    <div className="flex items-center gap-2">
      <Skeleton className="w-40 h-8" />
      <Skeleton className="w-22 h-8" />
    </div>
    <div className="w-full grid grid-cols-3 items-center gap-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton
          key={index}
          className="w-full max-w-100 h-65 shrink-0 overflow-hidden rounded-lg not-dark:shadow"
        />
      ))}
    </div>
  </section>
);

export default async function AuthorsMediaPage() {
  const cookie = cookies();
  const accessToken = (await cookie).get("access_token");
  return (
    <>
      <div className="flex items-center gap-2">
        <label htmlFor="select-all">
          <Checkbox id="select-all" className="size-6" />
        </label>
        <div className="flex items-center gap-2 [&_span]:text-sm [&_span]:text-nowrap [&_span]:text-neutral-600 dark:[&_span]:text-neutral-500">
          <span>1 pasta</span>
          <span>-</span>
          <span>1 asset</span>
        </div>
        <Button variant="destructive" className="h-8 w-full max-w-30">
          Excluir
        </Button>
        <Button variant="link" className="h-8 w-full max-w-30">
          Mover
        </Button>
      </div>
      <section className="flex flex-col items-start justify-center gap-2">
        <h2 className="text-xl">Pastas &#40;7&#41;</h2>
        <div className="flex items-center gap-2">
          <MediaFoldersHeader />
        </div>
        <div className="w-full grid grid-cols-4 items-center gap-2">
          <MediaFolders />
        </div>
        <HomePagination />
      </section>
      <hr className="dark:border-stone-800" />
      <Suspense fallback={<MediaFileCardsLoading />}>
        <MediaFileCards accessToken={accessToken?.value} />
      </Suspense>
    </>
  );
}

const MediaPagination = ({
  first,
  last,
  currentPage,
  totalPages,
}: {
  first: boolean;
  last: boolean;
  currentPage: number;
  totalPages: number;
}) => {
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
};

const MediaFileCards = async ({ accessToken }: { accessToken?: string }) => {
  const mediaResponse = await fetch(apiServerUrls.media.list, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!mediaResponse.ok) {
    return <NoCardsFoundPlaceholder mediaResponse={mediaResponse} />;
  }

  const {
    content: media,
    totalElements,
    totalPages,
    first,
    last,
    number: currentPage,
    sort,
  }: MediaResponsePageable = await mediaResponse.json();

  const pageControl = {
    first,
    last,
    currentPage,
    totalPages,
  };

  return (
    <section className="flex flex-col items-start justify-center gap-2">
      <h2 className="text-xl flex items-center">
        Arquivos &#40;{totalElements}&#41;
      </h2>
      <MediaFilesHeader sort={sort} />
      <MediaPagination {...pageControl} />
      <div className="w-full grid grid-cols-3 items-center gap-2">
        {media.map(({ ...props }) => (
          <MediaFileCard key={props.publicId} {...props} />
        ))}
      </div>
      <MediaPagination {...pageControl} />
    </section>
  );
};

const MediaFolders = () =>
  Array.from({ length: 7 }).map((_, index) => (
    <label
      key={index}
      htmlFor={"folder-" + index}
      className="relative w-full flex-1 flex shrink-0 items-center gap-2 py-2 px-3 transition-border duration-300 rounded border hover:border-primary not-dark:shadow bg-stone-200 dark:bg-stone-900 hover:bg-stone-300 dark:hover:bg-stone-800 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-stone-300 dark:has-data-[state=checked]:bg-stone-800 focus-within:border-primary dark:focus-within:border-primary focus-within:bg-stone-300 dark:focus-within:bg-stone-800 group"
    >
      <Checkbox id={"folder-" + index} />
      <FolderUpIcon
        folderId={index.toString()}
        className={cn(
          "rounded-lg p-3 transition-all duration-300 border border-stone-300 dark:border-stone-800 bg-stone-200 dark:bg-stone-925 group-hover:border-stone-400 dark:group-hover:border-stone-700 group-hover:bg-stone-300 dark:group-hover:bg-stone-900 group-focus-within:border-stone-400 dark:group-focus-within:border-stone-700 group-focus-within:bg-stone-300 dark:group-focus-within:bg-stone-900",
          focusRing,
        )}
      />
      <div className="flex flex-col gap-1">
        <p className="text-neutral-100">Nome</p>
        <p className="text-xs text-nowrap text-neutral-400">
          0 folder, 1 asset
        </p>
      </div>
      <div className="absolute top-2 right-2 flex items-center gap-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-has-data-[state=checked]:opacity-100">
        <Button variant="outline" className="size-8 not-dark:shadow-none">
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
            className=""
          >
            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
          </svg>
        </Button>
        <Button variant="outline" className="size-8 not-dark:shadow-none">
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
            className=""
          >
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </Button>
      </div>
    </label>
  ));

const MediaFoldersHeader = () => (
  <>
    <Button variant="outline" className="h-8">
      Mais recentes{" "}
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
        className=""
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </Button>
    <Button variant="outline" className="h-8">
      Filtros{" "}
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
        className=""
      >
        <path d="M2 5h20" />
        <path d="M6 12h12" />
        <path d="M9 19h6" />
      </svg>
    </Button>
  </>
);

const MediaFilesHeader = ({ sort }: { sort: MediaSort }) => (
  <div className="flex items-center gap-2">
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-40 h-8">
          Mais recentes{" "}
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
            className=""
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="rounded"></PopoverContent>
    </Popover>
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-22 h-8">
          Filtros{" "}
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
            className=""
          >
            <path d="M2 5h20" />
            <path d="M6 12h12" />
            <path d="M9 19h6" />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <Select>
          <SelectTrigger className="w-full flex-1">
            <SelectValue placeholder="createdAt" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="createdAt">createdAt</SelectItem>
            <SelectItem value="updatedAt">updatedAt</SelectItem>
            <SelectItem value="type">type</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full flex-1">
            <SelectValue placeholder="is" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="is">is</SelectItem>
            <SelectItem value="isNot">is not</SelectItem>
            <SelectItem value="isGreaterThan">is greater than</SelectItem>
            <SelectItem value="isGreaterThanOrEqualTo">
              is greater than or equal to
            </SelectItem>
            <SelectItem value="isLowerThan">is lower than</SelectItem>
            <SelectItem value="isLowerThanOrEqualTo">
              is lower than or equal to
            </SelectItem>
          </SelectContent>
        </Select>
        <Button variant="link" className="h-9.5">
          Adicionar filtros
        </Button>
      </PopoverContent>
    </Popover>
  </div>
);

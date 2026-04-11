"use server";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { slugify } from "../utils/strings-transforms";
import { convertToLargeDate } from "../utils/date";
import { cn, focusRing } from "../utils/variants";
import { serverFetch } from "../services/auth-fetch-actions";
import { apiServerUrls } from "../routing/routes";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/Pagination";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const articlesPromise = await serverFetch(apiServerUrls.article.root); // TODO: query params
  const articlesResult = await articlesPromise.json();
  const { content: articles, page }: { content: Article[]; page: Pagination } =
    articlesResult;

  return (
    <div
      className="min-h-screen grid grid-rows-[1fr_var(--height-footer)]" // grid-rows-[var(--height-header)_1fr_var(--height-footer)]
    >
      <Header className="fixed" />
      <main className="mt-height-header">
        <div className="bg-[radial-gradient(circle,rgba(0,0,0,0.10),rgba(0,0,0,1)),url('https://techgage.com/wp-content/uploads/2022/09/Blender-3.3-with-OneAPI-and-Intel-Arc-GPU.jpg')] lg:col-start-1 lg:row-start-1 lg:h-150 w-full border-b aspect-video bg-cover" />
        <div className="px-4 my-6">
          <div className="w-full max-w-300 h-full mx-auto">
            <ArticlePagination {...{ ...page, searchParams }} />
            {articles.length > 0 ? (
              <ArticleCards>
                {articles.map((article: Article) => {
                  const date = new Date(article.createdAt);
                  const year = date.getFullYear();
                  const month = date.getMonth();
                  const day = date.getDay();
                  const slug = slugify(article.title);
                  return (
                    <ArticleCardLink
                      key={article.id}
                      href={`/articles/${year}/${month}/${day}/${slug}`}
                    >
                      <ArticleCard id={article.id}>
                        <ArticleCardImage
                          id={article.id}
                          src={article.media.bannerUrl}
                          alt={article.media.alt}
                        />
                        <ArticleCardDate>
                          {convertToLargeDate(new Date())}
                        </ArticleCardDate>
                        <ArticleCardTitle>{article.title}</ArticleCardTitle>
                        <ArticleCardSubtitle>
                          {article.subtitle}
                        </ArticleCardSubtitle>
                      </ArticleCard>
                    </ArticleCardLink>
                  );
                })}
              </ArticleCards>
            ) : (
              <section className="h-full flex justify-center items-center">
                <span className="font-medium text-neutral-500 pointer-events-none">
                  Nenhum artigo publicado =/
                </span>
              </section>
            )}
            <ArticlePagination {...{ ...page, searchParams }} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const ArticleCards = ({
  children,
  className,
  ...props
}: React.ComponentProps<"section"> & ArticleCardsProps) => {
  return (
    <section
      {...props}
      className={cn(
        "grid grid-cols-1 min-[480px]:grid-cols-2 min-[960px]:grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </section>
  );
};

ArticleCards.displayName = "ArticleCards";

const ArticleCard = ({ children, className, ...props }: ArticleCard) => {
  return (
    <article
      {...props}
      tabIndex={-1}
      className={cn(
        "relative w-full max-w-100 h-100 flex flex-col gap-2 p-1",
        focusRing,
        className,
      )}
    >
      {children}
    </article>
  );
};

ArticleCard.displayName = "ArticleCard";

const ArticleCardLink = ({ href, className, ...props }: ArticleCardLink) => (
  <Link
    href={href}
    {...props}
    className={cn(
      "transition-[border,box-shadow] duration-300 rounded-xl border border-transparent focus-visible:border-stone-300 dark:focus-visible:border-stone-700",
      focusRing,
      className,
    )}
  />
);

ArticleCardLink.displayName = "ArticleCardLink";

const ArticleCardImage = ({ id, src, alt, ...props }: ArticleCardImage) => (
  <div className="relative w-full h-50 rounded-xl overflow-hidden">
    <Image
      src={src ?? "https://placehold.co/1920x1080/000/fff/jpeg"}
      alt={alt ?? "Imagem " + id}
      {...props}
      fill
      className="absolute object-cover"
    />
  </div>
);

ArticleCardImage.displayName = "ArticleCardImage";

const ArticleCardDate = ({ className, ...props }: ArticleCardDate) => (
  <time
    {...props}
    className={cn(
      "px-2 text-xs text-neutral-400 dark:text-neutral-500",
      className,
    )}
  />
);

ArticleCardDate.displayName = "ArticleCardDate";

const ArticleCardTitle = ({ className, ...props }: ArticleCardTitle) => (
  <h2 {...props} className={cn("px-2 text-lg font-bold", className)} />
);

ArticleCardTitle.displayName = "ArticleCardTitle";

const ArticleCardSubtitle = ({ className, ...props }: ArticleCardSubtitle) => (
  <p {...props} className={cn("px-2 text-sm text-neutral-500", className)} />
);

ArticleCardSubtitle.displayName = "ArticleCardSubtitle";

// ---
const ArticlePagination = ({
  number,
  totalPages,
  searchParams,
}: Pagination & { searchParams?: { [key: string]: string | undefined } }) => {
  const currentPage = number;
  const displayPage = currentPage + 1;
  const isFirst = currentPage === 0;
  const isLast = currentPage >= totalPages - 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams?.toString());
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
              onClick={(e) => {
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
              onClick={(e) => {
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
};

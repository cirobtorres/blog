import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn, focusRing } from "../../utils/variants";
import { convertToLargeDate, convertToSmallDate } from "../../utils/date";

export function ArticleCards({
  children,
  className,
  ...props
}: React.ComponentProps<"section"> & ArticleCardsProps) {
  return (
    <section
      {...props}
      className={cn(
        "grid grid-cols-1 min-[625px]:grid-cols-2 min-[960px]:grid-cols-3 gap-2",
        className,
      )}
    >
      {children}
    </section>
  );
}

ArticleCards.displayName = "ArticleCards";

export function ArticleCard({ children, className, ...props }: ArticleCard) {
  return (
    <article
      {...props}
      tabIndex={-1}
      className={cn(
        "w-full max-w-156.25 h-100 flex flex-col gap-2 p-1",
        focusRing,
        className,
      )}
    >
      {children}
    </article>
  );
}

ArticleCard.displayName = "ArticleCard";

export function ArticleCardLink({
  href,
  className,
  ...props
}: ArticleCardLink) {
  return (
    <Link
      href={href}
      {...props}
      className={cn(
        // "transition-shadow duration-300 rounded-2xl border border-transparent focus-visible:border-stone-300 dark:focus-visible:border-stone-700",
        "transition-shadow duration-300 border border-stone-300 not-dark:shadow bg-stone-100 dark:border-stone-700 dark:bg-stone-900 focus-visible:border-stone-300 dark:focus-visible:border-stone-700",
        focusRing,
        className,
      )}
    />
  );
}

ArticleCardLink.displayName = "ArticleCardLink";

export function ArticleCardImage({
  src,
  alt,
  fill,
  className,
  ...props
}: ArticleCardImage) {
  return fill ? (
    <div className="relative w-full h-1/2 shrink-0 overflow-hidden">
      <Image
        src={src}
        alt={alt || ""}
        {...props}
        fill
        sizes="(max-width: 625px) 100vw, (max-width: 960px) 50vw, 33vw"
        className={cn("absolute object-cover px-2 pt-2", className)}
      />
    </div>
  ) : (
    <Image
      src={src}
      alt={alt || ""}
      {...props}
      className={cn("object-cover px-2 pt-2", className)}
    />
  );
}

ArticleCardImage.displayName = "ArticleCardImage";

export function ArticleCardDate({ children, ...props }: ArticleCardDate) {
  const smallDate = convertToSmallDate(children);
  const largeDate = convertToLargeDate(children);

  return (
    <time
      {...props}
      className={cn("px-2 text-xs text-neutral-400 dark:text-neutral-500")}
    >
      <span className="md:hidden">{smallDate}</span>
      <span className="hidden md:inline">{largeDate}</span>
    </time>
  );
}

ArticleCardDate.displayName = "ArticleCardDate";

export function ArticleCardTitle({ className, ...props }: ArticleCardTitle) {
  return (
    <h2
      {...props}
      className={cn("px-2 text-lg font-bold line-clamp-2 shrink-0", className)}
    />
  );
}

ArticleCardTitle.displayName = "ArticleCardTitle";

export function ArticleCardSubtitle({
  className,
  ...props
}: ArticleCardSubtitle) {
  return (
    <p
      {...props}
      className={cn(
        "px-2 text-sm text-neutral-500 line-clamp-3 shrink-0",
        className,
      )}
    />
  );
}

ArticleCardSubtitle.displayName = "ArticleCardSubtitle";

export function ArticleCardFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex mt-auto mr-auto mb-2 ml-0 px-2 gap-1">{children}</div>
  );
}

ArticleCardFooter.displayName = "ArticleCardFooter";

export function ArticleCardStatus({ status }: { status: ArticleStatus }) {
  const upperStatus = status.toUpperCase();

  const translateStatus = (txt: string) => {
    switch (txt) {
      case "PUBLISHED":
        return "Publicado";
      case "DRAFT":
        return "Rascunho";
      case "ARCHIVED":
        return "Arquivado";
      default:
        return "Unknown";
    }
  };

  return (
    <span
      className={cn(
        "w-fit px-2 rounded border text-[10px]",
        upperStatus === "PUBLISHED"
          ? "text-success dark:text-success border-success/50 bg-success/25"
          : "text-warning dark:text-warning border-warning/50 bg-warning/25",
      )}
    >
      {translateStatus(upperStatus)}
    </span>
  );
}

ArticleCardStatus.displayName = "ArticleCardStatus";

export function ArticleCardPendingRevision({
  hasUnpublishedChanges,
}: {
  hasUnpublishedChanges: boolean;
}) {
  return (
    hasUnpublishedChanges && (
      <span className="w-fit flex items-center text-informative dark:text-informative text-[10px] px-2 rounded border border-informative/50 bg-informative/25">
        Pendente
      </span>
    )
  );
}

ArticleCardPendingRevision.displayName = "ArticleCardPendingRevision";

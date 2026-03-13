import React from "react";
import { cn, focusRing } from "../../utils/variants";
import Image from "next/image";
import Link from "next/link";

const ArticleCardLink = ({ href, className, ...props }: ArticleCardLink) => (
  <Link
    href={href}
    {...props}
    className={cn(
      "transition-[border,box-shadow] duration-300 rounded-xl border border-transparent focus-visible:border-border",
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

const ARTICLE_CARD_CHILDREN = [
  ArticleCardLink,
  ArticleCardImage,
  ArticleCardTitle,
  ArticleCardDate,
  ArticleCardSubtitle,
];

const ArticleCard = ({ children, className, ...props }: ArticleCard) => {
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (!ARTICLE_CARD_CHILDREN.includes(child.type as ArticleCardChild)) {
        throw new Error(
          "ArticleCard accepts only children of type ArticleCardChild: ArticleCardImage, ArticleCardDate, ArticleCardTitle or ArticleCardSubtitle.",
        );
      }
    }
  });

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

const ARTICLE_CARDS_CHILDREN = [ArticleCardLink, ArticleCard];

const ArticleCards = ({
  children,
  className,
  ...props
}: React.ComponentProps<"section"> & ArticleCardsProps) => {
  React.Children.forEach(children, (child) => {
    if (
      React.isValidElement(child) &&
      !ARTICLE_CARDS_CHILDREN.includes(child.type as ArticleCardsChild)
    ) {
      throw new Error(
        "ArticleCards accepts only children of type ArticleCard.",
      );
    }
  });

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

export {
  ArticleCards,
  ArticleCard,
  ArticleCardLink,
  ArticleCardImage,
  ArticleCardDate,
  ArticleCardTitle,
  ArticleCardSubtitle,
};

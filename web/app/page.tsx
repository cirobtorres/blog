"use server";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { slugify } from "../utils/strings-transforms";
import { convertToLargeDate } from "../utils/date";
import { cn, focusRing } from "../utils/variants";

const articlesFromDB = Array.from({ length: 8 }).map((_, index) => {
  return {
    id: index.toString(),
    media: {
      bannerUrl: "https://placehold.co/1920x1080/000/fff/jpeg",
      altText: "Lorem ipsum dolor sit amet consectetur",
      caption: "Lorem ipsum dolor sit amet consectetur",
    },
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, error.",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod sunt aspernatur esse! Iure, quae numquam",
    commentCount: 3,
    likeCount: 1,
    status: true,
    createdAt: new Date(),
    publishedAt: new Date(),
  };
});

// const articlesFromDB: {
//   bannerUrl: string;
//   alt: string;
//   href: string;
//   title: string;
//   subTitle: string;
//   createdAt: Date;
// }[] = [];

export default async function HomePage() {
  return (
    <div
      className="min-h-screen grid grid-rows-[1fr_var(--height-footer)]" // grid-rows-[var(--height-header)_1fr_var(--height-footer)]
    >
      <Header className="fixed" />
      <main className="mt-header-height">
        <div className="bg-[radial-gradient(circle,rgba(0,0,0,0.10),rgba(0,0,0,1)),url('https://techgage.com/wp-content/uploads/2022/09/Blender-3.3-with-OneAPI-and-Intel-Arc-GPU.jpg')] lg:col-start-1 lg:row-start-1 lg:h-150 w-full border-b aspect-video bg-cover" />
        <div className="px-4 my-6">
          <div className="w-full max-w-300 h-full mx-auto">
            {/* <HomePagination /> */}
            {articlesFromDB.length > 0 ? (
              <ArticleCards>
                {articlesFromDB.map((props) => {
                  const year = props.createdAt.getFullYear();
                  const month = props.createdAt.getMonth();
                  const day = props.createdAt.getDay();
                  const slug = slugify(props.title);
                  return (
                    <ArticleCardLink
                      key={props.id}
                      href={`/articles/${year}/${month}/${day}/${slug}`}
                    >
                      <ArticleCard id={props.id}>
                        <ArticleCardImage id={props.id} />
                        <ArticleCardDate>
                          {convertToLargeDate(new Date())}
                        </ArticleCardDate>
                        <ArticleCardTitle>{props.title}</ArticleCardTitle>
                        <ArticleCardSubtitle>
                          {props.subtitle}
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
            {/* <HomePagination /> */}
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

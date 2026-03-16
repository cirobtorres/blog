import Image from "next/image";
import React from "react";
import { cn, focusRing } from "../../../utils/variants";
import Link from "next/link";

const AuthorsArticleCards = ({
  className,
  ...props
}: React.ComponentProps<"section"> & { className?: string }) => (
  <section {...props} className={cn("grid grid-cols-1 gap-2", className)} />
);

const AuthorsArticleCard = ({
  className,
  ...props
}: React.ComponentProps<"article"> & { className?: string }) => (
  <article
    {...props}
    className={cn(
      "relative w-full p-1 h-20 grid grid-cols-[80px_1fr] gap-2 items-center justify-center",
      className,
    )}
  />
);

const AuthorsArticleCardLink = ({
  href,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Link>, "href"> & {
  href: string;
  className?: string;
}) => (
  <Link
    href={href}
    {...props}
    className={cn(
      "border rounded overflow-hidden transition-shadow duration-300 bg-stone-200 dark:bg-stone-900",
      focusRing,
      className,
    )}
  />
);

const AuthorsArticleCardImage = ({
  id,
  src,
  alt,
  ...props
}: Omit<React.ComponentProps<typeof Image>, "src" | "alt"> & {
  id: string;
  src?: string;
  alt?: string;
}) => (
  <div className="relative h-full">
    <Image
      src={src ?? "https://picsum.photos/400/320?grayscale"}
      alt={alt ?? "Imagem " + id}
      {...props}
      fill
      className="absolute object-cover"
    />
  </div>
);

const AuthorsArticleDescription = ({ ...props }) => (
  <div {...props} className="flex flex-col" />
);

const AuthorsArticleCardTitle = ({ ...props }) => (
  <h2 {...props} className="text-sm line-clamp-2" />
);

const AuthorsArticleCardSubtitle = ({ ...props }) => (
  <p
    {...props}
    className="text-xs line-clamp-2 text-neutral-400 dark:text-neutral-500"
  />
);

export {
  AuthorsArticleCards,
  AuthorsArticleCard,
  AuthorsArticleCardLink,
  AuthorsArticleCardImage,
  AuthorsArticleDescription,
  AuthorsArticleCardTitle,
  AuthorsArticleCardSubtitle,
};

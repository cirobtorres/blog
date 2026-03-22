"use server";

import Image from "next/image";
import { Link } from "../../../components/Links";
import { slugify } from "../../../utils/strings-transforms";
import { cn, focusRing } from "../../../utils/variants";

const articlesFromDB = Array.from({ length: 8 }).map((_, index) => {
  const id = index.toString();
  const src = "https://placehold.co/1920x1080/000/fff/jpeg";
  const alt = "Lorem ipsum dolor sit amet consectetur";
  const title =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, error.";
  const subtitle =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod sunt aspernatur esse! Iure, quae numquam sit totam inventore nihil praesentium quo odit dolorum voluptas iste aliquid excepturi debitis eum quisquam.";
  return {
    id,
    src,
    alt,
    title,
    subtitle,
    createdAt: new Date(),
  };
});

// const articlesFromDB: {
//   src: string;
//   alt: string;
//   href: string;
//   title: string;
//   subTitle: string;
//   createdAt: Date;
// }[] = [];

export default async function AuthorsPage() {
  return (
    <div className="h-full max-w-4xl mx-auto flex justify-center items-center">
      {articlesFromDB.length > 0 ? (
        <AuthorsArticleCards>
          {articlesFromDB.map((props) => {
            const year = props.createdAt.getFullYear();
            const month = props.createdAt.getMonth();
            const day = props.createdAt.getDay();
            const slug = slugify(props.title);
            return (
              <AuthorsArticleCardLink
                key={props.id}
                href={`/articles/${year}/${month}/${day}/${slug}`}
              >
                <AuthorsArticleCard id={props.id}>
                  <AuthorsArticleCardImage
                    id={props.id}
                    src="https://placehold.co/1920x1080/000/fff/jpeg"
                  />
                  <AuthorsArticleDescription>
                    <AuthorsArticleCardTitle>
                      {props.title}
                    </AuthorsArticleCardTitle>
                    <AuthorsArticleCardSubtitle>
                      {props.subtitle}
                    </AuthorsArticleCardSubtitle>
                  </AuthorsArticleDescription>
                </AuthorsArticleCard>
              </AuthorsArticleCardLink>
            );
          })}
        </AuthorsArticleCards>
      ) : (
        <div className="h-full flex justify-center items-center">
          <span className="font-medium text-neutral-500 pointer-events-none">
            Nenhum artigo publicado =/
          </span>
        </div>
      )}
    </div>
  );
}

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

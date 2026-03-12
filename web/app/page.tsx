import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import {
  CardBody,
  CardFooter,
  CardGrid,
  CardHeader,
  CardImage,
  CardImageWrapper,
  CardWrapper,
} from "../components/Cards";
import { convertToLargeDate } from "../utils/date";
import { cn, linkVariants } from "../utils/variants";
import { slugify } from "../utils/strings-transforms";
import Link from "next/link";

const cardItems = Array.from({ length: 5 }).map(() => {
  const src = "https://placehold.co/1920x1080/000/fff/jpeg";
  const alt = "Lorem ipsum dolor sit amet consectetur";
  const title =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, error.";
  const subTitle =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod sunt aspernatur esse! Iure, quae numquam sit totam inventore nihil praesentium quo odit dolorum voluptas iste aliquid excepturi debitis eum quisquam.";
  return {
    src,
    alt,
    title,
    subTitle,
    createdAt: new Date(),
  };
});

// const cardItems: {
//   src: string;
//   alt: string;
//   href: string;
//   title: string;
//   subTitle: string;
//   createdAt: Date;
// }[] = [];

export default async function HomePage() {
  return (
    <div className="min-h-screen grid grid-rows-[var(--height-header)_1fr_var(--height-footer)]">
      <Header />
      <main className="px-6 my-6">
        <div className="w-full max-w-300 h-full mx-auto">
          {cardItems.length === 0 && (
            <div className="h-full flex justify-center items-center">
              <span className="font-medium text-neutral-500 pointer-events-none">
                Nenhum artigo publicado =/
              </span>
            </div>
          )}
          <CardGrid>
            {cardItems.length > 0 &&
              cardItems.map((props, index) => {
                const year = props.createdAt.getFullYear();
                const month = props.createdAt.getMonth();
                const day = props.createdAt.getDay();
                const slug = slugify(props.title);
                return (
                  <CardWrapper key={index}>
                    <CardImageWrapper h="sm">
                      <CardImage src={props.src} alt={props.alt} />
                    </CardImageWrapper>
                    <small className="text-neutral-400 dark:text-neutral-500">
                      <time>{convertToLargeDate(props.createdAt)}</time>
                    </small>
                    <CardHeader>
                      <Link
                        href={`/articles/${year}/${month}/${day}/${slug}`}
                        className={linkVariants({ variant: "title" })}
                      >
                        {props.title}
                      </Link>
                    </CardHeader>
                    <CardBody>
                      <p className="text-neutral-500">{props.subTitle}</p>
                    </CardBody>
                    {/* <CardFooter>
                      <Link
                        href={`/articles/${year}/${month}/${day}/${slug}`}
                        className={cn(
                          linkVariants({
                            variant: "button",
                          }),
                        )}
                      >
                        Saiba mais
                      </Link>
                    </CardFooter> */}
                  </CardWrapper>
                );
              })}
          </CardGrid>
        </div>
      </main>
      <Footer />
    </div>
  );
}

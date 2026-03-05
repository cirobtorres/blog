import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import {
  CardBody,
  CardFooter,
  CardGrid,
  CardWrapper,
} from "../components/Cards";
import { convertToLargeDate } from "../utils/date";
import { cn, linkVariants } from "../utils/className";
import Link from "next/link";
import { slugify } from "../utils/strings-transforms";

const cardItems = Array.from({ length: 3 }).map(() => {
  const title =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, error.";
  const subTitle =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod sunt aspernatur esse! Iure, quae numquam sit totam inventore nihil praesentium quo odit dolorum voluptas iste aliquid excepturi debitis eum quisquam.";
  return {
    title,
    subTitle,
    createdAt: new Date(),
  };
});

// const cardItems: {
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
        <div className="h-full w-full max-w-200 mx-auto">
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
                    <CardBody>
                      <small className="font-sans text-muted-foreground">
                        <time>{convertToLargeDate(props.createdAt)}</time>
                      </small>
                      <Link
                        href={`/articles/${year}/${month}/${day}/${slug}`}
                        className={linkVariants({ variant: "title" })}
                      >
                        {props.title}
                      </Link>
                      <p className="font-sans text-muted-foreground">
                        {props.subTitle}
                      </p>
                    </CardBody>
                    <CardFooter>
                      <Link
                        href={`/articles/${year}/${month}/${day}/${slug}`}
                        className={cn(
                          linkVariants({
                            variant: "button",
                          }),
                          "max-w-60 mx-auto",
                        )}
                      >
                        Saiba mais
                      </Link>
                    </CardFooter>
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

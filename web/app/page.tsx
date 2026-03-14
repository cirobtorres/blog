import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import {
  ArticleCard,
  ArticleCardDate,
  ArticleCardImage,
  ArticleCardLink,
  ArticleCards,
  ArticleCardSubtitle,
  ArticleCardTitle,
} from "../components/ArticleCards";
import { convertToLargeDate } from "../utils/date";
import { slugify } from "../utils/strings-transforms";
import { HomePagination } from "../components/Pagination";

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

export default async function HomePage() {
  return (
    <div
      className="min-h-screen grid grid-rows-[1fr_var(--height-footer)]" // grid-rows-[var(--height-header)_1fr_var(--height-footer)]
    >
      <Header className="fixed" />
      <main className="mt-header-height">
        <div className="bg-[radial-gradient(circle,rgba(0,0,0,0.10),rgba(0,0,0,1)),url('https://techgage.com/wp-content/uploads/2022/09/Blender-3.3-with-OneAPI-and-Intel-Arc-GPU.jpg')] lg:col-start-1 lg:row-start-1 lg:h-150 w-full border-b aspect-video bg-cover" />
        <div className="px-6 my-6">
          <div className="w-full max-w-300 h-full mx-auto">
            <HomePagination />
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
            <HomePagination />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

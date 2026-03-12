import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import {
  CardCreatedAt,
  CardDescription,
  CardGrid,
  CardHeader,
  CardImage,
  CardImageWrapper,
  CardLink,
  CardWrapper,
} from "../components/Cards";
import { convertToLargeDate } from "../utils/date";
import { slugify } from "../utils/strings-transforms";
import { HomePagination } from "../components/Padination";

const cardItems = Array.from({ length: 8 }).map(() => {
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
    <div
      className="min-h-screen grid grid-rows-[1fr_var(--height-footer)]" // grid-rows-[var(--height-header)_1fr_var(--height-footer)]
    >
      <Header className="fixed" />
      <main className="mt-header-height">
        <div className="bg-[radial-gradient(circle,rgba(0,0,0,0.10),rgba(0,0,0,1)),url('https://techgage.com/wp-content/uploads/2022/09/Blender-3.3-with-OneAPI-and-Intel-Arc-GPU.jpg')] lg:col-start-1 lg:row-start-1 lg:h-150 w-full border-b dark:border-stone-800 aspect-video bg-cover" />
        <div className="px-6 my-6">
          <div className="w-full max-w-300 h-full mx-auto">
            <HomePagination />
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
                    <CardLink
                      key={index}
                      href={`/articles/${year}/${month}/${day}/${slug}`}
                    >
                      <CardWrapper>
                        <CardImageWrapper>
                          <CardImage src={props.src} alt={props.alt} />
                        </CardImageWrapper>
                        <CardCreatedAt
                          createdAt={convertToLargeDate(props.createdAt)}
                        />
                        <CardHeader>{props.title}</CardHeader>
                        <CardDescription>{props.subTitle}</CardDescription>
                      </CardWrapper>
                    </CardLink>
                  );
                })}
            </CardGrid>
            <HomePagination />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

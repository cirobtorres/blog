import { slugify } from "../../../utils/strings-transforms";
import {
  AuthorsArticleCard,
  AuthorsArticleCardImage,
  AuthorsArticleCardLink,
  AuthorsArticleCards,
  AuthorsArticleCardSubtitle,
  AuthorsArticleCardTitle,
  AuthorsArticleDescription,
} from "../../../components/AuthorsDashboard/AuthorsArticleCards";

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

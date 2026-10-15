import { apiServerUrls } from "../../../../routing/routes";
import { serverFetch } from "../../../../services/serverFetch";
import { getOptimizedMediaUrl } from "../../../../utils/media-file-utils";
import { buttonVariants, cn } from "../../../../utils/variants";
import { Link } from "../../../../components/Links";
import {
  ArticleCard,
  ArticleCardFooter,
  ArticleCardImage,
  ArticleCardLink,
  ArticleCardPendingRevision,
  ArticleCards,
  ArticleCardStatus,
  ArticleCardSubtitle,
  ArticleCardTitle,
  ArticleCardDate,
} from "../../../../components/Article/ArticleCards";

export default async function AuthorsArticlesPage() {
  const articlePromise = await serverFetch(apiServerUrls.article.root + "/me");
  const articlesResult = await articlePromise.json();
  const articles: Article[] = articlesResult?.content ?? [];
  const pagination: Pagination = articlesResult?.page ?? [];
  return (
    <section className="w-full max-w-6xl mx-auto flex flex-col gap-2 px-2 my-6">
      <div className="w-full flex justify-between items-center gap-2 mb-6">
        <h1 className="text-3xl font-extrabold">Artigos</h1>
        <div className="flex-1 flex justify-end items-center gap-2">
          <Link
            href="articles/write"
            className={cn(buttonVariants(), "w-fit max-w-30 h-8")}
          >
            <span className="text-neutral-100 hidden min-[475px]:inline">
              Criar Novo
            </span>
            <span className="min-[475px]:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-plus-icon lucide-plus"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
      <ArticleCards>
        {articles?.length > 0 &&
          articles.map((article: Article) => {
            return (
              <ArticleCardLink
                key={article.id}
                href={`articles/write/${article.id}`}
                className="relative"
              >
                <ArticleCard id={article.id}>
                  {article.banner ? (
                    <ArticleCardImage
                      id={article.id}
                      src={getOptimizedMediaUrl(article.banner.url, 400)}
                      alt={article.banner.alt}
                      fill
                    />
                  ) : (
                    <BannerSafetyFallback size={64} />
                  )}
                  <ArticleCardDate>{article.createdAt}</ArticleCardDate>
                  <ArticleCardTitle>{article.title}</ArticleCardTitle>
                  <ArticleCardSubtitle>{article.subtitle}</ArticleCardSubtitle>
                  <ArticleCardFooter>
                    <ArticleCardStatus status={article.status} />
                    <ArticleCardPendingRevision
                      hasUnpublishedChanges={article.hasUnpublishedChanges}
                    />
                  </ArticleCardFooter>
                </ArticleCard>
              </ArticleCardLink>
            );
          })}
      </ArticleCards>
    </section>
  );
}

const BannerSafetyFallback = ({
  size,
}: {
  size: React.ComponentProps<"svg">["width"];
}) => (
  <div className="relative w-full h-1/2 shrink-0 overflow-hidden border">
    <div className="w-full flex flex-col items-center justify-center absolute top-1/2 -translate-y-1/2 text-neutral-500 px-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
        <path d="M14 2v5a1 1 0 0 0 1 1h5" />
        <path d="m14.5 12.5-5 5" />
        <path d="m9.5 12.5 5 5" />
      </svg>
      <span className="text-center text-sm">
        Imagem excluída ou
        <br />
        não localizada
      </span>
    </div>
  </div>
);

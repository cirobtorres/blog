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
            <span className="hidden min-[475px]:inline">Criar Novo</span>
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
                  <ArticleCardImage
                    id={article.id}
                    src={getOptimizedMediaUrl(article.media.url, 400)}
                    alt={article.media.alt}
                    fill
                  />
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

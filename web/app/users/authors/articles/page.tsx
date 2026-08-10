import { apiServerUrls } from "../../../../routing/routes";
import { serverFetch } from "../../../../services/serverFetch";
import { getOptimizedMediaUrl } from "../../../../utils/media-file-utils";
import {
  ArticleCard,
  ArticleCardDate,
  ArticleCardFooter,
  ArticleCardImage,
  ArticleCardLink,
  ArticleCardPendingRev,
  ArticleCards,
  ArticleCardStatus,
  ArticleCardSubtitle,
  ArticleCardTitle,
} from "../../../../components/Article/ArticleCards";
import { convertToLargeDate } from "../../../../utils/date";
import { buttonVariants, cn } from "../../../../utils/variants";
import { Link } from "../../../../components/Links";

export default async function AuthorsArticlesPage() {
  const articlePromise = await serverFetch(apiServerUrls.article.root + "/me");
  const articlesResult = await articlePromise.json();
  const articles: Article[] = articlesResult?.content ?? [];
  const pagination: Pagination = articlesResult?.page ?? [];
  return (
    <section className="w-full max-w-6xl mx-auto flex flex-col gap-2 px-2 my-6">
      <div className="flex justify-between items-center gap-2 mb-6">
        <h1 className="text-3xl font-extrabold">Artigos</h1>
        <div className="flex-1 flex justify-end items-center gap-2">
          <Link
            href="articles/write"
            className={cn(buttonVariants(), "w-full max-w-30 h-8")}
          >
            Criar Novo
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
                  <ArticleCardDate>
                    {convertToLargeDate(new Date())}
                  </ArticleCardDate>
                  <ArticleCardTitle>{article.title}</ArticleCardTitle>
                  <ArticleCardSubtitle>{article.subtitle}</ArticleCardSubtitle>
                  <ArticleCardFooter>
                    <ArticleCardStatus status={article.status} />
                    <ArticleCardPendingRev
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

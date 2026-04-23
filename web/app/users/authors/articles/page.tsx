"use server";

import { apiServerUrls } from "../../../../routing/routes";
import { serverFetch } from "../../../../services/auth-fetch-actions";
import { getOptimizedMediaUrl } from "../../../../utils/media-file-utils";
import {
  ArticleCard,
  ArticleCardDate,
  ArticleCardImage,
  ArticleCardLink,
  ArticleCards,
  ArticleCardSubtitle,
  ArticleCardTitle,
  ArticleIsPublished,
} from "../../../../components/Article/ArticleCards";
import { convertToLargeDate } from "../../../../utils/date";

export default async function AuthorsArticlesPage() {
  const articlePromise = await serverFetch(apiServerUrls.article.root);
  const articlesResult = await articlePromise.json();
  const { content: articles, page }: { content: Article[]; page: Pagination } =
    articlesResult;
  return (
    <section className="w-full max-w-6xl mx-auto flex flex-col gap-2 p-2">
      <h1 className="text-3xl font-extrabold my-6">Artigos</h1>
      <ArticleCards>
        {articles.map((article: Article) => {
          return (
            <ArticleCardLink
              key={article.id}
              href={`articles/write/${article.id}`}
              className="relative"
            >
              <ArticleIsPublished />
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
              </ArticleCard>
            </ArticleCardLink>
          );
        })}
      </ArticleCards>
    </section>
  );
}

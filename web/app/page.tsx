"use server";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { convertToLargeDate, mountURL } from "../utils/date";
import { serverFetch } from "../services/auth-fetch-actions";
import { apiServerUrls } from "../routing/routes";
import ArticlePagination from "../components/Article/ArticlePagination";
import {
  ArticleCard,
  ArticleCardDate,
  ArticleCardImage,
  ArticleCardLink,
  ArticleCards,
  ArticleCardSubtitle,
  ArticleCardTitle,
} from "../components/Article/ArticleCards";
import Link from "next/link";
import Image from "next/image";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;

  const query = new URLSearchParams({
    q: params?.q || "",
    page: params?.page || "0",
    size: params?.size || "20",
  });

  const getUrl = `${apiServerUrls.article.root}?${query.toString()}`;

  const articlesPromise = await serverFetch(getUrl);
  const articlesResult = await articlesPromise.json();
  const { content: articles, page }: { content: Article[]; page: Pagination } =
    articlesResult;

  const hasArticles = articles.length > 0;

  return (
    <div className="min-h-screen grid grid-rows-[1fr_var(--height-footer)]">
      <Header className="fixed" />
      <main className="mt-height-header">
        {hasArticles &&
          (!(params?.page || params?.page === "0") ? (
            <RenderArticles articles={articles} />
          ) : (
            <ContentPositioner>
              <LoopCards articles={articles} />
            </ContentPositioner>
          ))}
        {!hasArticles && (
          <section className="h-full flex justify-center items-center">
            <span className="font-medium text-neutral-500 pointer-events-none">
              Nenhum artigo publicado =/
            </span>
          </section>
        )}
        <ArticlePagination {...page} />
      </main>
      <Footer />
    </div>
  );
}

const RenderArticles = ({ articles }: { articles: Article[] }) => {
  const [firstArticle, ...remainingArticles] = articles;

  return (
    <>
      <LastPublishedArticle article={firstArticle} />
      <ContentPositioner>
        <LoopCards articles={remainingArticles} />
      </ContentPositioner>
    </>
  );
};

const LastPublishedArticle = ({ article }: { article: Article }) => (
  <Link
    id={article.id}
    href={mountURL(article)}
    className="relative block w-full lg:h-150 lg:col-start-1 lg:row-start-1 border-b aspect-video overflow-hidden after:content-[''] after:absolute after:inset-0 after:z-10 after:bg-[radial-gradient(circle,rgba(0,0,0,0.10)_10%,rgba(0,0,0,1)_100%)]"
  >
    <Image
      id={article.id}
      src={article.media.bannerUrl}
      alt={article.media.alt}
      fill
      priority
      className="object-cover z-0"
    />
    <div className="z-20 absolute bottom-0 left-0 right-0">
      <div className="flex justify-center p-8 backdrop-blur-lg">
        <div className="w-full text-center max-w-300">
          <h2 className="text-neutral-100 text-3xl font-bold">
            {article.title}
          </h2>
          {article.subtitle}
        </div>
      </div>
    </div>
  </Link>
);

const ContentPositioner = ({ children }: { children: React.ReactNode }) => (
  <div className="px-4 my-6">
    <div className="w-full max-w-300 h-full mx-auto">{children}</div>
  </div>
);

const LoopCards = ({ articles }: { articles: Article[] }) => (
  <ArticleCards>
    {articles.map((article: Article) => {
      return (
        <ArticleCardLink key={article.id} href={mountURL(article)}>
          <ArticleCard id={article.id}>
            <ArticleCardImage
              id={article.id}
              src={article.media.bannerUrl}
              alt={article.media.alt}
            />
            <ArticleCardDate>{convertToLargeDate(new Date())}</ArticleCardDate>
            <ArticleCardTitle>{article.title}</ArticleCardTitle>
            <ArticleCardSubtitle>{article.subtitle}</ArticleCardSubtitle>
          </ArticleCard>
        </ArticleCardLink>
      );
    })}
  </ArticleCards>
);

import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { apiServerUrls } from "../../../../../../routing/routes";
import ArticleTitle from "../../../../../../components/Article/ArticleTitle";
import ArticleBody from "../../../../../../components/Article/ArticleBody";
import Comments from "../../../../../../components/Comments";
import Header from "../../../../../../components/Header";
import Footer from "../../../../../../components/Footer";

export const dynamicParams = true;
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateStaticParams() {
  try {
    const response = await fetch(apiServerUrls.article.slug);
    if (!response.ok) {
      return [];
    }

    const slugs: string[] = await response.json();

    return slugs
      .map((slugPath) => {
        const [year, month, day, slug] = slugPath.split("/");
        if (!year || !month || !day || !slug) return null;
        return { year, month, day, slug };
      })
      .filter(
        (
          item,
        ): item is { year: string; month: string; day: string; slug: string } =>
          item !== null,
      );
  } catch (e) {
    console.error(
      "Error during build: generateStaticParams function couldn't connect to the server",
      e,
    );
    return [];
  }
}

export default async function ArticlePageId({
  params,
  searchParams,
}: {
  params: Promise<{ year: string; month: string; day: string; slug: string }>;
  searchParams: Promise<{ threadId?: string }>;
}) {
  const { year, month, day, slug } = await params;
  const resolvedParams = await searchParams;

  const getUrl =
    apiServerUrls.article.root + `/${year}/${month}/${day}/${slug}`;

  const response = await fetch(getUrl, {
    cache: "no-store",
  });

  if (!response.ok) {
    const responseBody = await response.text().catch(() => "");
    throw new Error(
      `API Error. Status: (${response.status}). Route: ${getUrl}. Body: ${responseBody.slice(0, 200)}`,
    );
  }

  const article: Article = await response.json();

  if (!article?.id) {
    notFound();
  }

  return (
    <div className="min-h-screen grid grid-rows-[var(--height-header)_1fr_var(--height-footer)]">
      <Header sticky progress />
      <main>
        <Suspense>
          <ArticleTitle {...article} />
        </Suspense>
        <ArticleBody {...article} />
        <Comments articleId={article.id} resolvedParams={resolvedParams} />
      </main>
      <Footer />
    </div>
  );
}

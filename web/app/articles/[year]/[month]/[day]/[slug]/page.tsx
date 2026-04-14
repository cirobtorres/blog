"use server";

import { Suspense } from "react";
import { Footer } from "../../../../../../components/Footer";
import { Header } from "../../../../../../components/Header";
import ArticleTitle from "../../../../../../components/Article/ArticleTitle";
import ArticleBody from "../../../../../../components/Article/ArticleBody";
import Comments from "../../../../../../components/Comments";
import { serverFetch } from "../../../../../../services/auth-fetch-actions";
import { apiServerUrls } from "../../../../../../routing/routes";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const response = await fetch(apiServerUrls.article.slug);
  const slugs: string[] = await response.json();

  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function ArticlePageId({
  params,
}: {
  params: Promise<{ year: string; month: string; day: string; slug: string }>;
}) {
  const { year, month, day, slug } = await params;

  const getUrl =
    apiServerUrls.article.root + `/${year}/${month}/${day}/${slug}`;

  const response = await serverFetch(getUrl);

  if (!response.ok) return notFound();

  const article = await response.json();

  return (
    <div className="min-h-screen grid grid-rows-[var(--height-header)_1fr_var(--height-footer)]">
      <Header sticky progress />
      <main>
        <Suspense>
          <ArticleTitle {...article} />
        </Suspense>
        <ArticleBody {...article} />
        <Comments />
      </main>
      <Footer />
    </div>
  );
}

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { apiServerUrls } from "../../../../../../routing/routes";
import ArticleTitle from "../../../../../../components/Article/ArticleTitle";
import ArticleBody from "../../../../../../components/Article/ArticleBody";
import Comments from "../../../../../../components/Comments";
import Header from "../../../../../../components/Header";
import Footer from "../../../../../../components/Footer";

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const response = await fetch(apiServerUrls.article.slug);
    const slugs: string[] = await response.json();
    return slugs.map((slug) => ({
      slug: slug,
    }));
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
}: {
  params: Promise<{ year: string; month: string; day: string; slug: string }>;
}) {
  const { year, month, day, slug } = await params;

  const getUrl =
    apiServerUrls.article.root + `/${year}/${month}/${day}/${slug}`;

  const response = await fetch(getUrl, {
    cache: "no-store",
  });

  if (!response.ok) {
    console.error(
      `API error: status ${response.status} searching for ${getUrl}`,
    );
    if (response.status === 404) {
      notFound();
    }
    throw new Error(`Article search error: ${response.status}`);
  }

  const article: Article = await response.json();

  return (
    <div className="min-h-screen grid grid-rows-[var(--height-header)_1fr_var(--height-footer)]">
      <Header sticky progress />
      <main>
        <Suspense>
          <ArticleTitle {...article} />
        </Suspense>
        <ArticleBody {...article} />
        <Comments articleId={article.id} />
      </main>
      <Footer />
    </div>
  );
}

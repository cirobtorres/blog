import { Suspense } from "react";
import ArticleTitle from "../../../../../../components/ArticleTitle";
import ArticleBody from "../../../../../../components/ArticleSection";
import { Footer } from "../../../../../../components/Footer";
import { Header } from "../../../../../../components/Header";
import ArticleComments from "../../../../../../components/ArticleComments";

export default async function ArticlePageId() {
  // {params}: {params: Promise<{ year: string; month: string; day: string; slug: string}>}
  // const { year, month, day, slug } = await params;

  return (
    <div className="min-h-screen grid grid-rows-[var(--height-header)_1fr_var(--height-footer)]">
      <Header sticky progress />
      <main>
        <Suspense>
          <ArticleTitle />
        </Suspense>
        <ArticleBody />
        <ArticleComments />
      </main>
      <Footer />
    </div>
  );
}

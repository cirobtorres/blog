import { Suspense } from "react";
import ArticleTitle from "../../../../../../components/ArticleTitle";
import ArticleBody from "../../../../../../components/ArticleSection";
import { Footer } from "../../../../../../components/Footer";
import { Header } from "../../../../../../components/Header";

export default async function ArticlePageId() {
  // {params}: {params: Promise<{ year: string; month: string; day: string; slug: string}>}
  // const { year, month, day, slug } = await params;

  return (
    <div className="min-h-screen grid grid-rows-[var(--height-header)_1fr_var(--height-footer)]">
      <Header sticky progress />
      <main className="my-6">
        <Suspense>
          <ArticleTitle />
        </Suspense>
        {/* <div className="relative w-full h-120 mb-12">
          <Image
            src="https://placehold.co/1920x1080/000000/FFFFFF/jpeg"
            alt=""
            fill
            className="absolute object-cover"
          />
        </div> */}
        <ArticleBody />
      </main>
      <Footer />
    </div>
  );
}

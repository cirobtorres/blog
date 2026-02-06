import ArticleTitle from "../../../components/ArticleTitle";
import ArticleBody from "../../../components/ArticleSection";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { WebGrid } from "../../../components/Display";
import { Banner } from "../../../components/Banner";

export default async function ArticlePageId({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  console.log(slug);

  return (
    <WebGrid>
      <Header fixed progress />
      <main className="mt-header-height">
        <div className="border-b border-border">
          <Banner h="lg" />
        </div>
        <ArticleTitle />
        <ArticleBody />
      </main>
      <Footer />
    </WebGrid>
  );
}

import ArticleTitle from "../../../components/ArticleTitle";
import ArticleBody from "../../../components/ArticleBody";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { WebGrid } from "../../../components/Display";
import { Banner } from "../../../components/Banner";

export default function ArticlePageId() {
  return (
    <WebGrid>
      <Header fixed={false} progress />
      <main className="mt-header-height">
        <div className="border-b border-neutral-900">
          <Banner h="lg" />
        </div>
        <ArticleTitle />
        <ArticleBody />
      </main>
      <Footer />
    </WebGrid>
  );
}

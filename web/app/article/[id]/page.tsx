import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { WebGrid } from "../../../components/Display";
import ArticleBody from "../../../components/ArticleBody";
import ArticleTitle from "../../../components/ArticleTitle";

export default function ArticlePageId() {
  return (
    <WebGrid>
      <Header />
      <main className="mt-header-height">
        <div className="p-6">
          <ArticleTitle />
          <ArticleBody />
        </div>
      </main>
      <Footer />
    </WebGrid>
  );
}

import ArticleTitle from "../../../components/ArticleTitle";
import ArticleBody from "../../../components/ArticleBody";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { WebGrid } from "../../../components/Display";

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

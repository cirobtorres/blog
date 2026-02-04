import { Main } from "../../../components/Main";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { WebGrid } from "../../../components/Display";
import ArticleBody from "../../../components/ArticleBody";
import ArticleTitle from "../../../components/ArticleTitle";

export default function ArticlePageId() {
  return (
    <WebGrid>
      <Header />
      <Main className="mt-15 max-w-300">
        <ArticleTitle />
        <ArticleBody />
      </Main>
      <Footer />
    </WebGrid>
  );
}

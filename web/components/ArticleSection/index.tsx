import BackToTopButton from "./BackToTopButton";
import ScrollSummary from "./ScrollSummary";
import ArticleContent from "./ArticleContent";

export default function ArticleBody() {
  return (
    <div className="w-full max-w-article-body mx-auto px-6">
      <section className="relative grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[200px_1fr_200px]">
        <ScrollSummary />
        <ArticleContent />
        <BackToTopButton />
      </section>
    </div>
  );
}

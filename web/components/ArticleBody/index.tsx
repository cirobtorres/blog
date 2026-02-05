import BackToTopButton from "../BackToTopButton";
import ScrollSummary from "../ScrollSummary";
import ArticleContent from "../ArticleContent";

export default function ArticleBody() {
  return (
    <div className="w-full max-w-article-body mx-auto">
      <section className="relative grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[300px_1fr_300px]">
        <ScrollSummary />
        <ArticleContent />
        <BackToTopButton />
      </section>
    </div>
  );
}

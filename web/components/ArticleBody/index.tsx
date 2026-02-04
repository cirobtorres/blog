import BackToTopButton from "../BackToTopButton";
import ScrollSummary from "../ScrollSummary";
import ArticleContent from "../ArticleContent";

export default function ArticleBody() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr_64px] gap-10">
      <ScrollSummary />
      <ArticleContent />
      <BackToTopButton />
    </section>
  );
}

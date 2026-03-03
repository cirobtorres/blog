// import ScrollSummary from "./ScrollSummary";
import ArticleContent from "./ArticleContent";
import BackToTopButton from "./BackToTopButton";

export default function ArticleBody() {
  return (
    <div className="w-full max-w-article-body mx-auto px-6">
      <section className="relative grid grid-cols-1 lg:grid-cols-[80px_1fr_80px]">
        {/* <ScrollSummary /> */}
        <div className="hidden lg:block" />
        <ArticleContent />
        <div className="sticky size-fit hidden lg:block top-[calc(50%-var(--height-header))] ml-3.75 mr-auto">
          <BackToTopButton />
        </div>
      </section>
    </div>
  );
}

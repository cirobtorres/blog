// import ScrollSummary from "./ScrollSummary";
import ArticleContent from "./ArticleContent";
import BackToTopButton from "./BackToTopButton";

export default function ArticleBody({ body }: Article) {
  console.log(body); // TODO
  return (
    <div className="w-full max-w-article-body mx-auto px-6">
      <section className="relative grid grid-cols-1 lg:grid-cols-[100px_1fr_100px]">
        {/* <ScrollSummary /> */}
        <div className="hidden lg:block" />
        <ArticleContent body={body} />
        <div className="sticky size-fit hidden lg:block top-[calc(50%-var(--height-header))] ml-auto mr-0">
          <BackToTopButton />
        </div>
      </section>
    </div>
  );
}

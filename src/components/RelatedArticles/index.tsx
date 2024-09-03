import ArticleCard from "../ArticleCard";

const RelatedArticles = ({ articles }: { articles: any[] }) => {
  return (
    <section className="w-full py-8">
      <div className="w-full bg-base-200 dark:bg-dark-base-200 p-8">
        <div className="mx-4 smartphone:mx-10 tablet:mx-20">
          <h2 className="max-w-webpage mx-auto text-center text-2xl text-base-neutral dark:text-dark-base-neutral uppercase font-extrabold">
            Outros artigos relacionados
          </h2>
        </div>
      </div>
      <div className="max-w-webpage mx-auto my-4 smartphone:my-8 tablet:my-16">
        <div className="mx-4 smartphone:mx-10 tablet:mx-20 grid max-[900px]:grid-rows-3 tablet:grid-cols-3 gap-8">
          {articles.map(({ date, ...article }, index) => (
            <ArticleCard key={index + 1} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;

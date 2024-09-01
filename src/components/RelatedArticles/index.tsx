import ArticleCard from "../ArticleCard";

const RelatedArticles = ({ articles }: { articles: any[] }) => {
  return (
    <section className="bg-base-150 dark:bg-dark-base-150">
      <div className="w-full mx-auto py-8">
        <div className="w-full bg-base-200 dark:bg-dark-base-200 p-8">
          <h2 className="max-w-webpage mx-auto text-center text-2xl text-base-neutral dark:text-dark-base-neutral uppercase font-extrabold">
            Outros artigos relacionados
          </h2>
        </div>
        <div className="max-w-webpage mx-auto grid grid-cols-3 gap-8 m-16">
          {articles.map(({ date, ...article }, index) => (
            <ArticleCard key={index + 1} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;

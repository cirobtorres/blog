import ArticleCard from "../ArticleCard";

const articles = [
  {
    id: "0000-1111-2222-3333-4444",
    title: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    subtitle:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur at voluptas unde sit architecto? Quos!",
    body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque harum quidem quaerat eum maiores error maxime impedit numquam voluptate ratione assumenda consequatur voluptatem, magni, exercitationem quam? Ducimus accusamus libero rerum, incidunt ut deleniti mollitia ad molestiae fugiat fugit, quidem aliquam maxime animi dolor pariatur accusantium deserunt sint laudantium hic debitis, commodi est officiis. Repudiandae, nulla. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque harum quidem quaerat eum maiores error maxime impedit numquam voluptate ratione assumenda consequatur voluptatem, magni, exercitationem quam? Ducimus accusamus libero rerum, incidunt ut deleniti mollitia ad molestiae fugiat fugit, quidem aliquam maxime animi dolor pariatur accusantium deserunt sint laudantium hic debitis, commodi est officiis. Repudiandae, nulla.",
    date: "27-08-2024",
  },
  {
    id: "0000-1111-2222-3333-4444",
    title: "Lorem ipsum dolor sit.",
    subtitle:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ab vero numquam, debitis deserunt est!",
    body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque harum quidem quaerat eum maiores error maxime impedit numquam voluptate ratione assumenda consequatur voluptatem, magni, exercitationem quam? Ducimus accusamus libero rerum, incidunt ut deleniti mollitia ad molestiae fugiat fugit, quidem aliquam maxime animi dolor pariatur accusantium deserunt sint laudantium hic debitis, commodi est officiis. Repudiandae, nulla. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque harum quidem quaerat eum maiores error maxime impedit numquam voluptate ratione assumenda consequatur voluptatem, magni, exercitationem quam? Ducimus accusamus libero rerum, incidunt ut deleniti mollitia ad molestiae fugiat fugit, quidem aliquam maxime animi dolor pariatur accusantium deserunt sint laudantium hic debitis, commodi est officiis. Repudiandae, nulla.",
    date: "09-08-2024",
  },
  {
    id: "0000-1111-2222-3333-4444",
    title: "Lorem ipsum dolor sit, amet consectetur.",
    subtitle:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque harum quidem quaerat eum maiores error maxime impedit numquam voluptate ratione assumenda consequatur voluptatem, magni, exercitationem quam?",
    body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque harum quidem quaerat eum maiores error maxime impedit numquam voluptate ratione assumenda consequatur voluptatem, magni, exercitationem quam? Ducimus accusamus libero rerum, incidunt ut deleniti mollitia ad molestiae fugiat fugit, quidem aliquam maxime animi dolor pariatur accusantium deserunt sint laudantium hic debitis, commodi est officiis. Repudiandae, nulla. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque harum quidem quaerat eum maiores error maxime impedit numquam voluptate ratione assumenda consequatur voluptatem, magni, exercitationem quam? Ducimus accusamus libero rerum, incidunt ut deleniti mollitia ad molestiae fugiat fugit, quidem aliquam maxime animi dolor pariatur accusantium deserunt sint laudantium hic debitis, commodi est officiis. Repudiandae, nulla.",
    date: "06-07-2024",
  },
];

const RelatedArticles = () => {
  return (
    <section className="bg-base-150 dark:bg-dark-base-150">
      <div className="w-full max-w-webpage mx-auto py-8">
        <div className="bg-base-200 dark:bg-dark-base-200 p-8">
          <h2 className="text-2xl text-base-neutral dark:text-dark-base-neutral uppercase font-extrabold">
            Outros artigos relacionados
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-8 m-16">
          {articles.map(({ date, ...article }, index) => (
            <ArticleCard key={index + 1} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;

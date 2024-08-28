"use server";

import ArticleCard from "../components/ArticleCard";
import Pagination from "../components/Pagination";
import Search from "../components/Search";

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
  {
    id: "0000-1111-2222-3333-4444",
    title:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab libero veritatis recusandae",
    subtitle:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque harum quidem quaerat eum maiores error maxime impedit numquam voluptate ratione",
    body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque harum quidem quaerat eum maiores error maxime impedit numquam voluptate ratione assumenda consequatur voluptatem, magni, exercitationem quam? Ducimus accusamus libero rerum, incidunt ut deleniti mollitia ad molestiae fugiat fugit, quidem aliquam maxime animi dolor pariatur accusantium deserunt sint laudantium hic debitis, commodi est officiis. Repudiandae, nulla. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque harum quidem quaerat eum maiores error maxime impedit numquam voluptate ratione assumenda consequatur voluptatem, magni, exercitationem quam? Ducimus accusamus libero rerum, incidunt ut deleniti mollitia ad molestiae fugiat fugit, quidem aliquam maxime animi dolor pariatur accusantium deserunt sint laudantium hic debitis, commodi est officiis. Repudiandae, nulla.",
    date: "22-05-2024",
  },
];

export default async function HomePage() {
  return (
    <main>
      <div className="">
        <div className="my-16">
          <h2 className="text-center text-3xl uppercase font-extrabold text-base-neutral dark:text-dark-base-neutral mb-4">
            Arquivo
          </h2>
          <Search />
        </div>
        <div className="max-w-webpage mx-auto mb-28">
          {articles.length > 0 ? (
            <ul className="m-16">
              {articles.map(({ date, ...article }, index) => (
                <li
                  key={index + 1}
                  className="grid grid-cols-[repeat(2,100px)_minmax(400px,1fr)]"
                >
                  <time className="text-center leading-6 text-xs py-4 font-[500] text-base-neutral dark:text-dark-base-neutral">
                    {date}
                  </time>
                  <div className="h-full relative">
                    <div className="absolute border-l top-4 left-1/2 -translate-x-1/2 -bottom-4 border-base-300 dark:border-[#2e2f31]" />
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 flex justify-center items-center size-6 rounded-lg  bg-base-200 dark:bg-dark-base-200 border border-base-300 dark:border-[#2e2f31]">
                      <span className="text-xs text-base-neutral dark:text-dark-base-neutral">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <ArticleCard {...article} />
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <Pagination />
      </div>
    </main>
  );
}

"use server";

import ArticleCard from "../components/ArticleCard";
import Pagination from "../components/Pagination";
import Search from "../components/Search";

export default async function HomePage() {
  return (
    <main>
      <div className="bg-dark-base-150">
        <div className="w-full max-w-webpage mx-auto gap-8 h-[calc(384px_+_64px_+_64px)] p-16"></div>
      </div>
      <div className="transition-[bottom] opacity-0 duration-300 translate-y-40 animate-body">
        <div className="my-16">
          <h2 className="text-center text-3xl uppercase font-extrabold text-base-neutral dark:text-dark-base-neutral mb-4">
            Arquivo
          </h2>
          <Search />
        </div>
        <div className="max-w-webpage mx-auto mb-28">
          <div className="grid grid-cols-3 gap-8 m-16">
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
          </div>
        </div>
        <Pagination />
      </div>
    </main>
  );
}

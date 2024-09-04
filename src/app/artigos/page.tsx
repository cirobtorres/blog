"use server";

import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import { createClient } from "../../utils/supabase/server";
import formatDate from "../../functions/formatDate";

export default async function ArticlesPage() {
  const supabase = createClient();
  const { data: articles, error } = await supabase
    .from("topics")
    .select("*")
    .order("created_at", { ascending: false });
  return (
    <main>
      <div className="w-full mx-4 smartphone:mx-8 tablet:mx-16 my-16">
        <h2 className="text-center text-3xl uppercase font-extrabold text-base-neutral dark:text-dark-base-neutral mb-4">
          Arquivo
        </h2>
        <Search />
      </div>
      <div className="max-w-6xl mx-auto mb-28">
        {articles || !error ? (
          <ul className="mx-4 smartphone:mx-8 tablet:mx-16 my-16">
            {articles.map((article, index) => (
              <li
                key={article.id}
                className="grid grid-cols-[minmax(400px,1fr)] smartphone:grid-cols-[100px_minmax(400px,1fr)] tablet:grid-cols-[150px_100px_minmax(400px,1fr)]"
              >
                <time className="text-center leading-6 text-xs py-4 font-[500] text-base-neutral dark:text-dark-base-neutral hidden tablet:block">
                  {formatDate(article.created_at)}
                </time>
                <div className="h-full relative hidden smartphone:block">
                  <div className="absolute border-l top-4 left-1/2 -translate-x-1/2 -bottom-4 border-base-300 dark:border-[#2e2f31]" />
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 flex justify-center items-center p-1 min-w-6 rounded-lg  bg-base-200 dark:bg-dark-base-200 border border-base-300 dark:border-[#2e2f31]">
                    <span className="text-xs text-base-neutral dark:text-dark-base-neutral">
                      {articles.length - index}
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
    </main>
  );
}

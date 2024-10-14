"use server";

import { BiRadioCircle } from "react-icons/bi";
import { createClient } from "../utils/supabase/server";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";
import { formatDate } from "../functions/formatDate";

export default async function HomePage() {
  const supabase = createClient();
  const { data: articles, error: articleError } = await supabase
    .from("topics")
    .select("*")
    .eq("private", false)
    .order("created_at", { ascending: false });

  return (
    <>
      <div className="max-w-5xl mx-auto">
        {articles && (
          <ul className="mx-4 smartphone:mx-10 tablet:mx-20 my-16">
            {articles.map((article, index) => (
              <li
                key={article.id}
                className="grid grid-cols-[minmax(200px,1fr)] smartphone:grid-cols-[100px_minmax(200px,1fr)] tablet:grid-cols-[150px_100px_minmax(200px,1fr)]"
              >
                <time className="text-center leading-6 text-xs py-4 font-[500] text-base-neutral dark:text-dark-base-neutral hidden tablet:block">
                  {formatDate(article.created_at)}
                </time>
                <div className="h-full relative hidden smartphone:block">
                  <div className="absolute w-[1px] top-8 left-1/2 -translate-x-1/2 -bottom-5 bg-base-300 dark:bg-dark-base-border" />
                  <BiRadioCircle className="absolute top-3 left-1/2 -translate-x-1/2 flex justify-center items-center p-1 min-w-6 rounded-lg text-3xl text-base-neutral dark:text-dark-base-neutral" />
                </div>
                <div className="rounded-2xl transition-[outline] duration-200 outline outline-2 outline-transparent -outline-offset-2 focus-within:outline-blue-500 relative">
                  <ArticleCard {...article} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* <Pagination /> */}
    </>
  );
}

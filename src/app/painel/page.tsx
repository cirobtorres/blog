"use server";

import Link from "next/link";
import Search from "../../components/Search";
import { createClient } from "../../utils/supabase/server";
import { IoClose } from "react-icons/io5";
import { redirect } from "next/navigation";
import formatDate from "../../functions/formatDate";
import { MdKeyboardArrowRight } from "react-icons/md";
import ArticleCard from "../../components/ArticleCard";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  const {
    data: { user: supabaseAuthUser },
    error: supabaseAuthUserError,
  } = await supabase.auth.getUser();

  const { data: blogUser } = await supabase
    .from("blog_author")
    .select("*")
    .eq("auth_users_id", supabaseAuthUser?.id)
    .in("privileges", [2, 3])
    .single();

  if (!blogUser) redirect("/");

  const { data: articles, error: articlesError } = await supabase
    .from("topics")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <section className="pl-20 pr-10 tablet:px-20 px-10 py-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="h-fit flex justify-center items-center px-2 py-1 rounded font-extrabold text-xs text-base-100 dark:text-base-100 border border-[#359b50] dark:border-[#9af1b1] bg-base-green hover:bg-base-green-hover dark:bg-dark-base-green dark:hover:bg-dark-base-green-hover"
        >
          Criar Tópico
        </button>
        <Search />
      </div>
      <div className="py-4">
        <h1 className="text-xl text-base-neutral dark:text-dark-base-neutral">
          Artigos de: <strong>{user?.user_metadata.name}</strong>
        </h1>
      </div>
      {articles && (
        <ul className="grid grid-cols-3 max-[800px]:grid-cols-2 gap-3">
          {articles.map(
            ({ id, title, sub_title, body, created_at, updated_at }, index) => (
              <li
                key={id}
                className="overflow-hidden transition-colors duration-200 rounded border border-base-200 dark:border-dark-base-border bg-base-150 dark:bg-dark-base-150 hover:shadow-md hover:bg-base-150 dark:hover:dark:bg-[#181818] group"
              >
                <Link href="/">
                  <article>
                    <div className="flex flex-col p-4">
                      <h2 className="line-clamp-2 text-base font-extrabold text-base-green dark:text-dark-base-green mb-1">
                        {title}
                      </h2>
                      <h3 className="line-clamp-2 text-sm font-extrabold text-base-neutral dark:text-dark-base-neutral mb-1">
                        {sub_title}
                      </h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: body.substring(0, 255) + "...",
                        }}
                        className="line-clamp-3 text-xs [&_h3]:text-sm [&_h3]:font-bold text-base-neutral dark:text-dark-base-neutral"
                      />
                      <time className="text-xs text-base-neutral dark:text-dark-base-neutral">
                        Atualizado: {formatDate(updated_at)}
                      </time>
                      <time className="text-xs text-base-neutral dark:text-dark-base-neutral">
                        Criado: {formatDate(created_at)}
                      </time>
                      <span className="flex items-center gap-1 text-sm font-[500] text-base-blue dark:text-dark-base-blue">
                        Saiba mais
                        <MdKeyboardArrowRight className="transition-all duration-300 text-xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" />
                      </span>
                    </div>
                  </article>
                </Link>
              </li>
            )
          )}
        </ul>
      )}
    </section>
  );
}

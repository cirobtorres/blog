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
        <Link
          href="/painel/criar-artigo"
          className="h-fit flex justify-center items-center px-2 py-1 rounded font-extrabold text-xs text-base-100 dark:text-base-100 border border-[#359b50] dark:border-[#9af1b1] bg-base-green hover:bg-base-green-hover dark:bg-dark-base-green dark:hover:bg-dark-base-green-hover"
        >
          Criar Tópico
        </Link>
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
            (
              { id, title, sub_title, slug, body, created_at, updated_at },
              index
            ) => (
              <li
                key={id}
                className="h-full overflow-hidden transition-colors duration-200 rounded-2xl border border-base-200 dark:border-dark-base-border bg-base-150 dark:bg-dark-base-150 hover:shadow-md hover:bg-base-150 dark:hover:dark:bg-[#181818] group"
              >
                <Link
                  href={`/painel/criar-artigo/${slug}/${id}`}
                  className="h-full"
                >
                  <article className="h-full flex flex-col p-4">
                    <h2 className="line-clamp-2 text-base font-extrabold text-base-green dark:text-dark-base-green mb-2">
                      {title}
                    </h2>
                    <h3 className="line-clamp-2 text-sm font-extrabold text-base-neutral dark:text-dark-base-neutral mb-2">
                      {sub_title}
                    </h3>
                    {/* <div
                      dangerouslySetInnerHTML={{
                        __html: body.substring(0, 255) + "...",
                      }}
                      className="line-clamp-3 text-xs mb-2 text-base-neutral dark:text-dark-base-neutral"
                    /> */}
                    <div className="flex flex-col mb-2">
                      <time className="text-xs text-base-neutral dark:text-dark-base-neutral">
                        Atualizado: {formatDate(updated_at)}
                      </time>
                      <time className="text-xs text-base-neutral dark:text-dark-base-neutral">
                        Criado: {formatDate(created_at)}
                      </time>
                    </div>
                    <span className="mt-auto mb-0 flex items-center gap-1 text-sm font-[500] text-base-blue dark:text-dark-base-blue">
                      Saiba mais
                      <MdKeyboardArrowRight className="transition-all duration-300 text-xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" />
                    </span>
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

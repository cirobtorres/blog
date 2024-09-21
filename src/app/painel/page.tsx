"use server";

import Link from "next/link";
import Search from "../../components/Search";
import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";
import formatDate from "../../functions/formatDate";
import { MdKeyboardArrowRight } from "react-icons/md";
import FilterButton from "../../components/FilterButton";

export default async function DashboardPage({
  searchParams: { private: privateArticle, bloqued_for_replies },
}: {
  searchParams: { private: string; bloqued_for_replies: string };
}) {
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
    .order("updated_at", { ascending: false });

  return (
    <section className="pl-20 tablet:pl-6 pr-10 tablet:px-20 px-10 py-6">
      <div className="flex items-center gap-4">
        <Link
          href="/painel/criar-artigo"
          className="h-fit flex justify-center items-center px-2 py-1 rounded font-extrabold text-xs text-base-100 dark:text-base-100 border border-[#359b50] dark:border-[#9af1b1] bg-base-green hover:bg-base-green-hover dark:bg-dark-base-green dark:hover:bg-dark-base-green-hover"
        >
          Criar Tópico
        </Link>
        <Search />
        <FilterButton />
      </div>
      <div className="flex justify-between py-4">
        <h1 className="text-xl text-base-neutral dark:text-dark-base-neutral">
          Artigos de: <strong>{user?.user_metadata.name}</strong>
        </h1>
        <div className="flex gap-1 items-center">
          <Filter text="Artigos privados" color="#ef4444" />
          <Filter text="Comentários bloqueados" color="#eab308" />
        </div>
      </div>
      {articles && (
        <ul className="grid grid-cols-3 max-[800px]:grid-cols-2 gap-3">
          {articles.map((article, index) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </ul>
      )}
    </section>
  );
}

const ArticleCard = ({
  id,
  title,
  sub_title,
  slug,
  body,
  created_at,
  updated_at,
  private: privateArticle,
  blocked_for_replies,
}: {
  id: string;
  title: string;
  sub_title: string;
  slug: string;
  body: string;
  created_at: string;
  updated_at: string;
  private: boolean;
  blocked_for_replies: boolean;
}) => {
  return (
    <li
      // key={id}
      className="h-full overflow-hidden transition-all duration-200 rounded-2xl border border-base-200 dark:border-dark-base-border bg-base-100 dark:bg-dark-base-150 hover:bg-base-150 dark:hover:dark:bg-[#181818] outline outline-2 outline-transparent -outline-offset-1 focus-within:outline-blue-500 group"
    >
      <Link href={`/painel/criar-artigo/${slug}/${id}`} className="h-full">
        <article className="relative h-full flex flex-col p-4">
          {(privateArticle || blocked_for_replies) && (
            <div className="flex gap-1 items-center absolute right-4 top-4">
              {privateArticle && <RoundNotification color="#ef4444" />}
              {blocked_for_replies && <RoundNotification color="#eab308" />}
            </div>
          )}
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
  );
};

const Filter = ({ text, color }: { text: string; color: string }) => {
  return (
    <div className="px-2">
      <p className="py-1 px-2 rounded flex gap-1 items-center text-xs text-base-neutral dark:text-dark-base-neutral">
        <RoundNotification color={color} />
        {text}
      </p>
    </div>
  );
};

const RoundNotification = ({ color }: { color: string }) => {
  return <div className="size-2 rounded-full" style={{ background: color }} />;
};

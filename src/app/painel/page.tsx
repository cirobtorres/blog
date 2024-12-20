"use server";

import { createClient } from "@/utils/supabase/server";
import Search from "@/components/Search";
import FilterButton from "@/components/FilterButton";
import DashboardArticleGrid from "../../components/DashboardArticleGrid";

export default async function DashboardPage({
  searchParams: {
    private: privateArticle,
    bloqued_for_replies: blockedForReplies,
  },
}: {
  searchParams: { private: string; bloqued_for_replies: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  const { data: articles, error: articlesError } = await supabase
    .from("topics")
    .select("*")
    .order("updated_at", { ascending: false });

  const { data: tags, error: tagError } = await supabase
    .from("tags")
    .select("*")
    .order("title");

  return (
    <section className="pl-20 pr-7 tablet:pl-6 py-6 overflow-x-hidden">
      <div className="flex flex-row items-center max-[600px]:flex-col max-[600px]:items-start gap-4">
        <div className="w-full flex items-center gap-4">
          <Search id="articles-search" placeholder="Pesquise artigos" />
          <FilterButton />
        </div>
      </div>
      <div className="flex justify-between max-[600px]:flex-col py-4">
        <h1 className="text-xl text-base-neutral dark:text-dark-base-neutral">
          Artigos de: <strong>{user?.user_metadata.name}</strong>
        </h1>
        <div className="flex gap-1 items-center max-[600px]:pt-2">
          <Filter text="Artigos privados" color="#ef4444" />
          <Filter text="Comentários bloqueados" color="#eab308" />
        </div>
      </div>
      <DashboardArticleGrid articles={articles} tags={tags} />
    </section>
  );
}

const Filter = ({ text, color }: { text: string; color: string }) => {
  return (
    <div>
      <p className="py-1 px-2 rounded flex gap-1 items-center text-xs text-base-neutral dark:text-dark-base-neutral">
        <RoundNotification color={color} />
        {text}
      </p>
    </div>
  );
};

const RoundNotification = ({ color }: { color: string }) => {
  return <span className="size-2 rounded-full" style={{ background: color }} />;
};

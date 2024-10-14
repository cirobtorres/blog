"use server";

import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import DashboardSummaryCard from "@/components/DashboardSummaryCard";
import DashboardSummaryGrid from "@/components/DashboardSummaryGrid";

export default async function ListummariesPage() {
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

  const { data: summaries, error: summariesError } = await supabase
    .from("summaries")
    .select("*")
    .order("updated_at", { ascending: false });

  const { data: tags, error: tagError } = await supabase
    .from("tags")
    .select("*")
    .order("title");

  return (
    <section className="pl-20 pr-7 tablet:pl-6 py-6">
      <Link
        href="/painel/rascunhos/criar"
        className="w-32 text-nowrap transition-[outline] duration-300 outline outline-4 outline-offset-1 outline-transparent focus:outline-[#7be296] h-fit flex justify-center items-center px-2 py-1 rounded font-extrabold text-xs text-base-100 dark:text-base-100 border border-[#359b50] dark:border-[#9af1b1] bg-base-green hover:bg-base-green-hover dark:bg-dark-base-green dark:hover:bg-dark-base-green-hover"
      >
        Criar Rascunho
      </Link>
      <div className="py-4">
        <h1 className="text-xl text-base-neutral dark:text-dark-base-neutral">
          Rascunhos de: <strong>{user?.user_metadata.name}</strong>
        </h1>
      </div>
      <DashboardSummaryGrid summaries={summaries} tags={tags} />
    </section>
  );
}

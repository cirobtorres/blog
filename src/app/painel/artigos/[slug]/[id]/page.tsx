"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { EditArticle } from "@/components/ArticleEditorForm";
import Loading from "@/components/Loading";

export default async function EditArticlePage({
  params: { slug, id },
}: {
  params: { slug: string; id: string };
}) {
  const supabase = createClient();
  const {
    data: { user: supabaseAuthUser },
    error: supabaseAuthUserError,
  } = await supabase.auth.getUser();

  if (!supabaseAuthUser || supabaseAuthUserError) {
    redirect("/");
  }

  const { data: blogUser, error: blogUserError } = await supabase
    .from("blog_author")
    .select("*")
    .eq("auth_users_id", supabaseAuthUser.id)
    .in("privileges", [2, 3])
    .single();

  if (!blogUser || blogUserError) {
    redirect("/");
  }

  const { data: article, error: articleError } = await supabase
    .from("topics")
    .select("*")
    .eq("id", id)
    .single();

  if (articleError) redirect("/");

  return !article ? (
    <Loading />
  ) : (
    <div className="w-full h-full mx-0 pl-20 tablet:pl-10 pr-10">
      <EditArticle {...article} />
    </div>
  );
}

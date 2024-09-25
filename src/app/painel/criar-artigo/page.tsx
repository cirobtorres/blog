"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import ArticleEditorCreateForm from "@/components/ArticleEditorForm";

export default async function CreateArticlePage() {
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

  return (
    <div className="w-full h-full mx-0 pl-20 tablet:pl-10 pr-10">
      <ArticleEditorCreateForm blogUser={blogUser} />
    </div>
  );
}

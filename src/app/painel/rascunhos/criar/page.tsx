"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import CreateSummary from "@/components/ArticleEditorForm";

export default async function CreateSummaryPage() {
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
    <div className="max-w-[700px] w-full h-full mx-auto py-6 px-20 tablet:px-10">
      <CreateSummary blogUser={blogUser} />
    </div>
  );
}

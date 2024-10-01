"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { EditSummary } from "@/components/ArticleEditorForm";
import Loading from "@/components/Loading";

export default async function EditSummaryPage({
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

  const { data: summary, error: summaryError } = await supabase
    .from("summaries")
    .select("*")
    .eq("id", id)
    .single();

  if (summaryError) redirect("/");

  return !summary ? (
    <Loading />
  ) : (
    <div className="w-full h-full mx-0 pl-20 tablet:pl-10 pr-6">
      <EditSummary id={id} content={summary.body} />
    </div>
  );
}

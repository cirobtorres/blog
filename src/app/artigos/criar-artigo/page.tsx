import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";
import ArticleEditorForm from "../../../components/ArticleEditorForm";

export default async function CreateArticlePage() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    redirect("/");
  }

  return (
    <main className="w-full h-full mx-0">
      <ArticleEditorForm user={user} />
    </main>
  );
}

"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import RelatedArticles from "@/components/RelatedArticles";
import BackToTopButton from "@/components/BackToTopButton";
import LinkAnchorTracker from "@/components/LinkAnchorTracker";
import ArticleHero from "@/components/ArticleHero";
import ArticleBody from "@/components/ArticleBody";
import Tags from "@/components/Tags";

interface Params {
  params: {
    topicSlug: string;
    id: string;
  };
}

export default async function ArticlePage({ params }: Params) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("topics")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!error) {
    return (
      <main className="w-full h-full mx-0 bg-base-150 dark:bg-dark-base-150">
        <ArticleHero {...data} />
        <div className="w-full max-w-webpage mx-auto h-full flex gap-16">
          <LinkAnchorTracker {...data} />
          <ArticleBody {...data} />
          <div className="h-full sticky top-1/2 -translate-y-1/2 mt-20">
            <BackToTopButton />
          </div>
        </div>
        <div className="max-w-webpage mx-auto h-full mb-20">
          <div className="w-full pl-[calc(280px_+_64px)] pr-[calc(64px_+_75px_+_64px)]">
            <Tags />
          </div>
        </div>
        <RelatedArticles articles={[data, data, data]} />
      </main>
    );
  } else {
    revalidatePath("/", "layout");
    redirect("/");
  }
}

"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import RelatedArticles from "@/components/RelatedArticles";
import BackToTopButton from "@/components/BackToTopButton";
import LinkAnchorTracker from "@/components/LinkAnchorTracker";
import ArticleHero from "@/components/ArticleHero";
import ArticleBody from "@/components/ArticleBody";

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
        <div className="h-full mx-4 smartphone:mx-10 tablet:mx-20">
          <div className="h-full w-full max-w-webpage mx-auto grid grid-cols-[minmax(300px,1fr)] tablet:gap-8 tablet:grid-cols-[minmax(180px,250px)_minmax(500px,1fr)] xl:gap-16 xl:grid-cols-[minmax(180px,250px)_minmax(500px,1fr)_75px]">
            <LinkAnchorTracker {...data} />
            <ArticleBody {...data} />
            <div className="self-start sticky top-1/2 -translate-y-1/2 mt-20 hidden xl:block">
              <BackToTopButton />
            </div>
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

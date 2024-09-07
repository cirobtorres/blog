"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../utils/supabase/server";
import slugify from "../functions/slugify";

const submitArticle = async (
  blogUser: { id: string; privileges: number },
  title: string,
  subtitle: string,
  body: string
) => {
  const supabase = createClient();

  if (!body) {
    console.log(
      "src/lig/article.ts: submitArticle error - body cannot be empty"
    ); // TODO: needs treatment
    return;
  }

  const { data: topicsData, error: topicsError } = await supabase
    .from("topics")
    .insert({
      blog_author_id: blogUser.id,
      title,
      sub_title: subtitle,
      slug: slugify(title),
      body,
    });

  if (topicsError) {
    throw topicsError;
  }

  revalidatePath("/artigos", "layout");
  return true;
};

export { submitArticle };

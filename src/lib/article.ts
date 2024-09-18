"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../utils/supabase/server";
import slugify from "../functions/slugify";

const submitArticleCreate = async (
  blogUser: { id: string; privileges: number },
  title: string,
  subtitle: string,
  body: string,
  radioVal: string,
  checkVal: string
) => {
  const supabase = createClient();

  const { data: topicsData, error: topicsError } = await supabase
    .from("topics")
    .insert({
      blog_author_id: blogUser.id,
      title,
      sub_title: subtitle,
      slug: slugify(title),
      body,
      private: radioVal === "private",
      blocked_for_replies: checkVal === "blocked",
    });

  if (topicsError) {
    console.log(topicsError);
    throw topicsError;
  }

  revalidatePath("/artigos", "layout");
  return true;
};

const submitArticleUpdate = async (
  id: string,
  title: string,
  subtitle: string,
  body: string,
  radioVal: string,
  checkVal: string
) => {
  const supabase = createClient();

  const { data: topicsData, error: topicsError } = await supabase
    .from("topics")
    .update({
      title,
      sub_title: subtitle,
      slug: slugify(title),
      body,
      private: radioVal === "private",
      blocked_for_replies: checkVal === "blocked",
    })
    .eq("id", id);

  if (topicsError) {
    console.log(topicsError);
    throw topicsError;
  }

  revalidatePath("/artigos", "layout");
  return true;
};

export { submitArticleCreate, submitArticleUpdate };

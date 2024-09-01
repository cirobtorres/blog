"use server";

import { User } from "@supabase/supabase-js";
import { createClient } from "../utils/supabase/server";
import slugify from "../functions/slugify";

const submitArticle = async (
  user: User,
  title: string,
  subtitle: string,
  body: string
) => {
  const supabase = createClient();

  const { data: topicsData, error: topicsError } = await supabase
    .from("topics")
    .insert({
      auth_users_id: user.id,
      title,
      sub_title: subtitle,
      slug: slugify(title),
      body,
    });

  if (topicsError) {
    console.log("topicsError", topicsError);
    throw topicsError;
  }

  console.log("Funciona!");
};

export { submitArticle };

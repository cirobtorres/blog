"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../utils/supabase/server";
import slugify from "../functions/slugify";

const submitTagCreate = async (state: {}, formData: FormData) => {
  let errors = {};
  const user = formData.get("tag-creator") as string;
  const title = formData.get("tag-name") as string;

  if (!title) {
    Object.assign(errors, {
      title: "Crie uma label para sua tag!",
    });
  }

  if (Object.keys(errors).length) return { ...errors };

  const supabase = createClient();

  const { error: tagError } = await supabase.from("tags").insert({
    // user,
    title,
    slug: slugify(title),
  });

  if (tagError) {
    console.log(tagError);
    if (tagError.code === "23505") {
      Object.assign(errors, {
        title: "Essa tag já existe!",
      });
    }
  }

  if (Object.keys(errors).length) return { ...errors };

  revalidatePath("/");
  return true;
};

export { submitTagCreate };

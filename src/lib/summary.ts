"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../utils/supabase/server";
import slugify from "../functions/slugify";
import { redirect } from "next/navigation";

const submitSummaryCreate = async (state: {}, formData: FormData) => {
  const supabase = createClient();
  let errors = {};

  const blog_author_id = formData.get("blog-author");

  const title = formData.get("summary-title");
  const sub_title = formData.get("summary-subtitle");

  if (!title) {
    Object.assign(errors, {
      title: "Crie um título para seu rascunho!",
    });
  }

  if (!sub_title) {
    Object.assign(errors, {
      sub_title: "Crie um subtítulo para seu rascunho!",
    });
  }

  if (Object.keys(errors).length) return { ...errors };

  const slug = slugify(title as string);

  const { data: summariesData, error: summariesError } = await supabase
    .from("summaries")
    .insert({
      blog_author_id,
      title,
      sub_title,
      slug,
      body: "",
    })
    .select()
    .single();

  if (summariesError) {
    // console.log(summariesError);
    throw summariesError;
  }

  revalidatePath("/painel/rascunhos", "layout");
  redirect(`/painel/rascunhos/criar/${summariesData.slug}/${summariesData.id}`);
};

const submitSummaryUpdate = async (id: string, body: string) => {
  const supabase = createClient();

  const { data: summariesData, error: summariesError } = await supabase
    .from("summaries")
    .update({
      body,
      updated_at: new Date(),
    })
    .eq("id", id);

  if (summariesError) {
    // console.log(summariesError);
    throw summariesError;
  }

  revalidatePath("/painel/rascunhos", "layout");
  redirect("/painel/rascunhos");
};

const summaryDelete = async (id: string) => {
  const supabase = createClient();

  const { error: summariesError } = await supabase
    .from("summaries")
    .delete()
    .eq("id", id);

  if (summariesError) {
    // console.log(summariesError);
    throw summariesError;
  }

  revalidatePath("/painel/rascunhos", "layout");
  return true;
};

export { submitSummaryCreate, submitSummaryUpdate, summaryDelete };

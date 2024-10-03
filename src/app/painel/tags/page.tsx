"use server";

import { createClient } from "@/utils/supabase/server";
import { TagCreate } from "@/components/TagForms";
import TagFiltering from "@/components/TagFiltering";

export default async function TagsPage() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const { data: tags } = await supabase
    .from("tags")
    .select("*")
    .order("updated_at", { ascending: false });

  return (
    <section className="pl-20 tablet:pl-6 pr-8 py-6">
      <div className="border-b border-base-border dark:border-dark-base-border pb-2 mb-2">
        <h1 className="text-3xl uppercase font-extrabold text-base-neutral dark:text-dark-base-neutral">
          Tags
        </h1>
      </div>
      {user && <TagCreate user={user} />}
      <div>
        <h2 className="text-xl font-extrabold text-base-neutral dark:text-dark-base-neutral">
          Todas as tags
        </h2>
        <TagFiltering tags={tags} />
      </div>
    </section>
  );
}

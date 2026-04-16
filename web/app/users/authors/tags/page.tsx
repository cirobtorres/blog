"use server";

import TagCreate from "../../../../components/Authors/Tags/TagCreate";
import TagFilter from "../../../../components/Authors/Tags/TagFilter";
import { Hr } from "../../../../components/utils";

export default async function TagsPage() {
  return (
    <section className="w-full max-w-6xl mx-auto flex flex-col gap-2 p-2">
      <h1 className="text-3xl font-extrabold my-6">Gerenciar Tags</h1>
      <TagCreate />
      <Hr className="my-6" />
      <TagFilter />
    </section>
  );
}

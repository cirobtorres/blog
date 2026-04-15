"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { apiServerUrls } from "../../routing/routes";
import { serverFetch } from "../auth-fetch-actions";

const initialState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export default async function deleteTag(tagId: string) {
  const options = { method: "DELETE" };
  const response = await serverFetch(
    apiServerUrls.tags.root + "/id/" + tagId,
    options,
  );
  if (!response.ok) return { ...initialState, error: "Ocorreu algum erro" };
  revalidateTag("tags", { expire: 0 });
  revalidatePath("/users/authors/tags", "layout");
  return { ...initialState, ok: true, success: "Tag excluída!" };
}

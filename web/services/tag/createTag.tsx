"use server";

import { apiServerUrls } from "../../routing/routes";
import { serverFetch } from "../auth-fetch-actions";
import { revalidatePath, revalidateTag } from "next/cache";

const defaultState: ActionState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export default async function createTag(
  prevState: ActionState,
  formData: FormData,
) {
  try {
    const entries = Object.fromEntries(formData.entries());

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...entries }),
    };

    const response = await serverFetch(apiServerUrls.tags.root, options);

    if (!response.ok) {
      if (response.status === 404) {
        return { ...defaultState, error: "Tag já existe" };
      }
      return { ...defaultState };
    }

    const tag: Tag = await response.json();

    revalidateTag("tags", { expire: 0 });
    revalidatePath("/users/authors/tags", "layout");

    return { ...defaultState, ok: true, success: "Tag salva!", data: tag };
  } catch (e) {
    console.error("createTag error:", e);
    return { ...defaultState, error: "Erro inesperado" };
  }
}

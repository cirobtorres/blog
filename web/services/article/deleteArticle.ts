"use server";

import { revalidatePath } from "next/cache";
import { apiServerUrls } from "../../routing/routes";
import { serverFetch } from "../auth-fetch-actions";

const defaultState: ActionState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export default async function deleteArticle(id: string) {
  try {
    const options: RequestInit = {
      method: "DELETE",
    };
    const response = await serverFetch(
      apiServerUrls.article.id + "/" + id,
      options,
    );
    if (!response.ok) {
      console.error(response.status, response.statusText);
      return { ...defaultState, error: "Não foi possível excluir o artigo" };
    }
    revalidatePath("/users/authors", "layout");
    return { ...defaultState, ok: true, success: "Artigo excluído" };
  } catch (e) {
    console.error("deleteArticle error:", e);
    return { ...defaultState, error: "Ocorreu um erro ao excluir o artigo" };
  }
}

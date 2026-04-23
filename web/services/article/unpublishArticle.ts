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

export default async function unpublishArticle(id: string) {
  try {
    const options: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "DRAFT" }),
      cache: "no-store",
    };
    const response = await serverFetch(
      apiServerUrls.article.id + "/" + id,
      options,
    );
    if (!response.ok) {
      console.error(response.status, response.statusText);
      return {
        ...defaultState,
        error: "Não foi possível despublicar o artigo",
      };
    }
    revalidatePath("/users/authors", "layout");
    return { ...defaultState, ok: true, success: "Artigo despublicado" };
  } catch (e) {
    console.error("unpublishArticle error:", e);
    return {
      ...defaultState,
      error: "Ocorreu um erro ao despublicar o artigo",
    };
  }
}

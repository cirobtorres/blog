"use server";

import { apiServerUrls } from "../../routing/routes";
import { serverFetch } from "../serverFetch";

const saveArticle = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  // FETCH
  const validatedData = Object.fromEntries(formData.entries());
  const { tags } = validatedData;

  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...validatedData,
        tags: JSON.parse(tags as string),
      }),
      cache: "no-store",
    };
    const response = await serverFetch(apiServerUrls.article.root, options);

    if (response.ok) {
      const data: ArticleSave = await response.json();

      return {
        ok: true,
        success: "Artigo salvo com sucesso!",
        error: null,
        data,
      };
    }

    const errorData = await response.json();

    return {
      ok: false,
      success: null,
      error: errorData.message ?? "Erro no servidor",
      data: null,
    };
  } catch (err) {
    console.error("saveArticle:", err);
    return {
      ok: false,
      success: null,
      error: "Falha na comunicação com a API",
      data: null,
    };
  }
};

export { saveArticle };

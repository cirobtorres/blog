"use server";

import { apiServerUrls } from "../../routing/routes";
import { serverFetch } from "../auth-fetch-actions";

const publishArticle = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  // FETCH
  const validatedData = Object.fromEntries(formData.entries());
  const { tags } = validatedData;

  try {
    const response = await serverFetch(apiServerUrls.article.root, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...validatedData,
        tags: JSON.parse(tags as string),
      }),
      cache: "no-store",
    });

    if (response.ok) {
      const data: ArticleCreate = await response.json();
      return {
        ok: true,
        success: "Artigo criado com sucesso!",
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
    console.error("publishArticle:", err);
    return {
      ok: false,
      success: null,
      error: "Falha na comunicação com a API",
      data: null,
    };
  }
};

export { publishArticle };

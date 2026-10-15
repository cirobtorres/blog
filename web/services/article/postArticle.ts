"use server";

import { apiServerUrls } from "../../routing/routes";
import { serverFetch } from "../serverFetch";

export default async function postArticle(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
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

    if (errorData.status === 409) {
      const message: string = errorData.message ?? "";
      const isSlug = message.includes("slug");
      if (isSlug) {
        return {
          ok: false,
          success: null,
          error: isSlug
            ? "Já existe um artigo com este slug. Escolha outro."
            : "Já existe um registro com estes dados.",

          data: null,
        };
      }
      // Generic 409
      return {
        ok: false,
        success: null,
        error: "Erro ao salvar artigo",
        data: null,
      };
    }

    return {
      ok: false,
      success: null,
      error: "Erro ao salvar artigo",
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
}

"use server";

import { apiServerUrls } from "../../routing/routes";
import * as z from "zod";
import { publishArticleSchema } from "./zod-validations";
import { serverFetch } from "../auth-fetch-actions";

const publishArticleValidation = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const rawData = Object.fromEntries(formData.entries());

  const result = publishArticleSchema.safeParse({
    ...rawData,
  });

  if (!result.success) {
    const error = z.treeifyError(result.error).properties;
    return {
      ok: false,
      success: null,
      error,
      data: null,
    };
  }

  // const { title, subtitle, slug, banner } = result.data;

  return {
    ok: true,
    success: null,
    error: null,
    data: null,
  };
};

const publishArticle = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  // FETCH
  const validatedData = Object.fromEntries(formData.entries());

  try {
    const response = await serverFetch(apiServerUrls.article.root, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...validatedData }),
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

export { publishArticleValidation, publishArticle };

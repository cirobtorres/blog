"use server";

import * as z from "zod";

const signUpSchema = z.object({
  profileId: z.string().min(1, "ID do perfil é obrigatório"),
  articleTitle: z
    .string()
    .min(5, "O título deve ter pelo menos 5 caracteres")
    .max(128, "Título muito longo"),
  articleSubtitle: z.string().min(1, "O subtítulo é obrigatório"),
  articleBody: z.string().refine((val) => {
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) && parsed.length > 0;
    } catch {
      return false;
    }
  }, "O corpo do artigo deve conter conteúdo válido"),
});

const publishArticle = async (
  prevState: ArticleState,
  formData: FormData,
): Promise<ArticleState> => {
  const isProd = process.env.NODE_ENV === "production";
  const rawData = Object.fromEntries(formData.entries());

  console.log(rawData);

  const result = signUpSchema.safeParse({
    ...rawData,
  });

  if (!result.success) {
    const error = z.treeifyError(result.error).properties;

    console.log(error);

    return {
      ok: false,
      success: null,
      error,
      data: null,
    };
  }

  const { profileId, articleTitle, articleSubtitle, articleBody } = result.data;

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    ok: true,
    success: "Hello world!",
    error: null,
    data: {
      id: "123",
      link: "/articles/2025/12/11/hello-world",
      updated_at: new Date(),
    },
  };
};

export { publishArticle };

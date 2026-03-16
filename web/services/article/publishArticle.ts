"use server";

import * as z from "zod";

const HtmlBlockSchema = z.object({
  type: z.literal("html"),
  id: z.string(),
  locked: z.boolean(),
  data: z.object({
    body: z.string().min(10, "O texto do bloco é muito curto"),
  }),
});

const CodeBlockSchema = z.object({
  type: z.literal("code"),
  id: z.string(),
  locked: z.boolean(),
  data: z.object({
    filename: z.string().optional(),
    code: z.string().min(1, "O código não pode estar vazio"),
    language: z.string(),
  }),
});

const ImageBlockSchema = z.object({
  type: z.literal("image"),
  id: z.string(),
  locked: z.boolean(),
  data: z.object({
    url: z.url("URL da imagem inválida"),
    alt: z.string().min(1, "Texto alternativo é obrigatório"),
  }),
});

// Object "Union" decides which schema to use based on attribute "type"
const BlockSchema = z.discriminatedUnion("type", [
  HtmlBlockSchema,
  CodeBlockSchema,
  ImageBlockSchema,
  // More schemas here...
]);

const signUpSchema = z.object({
  profileId: z.string().min(1, "ID do perfil é obrigatório"),
  title: z
    .string()
    .min(5, "O título deve ter pelo menos 5 caracteres")
    .max(128, "Título muito longo"),
  subtitle: z.string().min(1, "O subtítulo é obrigatório"),
  body: z.preprocess(
    (val) => {
      // Tries to transform a string JSON into an object before validates it
      try {
        return typeof val === "string" ? JSON.parse(val) : val;
      } catch {
        return [];
      }
    },
    z.array(BlockSchema).min(1, "Adicione pelo menos um bloco ao artigo"),
  ),
});

const publishArticle = async (
  prevState: ArticleState,
  formData: FormData,
): Promise<ArticleState> => {
  const isProd = process.env.NODE_ENV === "production";
  const rawData = Object.fromEntries(formData.entries());

  const result = signUpSchema.safeParse({
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

  const { profileId, title, subtitle, body } = result.data;

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

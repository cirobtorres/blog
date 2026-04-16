import * as z from "zod";

const publishArticleSchema = z.object({
  title: z
    .string()
    .min(5, "O título deve ter pelo menos 5 caracteres")
    .max(128, "Título muito longo"),
  subtitle: z.string().min(1, "O subtítulo é obrigatório"),
  slug: z
    .string()
    .min(5, "A slug deve ter pelo menos 5 caracteres")
    .max(128, "Slug muito longa"),
  tags: z
    .string()
    .transform((str, ctx) => {
      try {
        return JSON.parse(str);
      } catch (e) {
        ctx.addIssue({ code: "custom", message: "Invalid JSON" });
        return z.NEVER;
      }
    })
    .pipe(z.array(z.string()).min(1, "Adicione ao menos uma tag")),
  banner: z.uuid("Você precisa selecionar uma imagem"),
  // body: z.preprocess(
  //   (val) => {
  //     try {
  //       return typeof val === "string" ? JSON.parse(val) : val;
  //     } catch {
  //       return [];
  //     }
  //   },
  //   z
  //     .array(BlockSchema)
  //     .min(1, "Adicione pelo menos um bloco ao artigo")
  //     .transform((blocks) => blocks.filter((block) => !block.locked)),
  // ),
});

const HtmlBlockSchema = z
  .object({
    type: z.literal("html"),
    id: z.string(),
    locked: z.boolean(),
    data: z.object({
      body: z.string(),
    }),
  })
  .superRefine((val, ctx) => {
    if (val.data.body.length < 1) {
      ctx.addIssue({
        code: "custom",
        path: ["data", "body"],
        message: `O bloco de texto ${val.id} não pode ser vazio`,
      });
    }
  });

const CodeBlockSchema = z
  .object({
    type: z.literal("code"),
    id: z.string(),
    locked: z.boolean(),
    data: z.object({
      filename: z.string().optional(),
      code: z.string(),
      language: z.string(),
    }),
  })
  .superRefine((val, ctx) => {
    if (val.data.code.length < 1) {
      ctx.addIssue({
        code: "custom",
        path: ["data", "code"],
        message: `O bloco de código ${val.id} não pode ser vazio`,
      });
    }
  });

const ImageBlockSchema = z
  .object({
    type: z.literal("image"),
    id: z.string(),
    locked: z.boolean(),
    data: z.object({
      url: z.url("URL da imagem inválida"),
      alt: z.string().min(1, "Texto alternativo é obrigatório"),
    }),
  })
  .superRefine((val, ctx) => {
    if (!val.data.url.startsWith("https://")) {
      ctx.addIssue({
        code: "custom",
        path: ["data", "url"],
        message: `O bloco de imagem ${val.id} não pode ter URL vazia`,
      });
    }
    if (val.data.alt.length < 1) {
      ctx.addIssue({
        code: "custom",
        path: ["data", "alt"],
        message: `O bloco de imagem ${val.id} não pode ter ALT vazia`,
      });
    }
  });

// Object "Union" decides which schema to use based on attribute "type"
const BlockSchema = z.discriminatedUnion("type", [
  HtmlBlockSchema,
  CodeBlockSchema,
  ImageBlockSchema,
  // More schemas here...
]);

export { publishArticleSchema };

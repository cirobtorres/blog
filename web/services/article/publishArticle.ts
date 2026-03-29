"use server";

import { cookies } from "next/headers";
import * as z from "zod";
import {
  applySpringCookies,
  extractPayload,
  extractTokenFromHeader,
} from "../helpers/serve-actions";
import { apiServerUrls } from "../../routing/routes";
import { NextResponse } from "next/server";

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

const publishArticleSchema = z.object({
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
    z
      .array(BlockSchema)
      .min(1, "Adicione pelo menos um bloco ao artigo")
      // FILTER: Removes blocks with locked === true
      .transform((blocks) => blocks.filter((block) => !block.locked)),
  ),
});

const publishArticleValidation = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  // const isProd = process.env.NODE_ENV === "production";
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

  const { title, subtitle, body } = result.data;

  return {
    ok: true,
    success: null,
    error: null,
    data: {
      title,
      subtitle,
      body,
    },
  };
};

const publishArticle = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const isProd = process.env.NODE_ENV === "production";

  const cookieStore = await cookies();
  let accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  // 1. Authentication
  let payload: AuthTokensPayload | null = null;
  let isExpired = true;

  if (accessToken) {
    try {
      payload = extractPayload(accessToken);
      isExpired = payload.exp < Math.floor(Date.now() / 1000);
    } catch {
      isExpired = true;
    }
  }

  // 1.1 Refresh, if expired
  if ((isExpired || !accessToken) && refreshToken) {
    const refreshRes = await fetch(apiServerUrls.refresh, {
      method: "POST",
      headers: { Cookie: `refresh_token=${refreshToken}` },
    });

    if (refreshRes.ok) {
      const setCookieHeader = refreshRes.headers.get("set-cookie");
      if (setCookieHeader) {
        // 1.2 New access_token
        accessToken =
          extractTokenFromHeader(setCookieHeader, "access_token") ||
          accessToken;

        // 1.3 Synchronizes new cookies with browser
        const tempRes = NextResponse.next();
        applySpringCookies(tempRes, setCookieHeader);
        const newCookies = tempRes.cookies.getAll();
        for (const cookie of newCookies) {
          (await cookies()).set(cookie.name, cookie.value, cookie);
        }

        // 1.4 Gets new Payload (valid one this time)
        if (accessToken) payload = extractPayload(accessToken);
      }
    }
  }

  // 2. Authority
  const isAuthor = payload?.authorities?.includes("AUTHOR");
  if (!accessToken || !isAuthor) {
    // if (!isProd) {
    //   console.error(
    //     "publishArticle: !accessToken || !isAuthor",
    //     !accessToken,
    //     !isAuthor,
    //   );
    // }
    return {
      ok: false,
      success: null,
      error: "Acesso negado ou sessão expirada.",
      data: null,
    };
  }

  // 3. Fetch
  const validatedData = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(apiServerUrls.article.create, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${accessToken}`,
      },
      body: JSON.stringify({ ...validatedData }),
      cache: "no-store",
    });

    if (response.ok) {
      return {
        ok: true,
        success: "Artigo criado com sucesso!",
        error: null,
        data: {},
      };
    }

    const errorData = await response.json();

    // if (!isProd) {
    //   console.error("publishArticle: errorData", errorData);
    // }

    return {
      ok: false,
      success: null,
      error: errorData.message || "Erro no servidor",
      data: null,
    };
  } catch (err) {
    if (!isProd) {
      console.error("publishArticle:", err);
    }
    return {
      ok: false,
      success: null,
      error: "Falha na comunicação com a API",
      data: null,
    };
  }
};

export { publishArticleValidation, publishArticle };

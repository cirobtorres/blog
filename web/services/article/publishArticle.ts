"use server";

import { cookies } from "next/headers";
import {
  applySpringCookies,
  extractPayload,
  extractTokenFromHeader,
} from "../helpers/serve-actions";
import { apiServerUrls } from "../../routing/routes";
import { NextResponse } from "next/server";
import * as z from "zod";
import { publishArticleSchema } from "./zod-validations";

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

  const { title, subtitle, slug, banner, body } = result.data;

  return {
    ok: true,
    success: null,
    error: null,
    data: {
      title,
      subtitle,
      slug,
      banner,
      body,
    },
  };
};

const publishArticle = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;
  let accessToken = cookieStore.get("access_token")?.value;

  // AUTHENTICATION
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

  // REFRESH
  if ((isExpired || !accessToken) && refreshToken) {
    const refreshRes = await fetch(apiServerUrls.refresh, {
      method: "POST",
      headers: { Cookie: `refresh_token=${refreshToken}` },
    });

    if (refreshRes.ok) {
      const setCookieHeader = refreshRes.headers.get("set-cookie");
      if (setCookieHeader) {
        // ACCESS_TOKEN
        accessToken =
          extractTokenFromHeader(setCookieHeader, "access_token") ||
          accessToken;

        const tempRes = NextResponse.next();
        applySpringCookies(tempRes, setCookieHeader);
        const newCookies = tempRes.cookies.getAll();
        for (const cookie of newCookies) {
          (await cookies()).set(cookie.name, cookie.value, cookie);
        }

        if (accessToken) payload = extractPayload(accessToken);
      }
    }
  }

  // AUTHORITY
  const isAuthor = payload?.authorities?.includes("AUTHOR");
  if (!accessToken || !isAuthor) {
    return {
      ok: false,
      success: null,
      error: "Acesso negado ou sessão expirada.",
      data: null,
    };
  }

  // FETCH
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

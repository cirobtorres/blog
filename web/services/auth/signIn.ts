"use server";

import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import {
  extractTokenFromHeader,
  parseSetCookie,
} from "../helpers/serve-actions";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { apiServerUrls, publicWebUrls } from "../../routing/routes";
import * as z from "zod";

const signUpSchema = z.object({
  email: z.email("E-mail inválido").trim().toLowerCase(),
  password: z.string().min(8, "Mínimo de 6 e máximo de 32 caracteres"),
});

const signIn = async (
  prevState: SignInActionState,
  formData: FormData,
): Promise<SignInActionState> => {
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
    };
  }

  const { email, password } = result.data;

  const response = await fetch(apiServerUrls.login, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  if (response.ok) {
    const cookieStore = await cookies();
    const setCookieHeader = response.headers.get("set-cookie");
    let accessToken = "";

    if (setCookieHeader) {
      accessToken =
        extractTokenFromHeader(setCookieHeader, "access_token") || "";
      const rawCookies = parseSetCookie(setCookieHeader);
      rawCookies.forEach((cookieStr) => {
        // Splits name/value of properties (Path, HttpOnly, etc)
        const [nameValue, ...attributes] = cookieStr
          .split(";")
          .map((s) => s.trim());
        const [name, value] = nameValue.split("=");

        // Maps attributes to Next.js format
        const options: Partial<ResponseCookie> = {
          httpOnly: true,
          secure: isProd,
          path: "/",
          sameSite: isProd ? "strict" : "lax",
        };

        const maxAgeAttr = attributes.find((a) =>
          a.toLowerCase().startsWith("max-age"),
        );
        if (maxAgeAttr) {
          options.maxAge = parseInt(maxAgeAttr.split("=")[1]);
        }

        cookieStore.set(name, value, options);
      });
    }

    const userResponse = await fetch(apiServerUrls.me, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (userResponse.ok) {
      const userData = await userResponse.json();
      if (!userData.isProviderEmailVerified) {
        return redirect(publicWebUrls.validateEmail);
      }
    }
    const headersList = await headers();
    let redirectUrl = "/";
    const referer = headersList.get("referer");
    if (referer) {
      const refererUrl = new URL(referer);
      const callbackPath =
        refererUrl.searchParams.get("redirect") ||
        refererUrl.searchParams.get("callback");

      if (callbackPath) {
        redirectUrl = callbackPath.startsWith("/")
          ? decodeURIComponent(callbackPath)
          : "/";
      }
    }
    return redirect(redirectUrl);
  }

  if (!isProd) {
    console.error("signIn", response);
  }

  if (
    response.status === 400 ||
    response.status === 404 ||
    response.status === 401 || // Ex: Invalid email type format
    response.status === 409 // Ex: Wrong email/password
  ) {
    return {
      ok: false,
      success: null,
      error: {
        email: {
          errors: ["Email ou senha não existem"],
        },
        password: {
          errors: ["Email ou senha não existem"],
        },
      },
    };
  } else
    return {
      ok: false,
      success: null,
      error: {
        form: {
          errors: ["Ocorreu um erro inesperado. Tente mais tarde"],
        },
      },
    };
};

export { signIn };

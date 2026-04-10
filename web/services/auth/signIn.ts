"use server";

import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { extractTokenFromHeader, parseSetCookie } from "../helpers/server";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import {
  apiServerUrls,
  protectedWebUrls,
  publicWebUrls,
} from "../../routing/routes";
import * as z from "zod";
import { revalidatePath } from "next/cache";

const signInSchema = z.object({
  email: z.email("E-mail inválido").trim().toLowerCase(),
  password: z.string().min(8, "Mínimo de 6 e máximo de 32 caracteres"),
});

const returnState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

const signIn = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const isProd = process.env.NODE_ENV === "production";
  const rawData = Object.fromEntries(formData.entries());

  const result = signInSchema.safeParse({
    ...rawData,
  });

  if (!result.success) {
    const error = z.treeifyError(result.error).properties;

    return {
      ...returnState,
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
      const userData: User = await userResponse.json();
      revalidatePath("/", "layout");
      if (!userData.isProviderEmailVerified) {
        return redirect(publicWebUrls.validateEmail);
      }
      const headersList = await headers();
      let redirectUrl = "/";
      const referer = headersList.get("referer");
      if (referer) {
        const refererUrl = new URL(referer);
        const callbackPath =
          refererUrl.searchParams.get("redirect_url") ||
          refererUrl.searchParams.get("callback");

        if (callbackPath) {
          redirectUrl = callbackPath.startsWith("/")
            ? decodeURIComponent(callbackPath)
            : "/";
        } else {
          if (userData.authorities.includes("AUTHOR")) {
            return redirect(protectedWebUrls.authors);
          }
        }
      }
      return redirect(redirectUrl);
    }
  }

  if (
    response.status === 400 ||
    response.status === 404 ||
    response.status === 401 || // Ex: Invalid email type format
    response.status === 409 // Ex: Wrong email/password
  ) {
    return {
      ...returnState,
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
      ...returnState,
      error: {
        form: {
          errors: ["Ocorreu um erro inesperado. Tente mais tarde"],
        },
      },
    };
};

export { signIn };

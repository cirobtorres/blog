"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  extractTokenFromHeader,
  parseSetCookie,
} from "../helpers/serve-actions";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { apiServerUrls, publicWebUrls } from "../../config/routes";

const signIn = async (
  prevState: SignInActionState,
  formData: FormData,
): Promise<SignInActionState> => {
  const isProd = process.env.NODE_ENV === "production";
  const email = formData.get("email");
  const password = formData.get("password");
  const error: ActionStateError = {
    email: { errors: [] },
    password: { errors: [] },
    form: { errors: [] },
  };

  if (!email) (error.email.errors ??= []).push("Email é obrigatório");
  if (!password) (error.password.errors ??= []).push("Senha é obrigatória");

  // Input type validations
  if (
    Object.keys(error.email.errors).length > 0 ||
    Object.keys(error.password.errors).length
  ) {
    return {
      ok: false,
      success: null,
      error,
    };
  }

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
    return redirect("/");
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
    error.email.errors ??= [];
    error.password.errors ??= [];
    error.email.errors.push("Email ou senha não existem");
    error.password.errors.push("Email ou senha não existem");
  } else {
    (error.form.errors ??= []).push("Erro de autenticação");
  }

  // Server side validations
  if (Object.keys(error).length > 0) {
    return {
      ok: false,
      success: null,
      error,
    };
  }

  return {
    ok: false,
    success: null,
    error: { form: ["Ocorreu um erro inesperado. Tente mais tarde"] },
  };
};

export { signIn };

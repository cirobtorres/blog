"use server";

import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { parseSetCookie } from "../helpers/server";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { apiServerUrls, protectedWebUrls } from "../../routing/routes";
import { revalidatePath } from "next/cache";
import { serverFetch } from "../serverFetch";

const defaultState: ActionState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

function resolveRedirectUrl(
  redirectUrlFromForm: string | null,
  referer: string | null,
  userData: User,
): string {
  const callbackPath =
    redirectUrlFromForm ||
    (referer
      ? new URL(referer).searchParams.get("redirect_url") ||
        new URL(referer).searchParams.get("callback")
      : null);

  if (callbackPath) {
    const decoded = decodeURIComponent(callbackPath);
    if (decoded.startsWith("/")) {
      return decoded;
    }
  }

  if (userData.authorities.includes("AUTHOR")) {
    return protectedWebUrls.authors;
  }

  return "/";
}

const signIn = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const isProd = process.env.NODE_ENV === "production";
  const {
    email,
    password,
    modal,
    redirect_url: redirectUrlFromForm,
  } = Object.fromEntries(formData.entries());
  const isModal = modal === "true";

  const options: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  };

  const response = await serverFetch(apiServerUrls.login, options);

  if (response.ok) {
    const cookieStore = await cookies();
    const setCookieHeader = response.headers.get("set-cookie");

    if (setCookieHeader) {
      const rawCookies = parseSetCookie(setCookieHeader);
      rawCookies.forEach((cookieStr) => {
        const [nameValue, ...attributes] = cookieStr
          .split(";")
          .map((s) => s.trim());
        const [name, value] = nameValue.split("=");

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

    const userResponse = await serverFetch(apiServerUrls.me, {
      cache: "no-store",
    });

    if (userResponse.ok) {
      const userData: User = await userResponse.json();

      const headersList = await headers();
      const referer = headersList.get("referer");

      const redirectUrl = resolveRedirectUrl(
        typeof redirectUrlFromForm === "string" ? redirectUrlFromForm : null,
        referer,
        userData,
      );

      if (isModal) {
        return {
          ok: true,
          success: "signed-in",
          error: null,
          data: { redirectUrl },
        };
      }

      revalidatePath("/", "layout");
      return redirect(redirectUrl);
    }
  }

  if ([400, 401, 404, 409].includes(response.status)) {
    return {
      ...defaultState,
      error: {
        email: { errors: ["E-mail ou senha incorretos"] },
        password: { errors: ["E-mail ou senha incorretos"] },
      },
    };
  }

  return {
    ...defaultState,
    error: {
      form: { errors: ["Ocorreu um erro inesperado. Tente mais tarde"] },
    },
  };
};

export { signIn };

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
import { revalidatePath } from "next/cache";
import { serverFetch } from "../serverFetch";

const defaultState = {
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
      if (!userData.isProviderEmailVerified) {
        return redirect(publicWebUrls.validateEmail);
      }
      const headersList = await headers();
      const referer = headersList.get("referer");
      const redirectUrl = resolveRedirectUrl(
        typeof redirectUrlFromForm === "string" ? redirectUrlFromForm : null,
        referer,
        userData,
      );

      if (isModal) {
        // Skip revalidatePath: it refetches the layout while the intercepted
        // sign-in URL is still active and remounts @signInModal before the
        // client hard-navigation runs. The full page load refreshes auth state.
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

  if (
    response.status === 400 ||
    response.status === 404 ||
    response.status === 401 || // Ex: Invalid email type format
    response.status === 409 // Ex: Wrong email/password
  ) {
    return {
      ...defaultState,
      error: {
        email: {
          errors: ["Email ou senha incorretos"],
        },
        password: {
          errors: ["Email ou senha incorretos"],
        },
      },
    };
  } else
    return {
      ...defaultState,
      error: {
        form: {
          errors: ["Ocorreu um erro inesperado. Tente mais tarde"],
        },
      },
    };
};

export { signIn };

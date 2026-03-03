"use server";

import { cookies } from "next/headers";
import { apiServerUrls } from "../../urls";
import * as z from "zod";
import { extractTokenFromHeader } from "../helpers/serve-actions";

const signUpSchema = z.object({
  vCode: z
    .string()
    .length(6)
    .regex(/^[A-Z0-9]+$/),
});

const validateOTP = async (
  prevState: ValidateEmailActionState,
  formData: FormData,
): Promise<ValidateEmailActionState> => {
  const isProd = process.env.NODE_ENV === "production";
  const { vCode } = Object.fromEntries(formData.entries());

  const result = signUpSchema.safeParse({
    vCode,
  });

  if (!result.success) {
    const error = z.treeifyError(result.error).properties;

    return {
      ok: false,
      success: null,
      error,
    };
  }

  const cookieStore = await cookies();

  async function callSpringValidation(token: string | undefined) {
    return await fetch(apiServerUrls.emailCode, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: vCode }),
    });
  }

  const accessToken = cookieStore.get("access_token")?.value;
  let response = await callSpringValidation(accessToken);

  if (!isProd) {
    console.error(
      "!accessToken || response.status === 401",
      !accessToken || response.status === 401,
    );
  }

  if (!accessToken || response.status === 401) {
    const refreshToken = cookieStore.get("refresh_token")?.value;
    if (!isProd) {
      console.error("refreshToken", refreshToken);
    }
    if (refreshToken) {
      const refreshRes = await fetch(apiServerUrls.refresh, {
        method: "POST",
        headers: { Cookie: `refresh_token=${refreshToken}` },
      });

      if (!isProd) {
        console.error("refreshRes", refreshRes);
        console.error("refreshRes.ok", refreshRes.ok);
      }

      if (refreshRes.ok) {
        const setCookie = refreshRes.headers.get("set-cookie");
        if (setCookie) {
          if (!isProd) {
            console.error("setCookie", setCookie);
          }
          const newAccessToken = extractTokenFromHeader(
            setCookie,
            "access_token",
          );
          if (!isProd) {
            console.error("newAccessToken", newAccessToken);
          }
          if (newAccessToken) {
            response = await callSpringValidation(newAccessToken);
            if (!isProd) {
              console.error("Último response", response);
            }
          }
        }
      }
    }
  }

  // SUCCESS--------------------------------------------------
  if (response.ok) {
    return { ok: true, success: null, error: null };
  }

  // ERRORS--------------------------------------------------
  if (!isProd) {
    console.error(response);
  }

  const error: ActionStateError = {
    form: { errors: [] },
  };

  // access_token + refresh_token expired
  if (response.status === 401) {
    error.form.errors ??= [];
    error.form.errors.push("Sessão encerrada. Você precisa fazer o login");
  }

  // Not found: token does not exist
  // Conflict: it's not his token
  if (
    response.status === 404 ||
    response.status === 409 ||
    response.status === 410
  ) {
    error.form.errors ??= [];
    error.form.errors.push("Código inválido ou expirado");
  }

  return {
    ok: false,
    success: null,
    error:
      error.form.errors.length > 0
        ? error
        : {
            form: { errors: ["Ocorreu um erro inesperado no servidor"] },
          },
  };
};

export { validateOTP };

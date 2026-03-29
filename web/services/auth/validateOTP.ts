"use server";

import { cookies } from "next/headers";
import { apiServerUrls } from "../../routing/routes";
import { extractTokenFromHeader } from "../helpers/serve-actions";
import * as z from "zod";

const validateOtpSchema = z.object({
  code: z
    .string()
    .length(6)
    .regex(/^[A-Z0-9]+$/),
});

const validateOTP = async (
  prevState: ValidateEmailActionState,
  formData: FormData,
): Promise<ValidateEmailActionState> => {
  const isProd = process.env.NODE_ENV === "production";
  const { code } = Object.fromEntries(formData.entries());

  const result = validateOtpSchema.safeParse({
    code,
  });

  if (!result.success) {
    return {
      ok: false,
      success: null,
      error: {
        code: {
          errors: ["Código inválido"],
        },
      },
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
      body: JSON.stringify({ token: code }),
    });
  }

  const accessToken = cookieStore.get("access_token")?.value;
  let response = await callSpringValidation(accessToken);

  if (!accessToken || response.status === 401) {
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (refreshToken) {
      const refreshRes = await fetch(apiServerUrls.refresh, {
        method: "POST",
        headers: { Cookie: `refresh_token=${refreshToken}` },
      });

      if (refreshRes.ok) {
        const setCookie = refreshRes.headers.get("set-cookie");

        if (setCookie) {
          const newAccessToken = extractTokenFromHeader(
            setCookie,
            "access_token",
          );

          if (newAccessToken) {
            response = await callSpringValidation(newAccessToken);
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

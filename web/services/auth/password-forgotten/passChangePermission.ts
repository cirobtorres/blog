"use server";

import * as z from "zod";
import { apiServerUrls } from "../../../routing/routes";
import { cookies } from "next/headers";

const passChangeSchema = z.object({
  code: z
    .string()
    .length(6)
    .regex(/^[A-Z0-9]+$/),
});

const passChangePermission = async (
  prevState: PassChangePermissionActionState,
  formData: FormData,
): Promise<PassChangePermissionActionState> => {
  const isProd = process.env.NODE_ENV === "production";
  const { code } = Object.fromEntries(formData.entries());

  const result = passChangeSchema.safeParse({
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

  const { code: token } = result.data;

  const response = await fetch(apiServerUrls.passResetCode, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
    credentials: "include",
    cache: "no-store",
  });

  if (!isProd) {
    console.error(response);
  }

  if (response.ok) {
    const cookieStore = await cookies();
    const setCookieHeader = response.headers.get("set-cookie");

    if (setCookieHeader) {
      // Extrai apenas o valor do reset_password_token
      const tokenValue = setCookieHeader
        .split(",")
        .find((c) => c.trim().startsWith("reset_password_token="))
        ?.split(";")[0]
        .split("=")[1];

      if (tokenValue) {
        cookieStore.set("reset_password_token", tokenValue, {
          httpOnly: true,
          secure: isProd,
          sameSite: isProd ? "strict" : "lax",
          path: "/",
          maxAge: 60 * 15, // 15 min
        });
      }

      return {
        ok: true,
        success: "Código validado com sucesso!",
        error: {
          password: {
            errors: null,
          },
        },
      };
    }
  }

  return {
    ok: false,
    success: null,
    error: {
      password: {
        errors: ["Ocorreu um erro inesperado. Tente mais tarde"],
      },
    },
  };
};

export { passChangePermission };

"use server";

import * as z from "zod";
import { apiServerUrls } from "../../../routing/routes";
import { cookies } from "next/headers";

const passChangeSchema = z.object({
  password: z.string().min(8, "Mínimo de 6 e máximo de 32 caracteres"),
});

const passChange = async (
  prevState: PassChangeActionState,
  formData: FormData,
): Promise<PassChangeActionState> => {
  const isProd = process.env.NODE_ENV === "production";
  const { password } = Object.fromEntries(formData.entries());

  const result = passChangeSchema.safeParse({
    password,
  });

  if (!result.success) {
    const error = z.treeifyError(result.error).properties;

    return {
      ok: false,
      success: null,
      error,
    };
  }

  const { password: validPassword } = result.data;

  const cookieStore = await cookies();
  const resetToken = cookieStore.get("reset_password_token")?.value;

  // Se não houver token, nem tentamos o fetch
  if (!resetToken) {
    return {
      ok: false,
      success: null,
      error: {
        password: {
          errors: ["Sessão de redefinição expirada. Recomece o processo."],
        },
      },
    };
  }

  const response = await fetch(apiServerUrls.passwordReset, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `reset_password_token=${resetToken}`,
    },
    body: JSON.stringify({ password: validPassword }),
    cache: "no-store",
  });

  if (!isProd) {
    console.error(response);
  }

  if (response.ok) {
    cookieStore.delete("reset_password_token");

    return {
      ok: true,
      success: "Senha alterada com sucesso!",
      error: { password: { errors: null } },
    };
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

export { passChange };

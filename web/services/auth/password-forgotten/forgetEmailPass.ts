"use server";

import * as z from "zod";
import { apiServerUrls } from "../../../routing/routes";

const forgetEmailSchema = z.object({
  email: z.email("E-mail inválido").trim().toLowerCase(),
});

const forgetEmailPass = async (
  prevState: ForgetEmailPassActionState,
  formData: FormData,
): Promise<ForgetEmailPassActionState> => {
  const isProd = process.env.NODE_ENV === "production";
  const rawData = Object.fromEntries(formData.entries());
  const error: ActionStateError = {
    email: { errors: [] },
    password: { errors: [] },
    form: { errors: [] },
  };

  const result = forgetEmailSchema.safeParse({
    ...rawData,
    strength: Number(rawData.strength),
  });

  if (!result.success) {
    const error = z.treeifyError(result.error).properties;

    return {
      ok: false,
      success: null,
      error,
    };
  }

  const { email } = result.data;

  const response = await fetch(apiServerUrls.passResetEmailRequest, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
    cache: "no-store",
  });

  if (response.ok) {
    return {
      ok: true,
      success: email,
      error: {
        email: {
          errors: null,
        },
      },
    };
  }

  if (!isProd) {
    console.error(response);
  }

  if (response.status === 409) {
    // Conflict
    // Email does not exist
    // error.email.errors ??= [];
    // error.email.errors.push("Email não existe");
    return {
      ok: true,
      success: email,
      error,
    };
  }

  return {
    ok: false,
    success: null,
    error: {
      email: {
        errors: ["Ocorreu um erro inesperado. Tente mais tarde"],
      },
    },
  };
};

export { forgetEmailPass };

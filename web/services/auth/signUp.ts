"use server";

import { redirect } from "next/navigation";
import { apiServerUrls, publicWebUrls } from "../../routing/routes";
import { cookies } from "next/headers";
import { parseSetCookie } from "../helpers/server";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import * as z from "zod";

const signUpSchema = z.object({
  name: z
    .string()
    .min(3, "Pelo menos 3 caracteres")
    .max(65, "Nome muito longo"),
  email: z.email("E-mail inválido").trim().toLowerCase(),
  password: z.string().min(8, "Mínimo de 6 e máximo de 32 caracteres"),
  strength: z.number().min(4, "Senha muito fraca"),
  termsCheckbox: z.refine((value) => value === "true", {
    message: "Você precisa concordar com as políticas de uso de dados",
  }),
});

const signUp = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const returnState = {
    ok: false,
    success: null,
    error: null,
    data: null,
  };
  const isProd = process.env.NODE_ENV === "production";
  const rawData = Object.fromEntries(formData.entries());

  const result = signUpSchema.safeParse({
    ...rawData,
    strength: Number(rawData.strength),
  });

  if (!result.success) {
    const error = z.treeifyError(result.error).properties;

    return {
      ...returnState,
      error,
    };
  }

  const { name, email, password } = result.data;

  try {
    const response = await fetch(apiServerUrls.register, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
      credentials: "include",
      cache: "no-store",
    });

    // Backend errors
    if (!response.ok) {
      if (response.status === 409) {
        // User exist
        const data = await response.json();
        return {
          ...returnState,
          error: {
            email: {
              errors: [data.message || "Este e-mail já está em uso"],
            },
          },
        };
      }

      if (response.status === 400) {
        // (MethodArgumentNotValidException)
        return {
          ...returnState,
          error: {
            form: { errors: ["Dados inválidos. Verifique os campos."] },
          },
        };
      }

      // 401, 500, etc
      return {
        ...returnState,
        error: {
          form: { errors: ["Ocorreu um erro inesperado no servidor."] },
        },
      };
    }

    const cookieStore = await cookies();
    const setCookieHeader = response.headers.get("set-cookie");

    if (setCookieHeader) {
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

        // Extracts Max-Age if it exists in Spring Cookies
        const maxAgeAttr = attributes.find((a) =>
          a.toLowerCase().startsWith("max-age"),
        );
        if (maxAgeAttr) {
          options.maxAge = parseInt(maxAgeAttr.split("=")[1]);
        }

        cookieStore.set(name, value, options);
      });
    }
  } catch (e) {
    return {
      ...returnState,
      error: { form: { errors: ["Falha na conexão com o servidor"] } },
    };
  }

  redirect(publicWebUrls.validateEmail);
};

export { signUp };

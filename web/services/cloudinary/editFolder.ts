"use server";

import { revalidatePath } from "next/cache";
import { apiServerUrls } from "../../routing/routes";
import * as z from "zod";
import { cookies } from "next/headers";

const signUpSchema = z.object({
  folderName: z.string().min(1, "O diretório requer um nome"),
  folderPath: z.string().min(1, "O diretório requer uma pasta raiz"),
});

export default async function editFolder(
  prevState: ActionState,
  formData: FormData,
) {
  const cookie = await cookies();
  const accessToken = cookie.get("access_token")?.value;
  const rawData = Object.fromEntries(formData.entries());
  const { path } = rawData;

  try {
    const response = await fetch(apiServerUrls.mediaFolders.root, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ path }),
      cache: "no-store",
      next: { tags: ["folders"] },
    });

    if (!response.ok) {
      return {
        ok: false,
        success: null,
        error: "Um erro inesperado aconteceu.",
        data: null,
      };
    }

    revalidatePath("/");

    return {
      ok: true,
      success: "Pasta criada com sucesso!",
      error: null,
      data: path,
    };
  } catch (e) {
    console.error(e);
    return {
      ok: false,
      success: null,
      error: "Ocorreu um erro ao tentar salvar nova pasta.",
      data: null,
    };
  }
}

export async function createFolderValidation(
  prevState: ActionState,
  formData: FormData,
) {
  const rawData = Object.fromEntries(formData.entries());
  const result = signUpSchema.safeParse({
    ...rawData,
  });

  if (!result.success) {
    const error = z.treeifyError(result.error).properties;

    return {
      ok: false,
      success: null,
      error,
      data: null,
    };
  }

  const { folderName, folderPath } = result.data;
  const newPath = `${folderPath}/${folderName}`;

  const cookie = await cookies();
  const accessToken = cookie.get("access_token")?.value;

  try {
    const validation = await fetch(apiServerUrls.mediaFolders.exists, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ path: newPath }),
    });

    if (!validation.ok) {
      if (validation.status === 404) {
        return {
          ok: true,
          success: null,
          error: null,
          data: newPath,
        };
      }
    } else {
      return {
        ok: false,
        success: null,
        error: {
          folderName: { errors: ["Esta pasta já existe neste diretório."] },
        },
        data: null,
      };
    }
  } catch (e) {}
  return {
    ok: false,
    success: null,
    error: {
      folderName: { errors: ["Ocorreu algum erro."] },
    },
    data: null,
  };
}

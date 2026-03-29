"use server";

import { cookies } from "next/headers";
import * as z from "zod";
import { apiServerUrls } from "../../routing/routes";

const folderValidationSchema = z.object({
  folderName: z.string().min(1, "O diretório requer um nome"),
  folderDestination: z.string().min(1, "O diretório requer uma pasta raiz"),
});

export default async function folderValidation(
  prevState: ActionState,
  formData: FormData,
) {
  const rawData = Object.fromEntries(formData.entries());
  const result = folderValidationSchema.safeParse({
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

  const { folderName, folderDestination } = result.data;
  const cloudinaryRoot = "/";
  const fullDestinationPath =
    folderDestination === cloudinaryRoot
      ? `${folderDestination}${folderName}`
      : `${folderDestination}/${folderName}`;

  const cookie = await cookies();
  const accessToken = cookie.get("access_token")?.value;

  try {
    const validation = await fetch(apiServerUrls.mediaFolders.exists, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ path: fullDestinationPath }),
    });

    if (!validation.ok) {
      if (validation.status === 404) {
        return {
          ok: true,
          success: null,
          error: null,
          data: fullDestinationPath,
        };
      }
    } else {
      return {
        ok: false,
        success: null,
        error: {
          folderName: { errors: ["Esta pasta já existe."] },
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

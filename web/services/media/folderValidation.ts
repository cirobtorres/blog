"use server";

import { cookies } from "next/headers";
import * as z from "zod";
import { apiServerUrls } from "../../routing/routes";

const folderValidationSchema = z.object({
  folderName: z.string().min(1, "O diretório requer um nome"),
  folderDestinationId: z.preprocess(
    (value) => (value === "" ? null : value),
    z.string().uuid().nullable().optional(),
  ),
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

  const { folderName, folderDestinationId } = result.data;

  const cookie = await cookies();
  const accessToken = cookie.get("access_token")?.value;

  try {
    const validation = await fetch(apiServerUrls.mediaFolders.exists, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        folderName,
        parentFolderId: folderDestinationId || null,
      }),
    });

    if (validation.ok) {
      const exists = (await validation.json()) as boolean;
      if (!exists) {
        return {
          ok: true,
          success: null,
          error: null,
          data: { folderName, parentFolderId: folderDestinationId || null },
        };
      }
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

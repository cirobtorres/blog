"use server";

import { cookies } from "next/headers";
import { apiServerUrls, protectedWebUrls } from "../../routing/routes";
import { revalidatePath, revalidateTag } from "next/cache";
import { serverFetch } from "../auth-fetch-actions";

export default async function moveFolders(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const cookie = await cookies();
  const accessToken = cookie.get("access_token")?.value;
  const rawData = Object.fromEntries(formData.entries());

  const { folderDestinationId, ...foldersId } = rawData;

  try {
    const response = await serverFetch(apiServerUrls.mediaFolders.move, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        parentFolderId: folderDestinationId || null,
        foldersId,
      }),
    });

    if (!response.ok) {
      return {
        ok: false,
        success: null,
        error: "Um erro inesperado aconteceu.",
        data: null,
      };
    }

    revalidateTag("files", { expire: 0 });
    revalidateTag("folders", { expire: 0 });
    revalidatePath(protectedWebUrls.media);

    return {
      ok: true,
      success: "Pasta(s) atualizada(s) com sucesso!",
      error: null,
      data: null,
    };
  } catch (e) {
    console.error(e);
    return {
      ok: false,
      success: null,
      error: "Ocorreu um erro ao tentar atualizar a(s) pasta(s).",
      data: null,
    };
  }
}

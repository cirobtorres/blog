"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { apiServerUrls, protectedWebUrls } from "../../routing/routes";
import { serverFetch } from "../auth-fetch-actions";

export default async function editFolder(
  prevState: ActionState,
  formData: FormData,
) {
  const rawData = Object.fromEntries(formData.entries());
  const { folderName, currentFolderId, folderDestinationId } = rawData;

  try {
    const response = await serverFetch(apiServerUrls.mediaFolders.root, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newName: folderName,
        parentFolderId: folderDestinationId || null,
        currentFolderId,
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

    revalidateTag("folders", { expire: 0 });
    revalidatePath(protectedWebUrls.media);

    return {
      ok: true,
      success: "Pasta atualizada com sucesso!",
      error: null,
      data: currentFolderId,
    };
  } catch (e) {
    console.error(e);
    return {
      ok: false,
      success: null,
      error: "Ocorreu um erro ao tentar atualizar a pasta.",
      data: null,
    };
  }
}

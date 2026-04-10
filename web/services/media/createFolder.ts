"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { apiServerUrls, protectedWebUrls } from "../../routing/routes";
import { serverFetch } from "../auth-fetch-actions";

export default async function createFolder(
  prevState: ActionState,
  formData: FormData,
) {
  const rawData = Object.fromEntries(formData.entries());
  const { folderName, parentFolderId } = rawData;

  try {
    const response = await serverFetch(apiServerUrls.mediaFolders.root, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        folderName,
        parentFolderId: parentFolderId || null,
      }),
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

    revalidateTag("folders", { expire: 0 });
    revalidatePath(protectedWebUrls.media);

    return {
      ok: true,
      success: "Pasta criada com sucesso!",
      error: null,
      data: folderName,
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

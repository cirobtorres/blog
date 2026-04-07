"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { apiServerUrls } from "../../routing/routes";
import { cookies } from "next/headers";

export default async function createFolder(
  prevState: ActionState,
  formData: FormData,
) {
  const cookie = await cookies();
  const accessToken = cookie.get("access_token")?.value;
  const rawData = Object.fromEntries(formData.entries());
  const { folderName, parentFolderId } = rawData;

  try {
    const response = await fetch(apiServerUrls.mediaFolders.root, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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
    revalidatePath("/users/authors/media");

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

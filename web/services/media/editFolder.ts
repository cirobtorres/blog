"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { apiServerUrls } from "../../routing/routes";
import { cookies } from "next/headers";

export default async function editFolder(
  prevState: ActionState,
  formData: FormData,
) {
  const cookie = await cookies();
  const accessToken = cookie.get("access_token")?.value;
  const rawData = Object.fromEntries(formData.entries());
  const { folderName, currentFolder, folderDestination } = rawData;

  try {
    const response = await fetch(apiServerUrls.mediaFolders.root, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        newName: folderName,
        newDestinationPath: folderDestination,
        currentPath: currentFolder,
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
    revalidatePath("/users/authors/media");

    return {
      ok: true,
      success: "Pasta atualizada com sucesso!",
      error: null,
      data: currentFolder,
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

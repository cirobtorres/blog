"use server";

import { cookies } from "next/headers";
import { apiServerUrls } from "../../routing/routes";
import { revalidatePath, revalidateTag } from "next/cache";

export default async function moveFolders(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const cookie = await cookies();
  const accessToken = cookie.get("access_token")?.value;
  const rawData = Object.fromEntries(formData.entries());

  const { folderDestination, ...foldersId } = rawData;

  try {
    const response = await fetch(apiServerUrls.mediaFolders.move.all, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        folderDestination,
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

    revalidateTag("folders", { expire: 0 });
    revalidatePath("/users/authors/media");

    return {
      ok: true,
      success: "Pasta atualizada com sucesso!",
      error: null,
      data: null,
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

"use server";

import { cookies } from "next/headers";
import { apiServerUrls } from "../../routing/routes";
import { revalidatePath } from "next/cache";

export default async function deleteFolder({
  folderPath,
}: {
  folderPath: string;
}) {
  const cookie = await cookies();
  const accessToken = cookie.get("access_token")?.value;

  try {
    const response = await fetch(apiServerUrls.mediaFolders.root, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ path: folderPath }),
    });
    if (!response.ok) {
      console.error(response.status);
      return {
        ok: false,
        success: null,
        error: "Erro ao tentar deletar a pasta",
        data: null,
      };
    }
  } catch (e) {
    console.error(e);
    return {
      ok: false,
      success: null,
      error: "Erro ao tentar deletar a pasta",
      data: null,
    };
  }

  revalidatePath("/");

  return { ok: true, success: "Pasta excluída!", error: null, data: null };
}

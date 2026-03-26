"use server";

import { cookies } from "next/headers";
import { apiServerUrls } from "../../routing/routes";
import { revalidatePath } from "next/cache";

export default async function deleteFolder(folder: string) {
  const rootFolder = "Home";
  const cookie = await cookies();
  const accessToken = cookie.get("access_token")?.value;
  const returnStatement = {
    ok: false,
    success: null,
    error: null,
    data: null,
  };

  try {
    const response = await fetch(apiServerUrls.mediaFolders.root, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ path: rootFolder + folder }),
    });

    if (!response.ok) {
      switch (response.status) {
        case 404:
          return {
            ...returnStatement,
            error: "Pasta não encontrada.",
          };
        case 401:
          return {
            ...returnStatement,
            error: "Não autorizado.",
          };
      }
      // Fallback: generic return statement
      return {
        ...returnStatement,
        error: "Erro ao deletar a pasta.",
      };
    }
  } catch (e) {
    console.error(e);
    return {
      ...returnStatement,
      error: "Erro ao deletar a pasta.",
    };
  }

  revalidatePath("/");

  return { ...returnStatement, ok: true, success: "Pasta excluída!" };
}

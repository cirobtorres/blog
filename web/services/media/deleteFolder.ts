"use server";

import { cookies } from "next/headers";
import { apiServerUrls, protectedWebUrls } from "../../routing/routes";
import { revalidatePath, revalidateTag } from "next/cache";
import { serverFetch } from "../auth-fetch-actions";

export default async function deleteFolder(folderId: string) {
  const cookie = await cookies();
  const accessToken = cookie.get("access_token")?.value;
  const returnStatement = {
    ok: false,
    success: null,
    error: null,
    data: null,
  };

  try {
    const response = await serverFetch(
      apiServerUrls.mediaFolders.root + "/" + folderId,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

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

  revalidateTag("folders", { expire: 0 });
  revalidatePath(protectedWebUrls.media);

  return { ...returnStatement, ok: true, success: "Pasta excluída!" };
}

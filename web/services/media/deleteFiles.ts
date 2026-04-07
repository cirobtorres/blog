"use server";

import { cookies } from "next/headers";
import { apiServerUrls } from "../../routing/routes";
import { revalidatePath, revalidateTag } from "next/cache";

const returnState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export default async function deleteFiles(
  fileIds: string[],
): Promise<ActionState> {
  const cookie = await cookies();
  const accessToken = cookie.get("access_token")?.value;

  try {
    const response = await fetch(apiServerUrls.media.root, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ fileIds }),
    });

    if (!response.ok) {
      console.error("deleteFiles:", response.status, response.statusText);
      return { ...returnState, error: "Erro ao deletar arquivos" };
    }
  } catch (e) {
    console.error("deleteFiles (error):", e);
    return { ...returnState, error: "Erro ao deletar arquivos" };
  }

  revalidateTag("files", { expire: 0 });
  revalidatePath("/users/authors/media");

  return { ...returnState, ok: true, success: "Arquivos excluídos" };
}

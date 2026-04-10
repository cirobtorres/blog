"use server";

import { cookies } from "next/headers";
import { apiServerUrls, protectedWebUrls } from "../../routing/routes";
import { revalidatePath, revalidateTag } from "next/cache";
import { serverFetch } from "../auth-fetch-actions";

export default async function deleteFile({ id }: { id: string }) {
  const cookie = await cookies();
  const accessToken = cookie.get("access_token")?.value;

  try {
    const response = await serverFetch(apiServerUrls.media.root + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return {
        ok: false,
        success: null,
        error: "Falha ao excluir arquivo.",
        data: null,
      };
    }
  } catch (e) {
    console.error(e);
    return {
      ok: false,
      success: null,
      error: "Falha ao excluir arquivo.",
      data: null,
    };
  }

  revalidateTag("files", { expire: 0 });
  revalidatePath(protectedWebUrls.media);

  return { ok: true, success: "Arquivo excluído!", error: null, data: null };
}

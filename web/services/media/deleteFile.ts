"use server";

import { apiServerUrls } from "../../routing/routes";
import { revalidatePath, revalidateTag } from "next/cache";
import { serverFetch } from "../serverFetch";

export default async function deleteFile({ id }: { id: string }) {
  try {
    const response = await serverFetch(apiServerUrls.media.root + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("deleteFile failed: HTTP", response.status);
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
  revalidateTag("media-files", { expire: 0 });
  revalidatePath("/", "layout");

  return { ok: true, success: "Arquivo excluído!", error: null, data: null };
}

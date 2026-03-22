"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { apiServerUrls } from "../../config/routes";

export default async function editMedia(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const cookie = await cookies();
  const accessToken = cookie.get("access_token")?.value;
  const entries = Object.fromEntries(formData.entries());
  const { id } = entries;

  try {
    const response = await fetch(apiServerUrls.media.root + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return {
        ok: false,
        success: null,
        error: "Falha ao editar arquivo.",
        data: null,
      };
    }
  } catch (e) {
    console.error(e);
    return {
      ok: false,
      success: null,
      error: "Falha ao editar arquivo.",
      data: null,
    };
  }

  revalidatePath("/");

  return { ok: true, success: "Arquivo editado!", error: null, data: null };
}

"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { apiServerUrls, protectedWebUrls } from "../../routing/routes";
import { serverFetch } from "../auth-fetch-actions";

const returnState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export default async function editFile(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const entries = Object.fromEntries(formData.entries());
  const {
    file_0_id: fileId,
    file_0_name: name,
    file_0_caption: caption,
    file_0_alt: alt,
    file_0_folder_id: folderId,
  } = entries;

  try {
    const cookie = await cookies();
    const accessToken = cookie.get("access_token")?.value;
    const response = await serverFetch(
      apiServerUrls.media.root + "/" + fileId,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name,
          caption,
          alt,
          folder: { id: folderId || null },
        }),
      },
    );

    if (!response.ok) {
      return {
        ...returnState,
        error: "Falha ao editar arquivo.",
      };
    }
  } catch (e) {
    console.error(e);
    return {
      ...returnState,
      error: "Falha ao editar arquivo.",
    };
  }

  revalidateTag("files", { expire: 0 });
  revalidatePath(protectedWebUrls.media);

  return {
    ...returnState,
    ok: true,
    success: "Arquivo editado!",
  };
}

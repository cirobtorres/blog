"use server";

import { apiServerUrls } from "../../routing/routes";
import { revalidatePath, revalidateTag } from "next/cache";
import { serverFetch } from "../serverFetch";
import { auth } from "../../keycloak/auth";

export async function createFilesOnDb(uploads: UploadedMedia[]) {
  const mediaDTOs = uploads.map(({ object, name, alt, caption, folderId }) => ({
    name,
    folder: { id: folderId },
    publicId: object.key,
    url: object.url,
    extension: object.extension,
    type: object.type,
    size: object.size,
    width: object.width,
    height: object.height,
    duration: object.duration,
    alt,
    caption,
  }));

  const session = await auth();
  const token = session?.accessToken;

  if (!token)
    return {
      ok: false,
      success: null,
      error: "Erro de autenticação. Token vencido.",
      data: null,
    };

  const response = await serverFetch(apiServerUrls.media.syncImport, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(mediaDTOs),
    cache: "no-store",
  });

  if (response.status === 409) {
    return {
      ok: false,
      success: null,
      error: "Já existe um arquivo com esse nome.",
      data: null,
    };
  }

  if (!response.ok) {
    console.error(
      "createFilesOnDb: Failed to register the uploaded files on the server.",
      response.status,
      response.statusText,
    );
    return {
      ok: false,
      success: null,
      error: "Erro ao salvar os arquivos no servidor.",
      data: null,
    };
  }

  revalidateTag("files", { expire: 0 });
  revalidateTag("media-files", { expire: 0 });
  revalidatePath("/", "layout");

  return {
    ok: true,
    success: "Arquivos salvos com sucesso!",
    error: null,
    data: uploads.map((upload) => upload.object),
  };
}

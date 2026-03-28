"use server";

import { cookies } from "next/headers";
import { apiServerUrls } from "../../routing/routes";
import { revalidatePath } from "next/cache";

export async function createFilesOnDb(cloudinaryResults: CloudinarySave[]) {
  const mediaDTOs = cloudinaryResults.map((res) => ({
    name: res.custom_name,
    folder: { path: res.custom_folder },
    publicId: res.public_id,
    url: res.secure_url,
    extension: res.format,
    type: res.resource_type.toUpperCase() === "VIDEO" ? "VIDEO" : "IMAGE",
    size: res.bytes,
    width: res.width,
    height: res.height,
    duration: res.duration || null,
    alt: res.custom_alt,
    caption: res.custom_caption,
  }));

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken)
    return {
      ok: false,
      success: null,
      error: "Erro de autenticação. Token vencido.",
      data: null,
    };

  const response = await fetch(apiServerUrls.media.syncImport, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(mediaDTOs),
    cache: "no-store",
  });

  if (!response.ok) {
    console.error(
      "syncWithSpringBoot: Failed to sync data between Cloudinary and Server.",
      response.status,
    );
    return {
      ok: false,
      success: null,
      error: "Erro ao salvar os arquivos no servidor.",
      data: null,
    };
  }

  revalidatePath("/users/authors/media");

  return {
    ok: true,
    success: "Arquivos salvos com sucesso!",
    error: null,
    data: cloudinaryResults,
  };
}

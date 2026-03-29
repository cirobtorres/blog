import { getCloudinarySignature } from "./signature";
import { createFilesOnDb } from "../media/createFilesOnDb";

export default async function createFiles({
  files,
  formData,
}: {
  files: File[];
  formData: FormData;
}): Promise<ActionState> {
  try {
    const cloudinaryResults: CloudinarySave[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const alt = formData.get(`file_${i}_alt`) as string;
      const caption = formData.get(`file_${i}_caption`) as string;
      const public_id = formData.get(`file_${i}_name`) as string;
      const folder = formData.get(`file_${i}_folder`) as string;

      const { signature, timestamp, apiKey } = await getCloudinarySignature({
        folder,
        public_id,
      });

      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("api_key", apiKey!);
      cloudinaryFormData.append("timestamp", timestamp.toString());
      cloudinaryFormData.append("signature", signature);
      cloudinaryFormData.append("folder", folder);
      cloudinaryFormData.append("public_id", public_id);
      cloudinaryFormData.append("file", file);

      const endpoint = file.type.startsWith("video") ? "video" : "image";

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${endpoint}/upload`,
        { method: "POST", body: cloudinaryFormData },
      );

      if (!response.ok) {
        const errorData = await response.json();
        return {
          ok: false,
          success: null,
          error: `Cloudinary: ${errorData.error?.message || "Erro no upload."}`,
          data: null,
        };
      }

      const data: Cloudinary = await response.json();

      cloudinaryResults.push({
        ...data,
        custom_name: public_id,
        custom_alt: alt,
        custom_caption: caption,
        custom_folder: "/" + folder,
      });
    }
    return await createFilesOnDb(cloudinaryResults);
  } catch (err) {
    return {
      ok: false,
      success: null,
      error: "Erro no upload.",
      data: null,
    };
  }
}

import { SignApiOptions } from "cloudinary";
import { getCloudinarySignature } from "./signature";

// services/cloudinary/createFile.ts
export default async function createFile(
  file: File,
  metadata: SignApiOptions,
): Promise<CloudinarySave> {
  const { signature, timestamp, apiKey } = await getCloudinarySignature({
    folder: metadata.customFolder,
    public_id: metadata.customName,
  });

  const cloudinaryFormData = new FormData();
  cloudinaryFormData.append("api_key", apiKey!);
  cloudinaryFormData.append("timestamp", timestamp.toString());
  cloudinaryFormData.append("signature", signature);
  cloudinaryFormData.append("folder", metadata.customFolder);
  cloudinaryFormData.append("public_id", metadata.customName);
  cloudinaryFormData.append("file", file);

  const endpoint = file.type.startsWith("video") ? "video" : "image";

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${endpoint}/upload`,
    { method: "POST", body: cloudinaryFormData },
  );

  if (!response.ok) throw new Error("Cloudinary upload fail");

  const data = await response.json();
  return {
    ...data,
    custom_name: metadata.customName,
    custom_alt: metadata.customAlt,
    custom_caption: metadata.customCaption,
    custom_folder: "/" + metadata.customFolder,
  };
}

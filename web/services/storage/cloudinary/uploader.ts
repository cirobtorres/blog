import { getCloudinarySignature } from "./signature";
import { MediaAlreadyExistsError, type MediaUploader } from "../types";

// Cloudinary payload: it must not leak outside this file
type CloudinaryUploadResponse = {
  public_id: string;
  secure_url: string;
  bytes: number;
  format?: string;
  width?: number;
  height?: number;
  duration?: number;
  resource_type: "image" | "video" | "raw";
  existing?: boolean; // Present when overwrite=false and the public_id was already taken
};

// Cloudinary stores audio under the "video" resource type
function endpointOf(file: File): "image" | "video" {
  return file.type.startsWith("video") || file.type.startsWith("audio")
    ? "video"
    : "image";
}

function mediaTypeOf(file: File, data: CloudinaryUploadResponse): MediaType {
  if (file.type.startsWith("audio")) return "AUDIO";
  if (data.resource_type === "video") return "VIDEO";
  if (data.resource_type === "raw") return "RAW";
  return "IMAGE";
}

export const cloudinaryUploader: MediaUploader = {
  async upload(file, { key }) {
    const { signature, timestamp, apiKey } = await getCloudinarySignature(key);

    const formData = new FormData();
    formData.append("api_key", apiKey!);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);
    formData.append("public_id", key);
    formData.append("overwrite", "false");
    formData.append("file", file);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${endpointOf(file)}/upload`,
      { method: "POST", body: formData },
    );

    if (!response.ok) throw new Error("Cloudinary upload fail");

    const data: CloudinaryUploadResponse = await response.json();

    if (data.existing) throw new MediaAlreadyExistsError(key);

    return {
      key: data.public_id,
      url: data.secure_url,
      size: data.bytes,
      extension: data.format ?? file.name.split(".").pop() ?? "",
      type: mediaTypeOf(file, data),
      width: data.width ?? null,
      height: data.height ?? null,
      duration: data.duration ?? null,
    };
  },
};

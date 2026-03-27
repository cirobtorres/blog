"use server";

import { v2 as cloudinary } from "cloudinary";

export async function getCloudinarySignature(
  params: Record<string, string | number | boolean | null | undefined> = {},
) {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    { ...params, timestamp: timestamp },
    process.env.CLOUDINARY_API_SECRET!,
  );

  return {
    signature,
    timestamp,
    apiKey: process.env.CLOUDINARY_API_KEY,
  };
}

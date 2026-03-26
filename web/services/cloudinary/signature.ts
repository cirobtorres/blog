"use server";
import { v2 as cloudinary, SignApiOptions } from "cloudinary";

export async function getCloudinarySignature(params_to_sign?: SignApiOptions) {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const paramsToSign = {
    ...params_to_sign,
    timestamp,
  };

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!,
  );

  return {
    signature,
    timestamp,
    ...params_to_sign,
    apiKey: process.env.CLOUDINARY_API_KEY,
  };
}

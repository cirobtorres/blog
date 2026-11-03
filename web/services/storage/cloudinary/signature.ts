"use server";

import { v2 as cloudinary } from "cloudinary";
import { auth } from "../../../keycloak/auth";
import { MEDIA_KEY_REGEX } from "../keys";

/**
 * Signs an upload for ONE public_id.
 * Server Actions are public POST endpoints, so the caller must be an author and
 * cannot choose which parameters get signed (the previous version signed whatever the client sent).
 */
export async function getCloudinarySignature(key: string) {
  const session = await auth();
  const isAuthor = session?.user?.authorities
    ?.map((role) => role.toUpperCase())
    .includes("AUTHOR");

  if (!session || session.error || !isAuthor) {
    throw new Error("Unauthorized");
  }

  if (!MEDIA_KEY_REGEX.test(key)) {
    throw new Error("Invalid storage key");
  }

  const timestamp = Math.round(new Date().getTime() / 1000);

  // Signed uploads overwrite an existing public_id by default; names must be unique, so never overwrite
  const signature = cloudinary.utils.api_sign_request(
    { public_id: key, overwrite: "false", timestamp },
    process.env.CLOUDINARY_API_SECRET!,
  );

  return {
    signature,
    timestamp,
    apiKey: process.env.CLOUDINARY_API_KEY,
  };
}

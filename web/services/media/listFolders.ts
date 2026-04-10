"use server";

import { apiServerUrls } from "@/routing/routes";
import { serverFetch } from "../auth-fetch-actions";

export default async function listFolders() {
  const response = await serverFetch(`${apiServerUrls.mediaFolders.root}/all`);

  if (!response.ok) {
    console.error("listFolders fetch fail");
    return [];
  }

  return await response.json();
}

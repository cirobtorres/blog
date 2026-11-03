"use server";

import { apiServerUrls } from "../../routing/routes";
import { serverFetch } from "../serverFetch";

/** Files that exist in the storage but are not registered on the database (provider-neutral contract). */
export default async function listOrphanFiles(): Promise<StoredObject[]> {
  const response = await serverFetch(apiServerUrls.media.syncCheck);

  if (!response.ok) {
    console.error("listOrphanFiles fetch fail", response.status);
    return [];
  }

  return await response.json();
}

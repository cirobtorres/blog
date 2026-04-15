"use server";

import { apiServerUrls } from "../../routing/routes";
import { serverFetch } from "../auth-fetch-actions";

export default async function getTags() {
  const tagsResponse = await serverFetch(apiServerUrls.tags.root);
  if (!tagsResponse.ok) return;
  return await tagsResponse.json();
}

"use server";

import { apiServerUrls } from "../../routing/routes";
import { serverFetch } from "../auth-fetch-actions";

const TAG_REVALIDATE_TIME = 60 * 60 * 24 * 7; // 1 week

export default async function getTags() {
  const options: RequestInit = {
    next: { tags: ["tags"], revalidate: TAG_REVALIDATE_TIME },
    cache: "force-cache",
  };
  const tagsResponse = await serverFetch(apiServerUrls.tags.root, options);
  if (!tagsResponse.ok)
    return {
      content: [],
      page: {
        size: 0,
        number: 0,
        totalElements: 0,
        totalPages: 0,
      },
    } as PageableTag;
  return await tagsResponse.json();
}

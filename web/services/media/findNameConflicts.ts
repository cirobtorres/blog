"use server";

import { apiServerUrls } from "../../routing/routes";
import { serverFetch } from "../serverFetch";

/** Names that cannot be used: already taken (ignoring case) or repeated within the list. */
export default async function findNameConflicts(
  names: string[],
): Promise<string[]> {
  const response = await serverFetch(apiServerUrls.media.nameConflicts, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(names),
  });

  if (!response.ok) {
    // Fail closed: do not upload anything when the check could not be done
    throw new Error(`findNameConflicts fail: HTTP ${response.status}`);
  }

  return await response.json();
}

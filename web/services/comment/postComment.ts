"use server";

import { revalidatePath } from "next/cache";
import { apiServerUrls } from "../../routing/routes";
import { serverFetch } from "../auth-fetch-actions";

const defaultState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export default async function postComment({
  articleId,
  articlePath,
  parentId,
  body,
}: {
  articleId: string;
  articlePath: string;
  parentId?: string;
  body: string;
}) {
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ articleId, parentId, body }),
  };

  const response = await serverFetch(apiServerUrls.comment.root, options);

  if (!response.ok) {
    throw new Error(
      `postComment error: ${response.status} ${response.statusText}`,
    );
  }

  revalidatePath(articlePath);
  const result = await response.json();

  return {
    ...defaultState,
    ok: true,
    success: "Comentário salvo!",
    data: result,
  };
}

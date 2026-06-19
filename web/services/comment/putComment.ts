"use server";

import { revalidatePath } from "next/cache";
import { apiServerUrls } from "../../routing/routes";
import { serverFetch } from "../serverFetch";

const defaultState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export default async function putComment({
  commentId,
  parentId,
  identityId,
  articleId,
  body,
  articlePath,
}: CommentSave) {
  const options: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identityId, articleId, parentId, body }),
  };

  const response = await serverFetch(
    apiServerUrls.comment.root + "/id/" + commentId,
    options,
  );

  if (!response.ok) {
    throw new Error(
      `putComment error: ${response.status} ${response.statusText}`,
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

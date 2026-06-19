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

export default async function deleteComment({
  commentId,
  userId,
  articlePath,
}: {
  commentId: string;
  userId: string;
  articlePath: string;
}) {
  const options: RequestInit = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commentId, userId }),
  };

  const response = await serverFetch(
    apiServerUrls.comment.root + "/id/" + commentId,
    options,
  );

  if (!response.ok) {
    throw new Error(
      `deleteComment error: ${response.status} ${response.statusText}`,
    );
  }

  revalidatePath(articlePath);

  return {
    ...defaultState,
    ok: true,
    success: "Comentário excluído!",
    data: commentId,
  };
}

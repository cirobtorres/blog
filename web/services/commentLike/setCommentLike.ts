"use server";

import { apiServerUrls } from "../../routing/routes";
import { serverFetch } from "../serverFetch";

export async function setCommentLike({
  commentId,
  liked,
}: {
  commentId: string;
  liked: boolean;
}) {
  try {
    const response = await serverFetch(
      apiServerUrls.commentLike.root + "/" + commentId,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ liked }),
      },
    );

    if (!response.ok) {
      console.error(
        "setCommentLike fail:",
        response.status,
        response.statusText,
      );
      return { ok: false, error: "Comment like failed" };
    }

    const data: { liked: boolean; likeCount: number } = await response.json();
    return { ok: true, data };
  } catch (error) {
    console.error("setCommentLike error:", error);
    return { ok: false, error: "setCommentLike error" };
  }
}

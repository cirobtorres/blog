"use server";

import { apiServerUrls } from "../../routing/routes";
import { serverFetch } from "../serverFetch";

export async function toggleCommentLike({ commentId }: { commentId: string }) {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await serverFetch(
      apiServerUrls.commentLike.root + "/" + commentId,
      options,
    );

    if (!response.ok) {
      console.error(
        "toggleCommentLike fail:",
        response.ok,
        response.status,
        response.statusText,
      );
      return { ok: false, error: "Comment like failed" };
    }

    const data: { liked: boolean; likeCount: number } = await response.json();

    // revalidatePath("/", "layout");

    return { ok: true, data };
  } catch (error) {
    console.error("toggleCommentLike error:", error);
    return { ok: false, error: "toggleCommentLike error" };
  }
}

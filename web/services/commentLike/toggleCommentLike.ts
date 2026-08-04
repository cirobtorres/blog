"use server";

import { revalidatePath } from "next/cache";
import { apiServerUrls } from "../../routing/routes";
import { serverFetch } from "../serverFetch";

export async function toggleCommentLike(commentId: string) {
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
      return { ok: false, error: "Comment like failed" };
    }

    const data: { liked: boolean; likeCount: number } = await response.json();

    revalidatePath("/", "layout");

    return { ok: true, data };
  } catch (error) {
    console.error("toggleCommentLike error:", error);
    return { ok: false, error: "toggleCommentLike error" };
  }
}

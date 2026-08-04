"use server";

import { revalidatePath } from "next/cache";
import { apiServerUrls } from "../../routing/routes";
import { serverFetch } from "../serverFetch";

export async function toggleArticleLike({ articleId }: { articleId: string }) {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await serverFetch(
      apiServerUrls.articleLike.toggle + "/" + articleId,
      options,
    );

    if (!response.ok) {
      return { ok: false, error: "Article like failed" };
    }

    const data: { liked: boolean; likeCount: number } = await response.json();

    revalidatePath("/", "layout");

    return { ok: true, data };
  } catch (error) {
    console.error("toggleArticleLike error:", error);
    return { ok: false, error: "toggleArticleLike error" };
  }
}

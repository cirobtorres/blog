"use server";

import { revalidatePath } from "next/cache";
import { apiServerUrls } from "../../routing/routes";
import { serverFetch } from "../serverFetch";

export async function setArticleLike({
  articleId,
  liked,
}: {
  articleId: string;
  liked: boolean;
}) {
  try {
    const response = await serverFetch(
      apiServerUrls.articleLike.root + "/" + articleId,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ liked }),
      },
    );

    if (!response.ok) {
      return { ok: false, error: "Article like failed" };
    }

    const data: { liked: boolean; likeCount: number } = await response.json();

    revalidatePath("/", "layout");

    return { ok: true, data };
  } catch (error) {
    console.error("setArticleLike error:", error);
    return { ok: false, error: "setArticleLike error" };
  }
}

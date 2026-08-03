"use server";

import { apiServerUrls } from "../../routing/routes";
import { serverFetch } from "../serverFetch";

const defaultState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export default async function countComments({
  articleId,
}: {
  articleId: string;
}) {
  const options: RequestInit = {};

  const getUrl = `${apiServerUrls.comment.count}/${articleId}`;
  const response = await serverFetch(getUrl, options);

  if (!response.ok) {
    throw new Error(
      `countComments error: ${response.status} ${response.statusText}`,
    );
  }

  const result = (await response.json()) as number;

  return {
    ...defaultState,
    ok: true,
    data: result,
  };
}

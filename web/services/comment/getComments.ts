"use server";

import { apiServerUrls } from "../../routing/routes";
import { serverFetch } from "../auth-fetch-actions";

const defaultState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export default async function getComments({
  articleId,
  page,
  limit,
  repliesLimit,
}: {
  articleId: string;
  page: string;
  limit: string;
  repliesLimit: string;
}) {
  const options: RequestInit = {};

  const query = new URLSearchParams({
    articleId,
    page,
    limit,
    repliesLimit,
  });

  const getUrl = `${apiServerUrls.comment.root}?${query.toString()}`;
  const response = await serverFetch(getUrl, options);

  if (!response.ok) {
    throw new Error(
      `postComment error: ${response.status} ${response.statusText}`,
    );
  }

  const result = (await response.json()) as PageableComments;

  return {
    ...defaultState,
    ok: true,
    data: result,
  };
}

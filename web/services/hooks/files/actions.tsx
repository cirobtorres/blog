"use server";

import { apiServerUrls } from "../../../routing/routes";
import { serverFetch } from "../../auth-fetch-actions";

export async function getFilesAction(
  folder: string,
  page: number,
  size: number = 20,
) {
  const getUrl = `${apiServerUrls.media.root}?folder=${folder}&page=${page}&size=${size}`;
  const countUrl = `${apiServerUrls.media.count}?folder=${folder}`;

  try {
    const [resData, resCount] = await Promise.all([
      serverFetch(getUrl),
      serverFetch(countUrl),
    ]);

    const data: MediaResponsePageable = resData.ok
      ? await resData.json()
      : null;
    const count = resCount.ok ? await resCount.json() : 0;

    return { ...data, count };
  } catch (error) {
    console.error("Erro na Server Action:", error);
    throw new Error("Falha ao buscar arquivos");
  }
}

"use server";

import { apiBrowserUrls } from "../../../routing/routes";
import { serverFetch } from "../../auth-fetch-actions";

export async function getFoldersAction(folder: string) {
  const getUrl = `${apiBrowserUrls.mediaFolders.root}?folder=${folder}`;
  const countUrl = `${apiBrowserUrls.mediaFolders.count}?folder=${folder}`;

  try {
    const [resData, resCount] = await Promise.all([
      serverFetch(getUrl),
      serverFetch(countUrl),
    ]);

    const data: Folder[] = resData.ok ? await resData.json() : null;
    const count = resCount.ok ? await resCount.json() : 0;

    return { folders: data, count };
  } catch (error) {
    console.error("Erro na Server Action:", error);
    throw new Error("Falha ao buscar arquivos");
  }
}

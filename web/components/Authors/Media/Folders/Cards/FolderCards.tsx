"use server";

import { FolderProvider } from "../../../../../providers/FolderProvider";
import { apiServerUrls } from "../../../../../routing/routes";
import FolderListClient from "./FolderListClient";

export default async function FolderCards({
  accessToken,
  currentPath,
}: {
  accessToken?: string;
  currentPath?: string[];
}) {
  const decodedPath = currentPath
    ? currentPath.map((segment) => decodeURIComponent(segment)).join("/")
    : "";

  const folderPath = decodedPath.startsWith("/")
    ? decodedPath
    : "/" + decodedPath;

  const query = new URLSearchParams({
    folder: folderPath,
  });

  const getUrl = `${apiServerUrls.mediaFolders.root}?${query.toString()}`;
  const countUrl = `${apiServerUrls.mediaFolders.count}?${query.toString()}`;

  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    next: { tags: ["folders"] },
  };

  const [folders, count] = await Promise.all([
    fetch(getUrl, options)
      .then((res) => res.json() as Promise<Folder[]>)
      .catch((e) => {
        console.error(e);
        return [];
      }),
    fetch(countUrl, options)
      .then((res) => res.json() as Promise<number>)
      .catch((e) => {
        console.error(e);
        return 0;
      }),
  ]);

  return (
    <FolderProvider>
      <section className="w-full flex flex-col items-start justify-center gap-2">
        <h2 className="text-xl">
          Pasta{count > 1 && "s"}: {count}
        </h2>
        <FolderListClient folders={folders} />
      </section>
    </FolderProvider>
  );
}

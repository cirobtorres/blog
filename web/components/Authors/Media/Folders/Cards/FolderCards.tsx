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
  const currentFolder = currentPath ? "/" + currentPath.join("/") : "/";
  const queryFolder = encodeURIComponent(currentFolder);

  const getUrl = `${apiServerUrls.mediaFolders.root}?folder=${queryFolder}`;
  const countUrl = `${apiServerUrls.mediaFolders.count}?folder=${queryFolder}`;

  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    next: { tags: ["folders"] },
  };

  const [folders, count] = await Promise.all([
    fetch(getUrl, options).then((res) => res.json() as Promise<Folder[]>),
    fetch(countUrl, options).then((res) => res.json() as Promise<number>),
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

"use server";

import { apiServerUrls } from "../../../../../routing/routes";
import FolderCheckbox from "../Header/FolderCheckbox";
import FolderSorting from "../Header/FolderSorting";
import FolderCard from "./FolderCard";
import FolderCardGhost from "./FolderCardGhost";

export default async function FolderCards({
  accessToken,
  currentPath,
}: {
  accessToken?: string;
  currentPath?: string[];
}) {
  const currentFolder = currentPath ? "/" + currentPath.join("/") : "/";
  const queryFolder = encodeURIComponent(currentFolder);

  const mediaFolders = await fetch(
    apiServerUrls.mediaFolders.root + "?folder=" + queryFolder,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ["folders"] },
    },
  );

  const countFolders = await fetch(
    apiServerUrls.mediaFolders.count + "?folder=" + queryFolder,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ["folders"] },
    },
  );

  const folders: Folder[] = (await mediaFolders.json()).map(
    (folder: Folder) => ({
      ...folder,
    }),
  );

  const count: number = await countFolders.json();

  return (
    <section className="w-full flex flex-col items-start justify-center gap-2">
      <h2 className="text-xl">
        Pasta{count > 1 && "s"}: {count}
      </h2>
      <div className="w-full flex justify-between items-center gap-2">
        <FolderCheckbox />
        <FolderSorting />
      </div>
      <div className="w-full grid items-center grid-cols-4 gap-2">
        {folders.length === 0 &&
          Array.from({ length: 4 }).map((_, i) => <FolderCardGhost key={i} />)}
        {folders.map((folder) => (
          <FolderCard key={folder.path} folder={folder} />
        ))}
      </div>
    </section>
  );
}

"use server";

import { apiServerUrls } from "../../../../../routing/routes";
import { DashedBackground } from "../../../../DashedBackground";
import { Skeleton } from "../../../../Skeleton";
import FolderCheckbox from "../Header/FolderCheckbox";
import FolderSorting from "../Header/FolderSorting";
import FolderCard from "./FolderCard";

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
          Array.from({ length: 4 }).map((_, i) => <GhostCard key={i} />)}
        {folders.map((folder) => (
          <FolderCard key={folder.path} folder={folder} />
        ))}
      </div>
    </section>
  );
}

const GhostCard = () => (
  <DashedBackground className="opacity-50 w-full max-w-70 h-18 flex-1 flex shrink-0 items-center gap-2 rounded border not-dark:shadow py-2 px-3 bg-stone-200 dark:bg-stone-900">
    <div className="size-4 shrink-0 border rounded bg-stone-200 dark:bg-stone-800" />
    <div className="size-13 rounded-lg border bg-stone-200 dark:bg-stone-800" />
    <div className="flex flex-1 shrink-0 flex-col gap-1">
      <div className="shrink-0 w-full max-w-14 h-5 border rounded bg-stone-200 dark:bg-stone-800" />
      <div className="shrink-0 w-full max-w-28 h-4 border rounded bg-stone-200 dark:bg-stone-800" />
    </div>
  </DashedBackground>
);

export const FolderCardsLoading = async () => (
  <div className="w-full flex flex-col gap-2">
    <h2 className="text-xl flex items-center">
      Pastas: <Skeleton className="size-6" />
    </h2>
    <div className="w-full flex justify-between items-center gap-2">
      <div className="flex items-center gap-2">
        <Skeleton className="size-6" />
        <Skeleton className="w-14 h-4" />
        <Skeleton className="w-30 h-8" />
        <Skeleton className="w-30 h-8" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="w-40 h-8" />
        <Skeleton className="w-22 h-8" />
      </div>
    </div>
    <div className="w-full grid grid-cols-4 items-center gap-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton
          key={index}
          className="w-full max-w-70 h-18 shrink-0 rounded"
        />
      ))}
    </div>
  </div>
);

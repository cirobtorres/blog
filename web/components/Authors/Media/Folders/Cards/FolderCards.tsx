"use server";

import { FolderProvider } from "../../../../../providers/FolderProvider";
import { apiServerUrls } from "../../../../../routing/routes";
import { DashedBackground } from "../../../../DashedBackground";
import FolderCheckbox from "../Header/FolderCheckbox";
import FolderCard from "./FolderCard";

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
        <div className="w-full flex justify-between items-center gap-2">
          <FolderCheckbox allFolders={folders} />
          {/* <FolderSorting /> */}
        </div>
        <div className="w-full grid grid-cols-4 gap-2">
          <FolderPlaceholders isFolderEmpty={folders.length === 0} />
          {folders.length > 0 &&
            folders.map((folder) => (
              <FolderCard key={folder.id} folder={folder} />
            ))}
        </div>
      </section>
    </FolderProvider>
  );
}

export async function FolderPlaceholders({
  isFolderEmpty,
}: {
  isFolderEmpty: boolean;
}) {
  return (
    isFolderEmpty &&
    Array.from({ length: 4 }).map((_, i) => (
      <DashedBackground
        key={i}
        className="relative opacity-25 w-full max-w-70 h-18 flex-1 flex shrink-0 items-center gap-2 rounded border not-dark:shadow py-2 px-8 bg-stone-200 dark:bg-stone-900 overflow-hidden"
      >
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-neutral-500/50 font-extrabold -rotate-20">
          Placeholder
        </p>
      </DashedBackground>
    ))
  );
}

"use server";

import { FolderProvider } from "../../../../../providers/FolderProvider";
import { apiServerUrls } from "../../../../../routing/routes";
import { cn } from "../../../../../utils/variants";
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
        </div>
        <div
          className={cn(
            "w-full grid grid-cols-4 gap-2",
            folders.length === 0 && "mb-18",
          )}
        >
          {folders.length > 0 &&
            folders.map((folder) => (
              <FolderCard key={folder.id} folder={folder} />
            ))}
        </div>
      </section>
    </FolderProvider>
  );
}

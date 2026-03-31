"use client";

import FolderCheckbox from "../Header/FolderCheckbox";
import FolderCard from "./FolderCard";
import FolderCardGhost from "./FolderCardGhost";
import FolderSorting from "../Header/FolderSorting";

export default function FolderListClient({ folders }: { folders: Folder[] }) {
  console.log(folders.length);
  return (
    <>
      <div className="w-full flex justify-between items-center gap-2">
        <FolderCheckbox allFolders={folders} />
        <FolderSorting />
      </div>
      <div className="w-full grid grid-cols-4 gap-2">
        {folders.length === 0 &&
          Array.from({ length: 4 }).map((_, i) => <FolderCardGhost key={i} />)}
        {folders.length > 0 &&
          folders.map((folder) => (
            <FolderCard key={folder.id} folder={folder} />
          ))}
      </div>
    </>
  );
}

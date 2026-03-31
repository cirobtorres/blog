"use client";

import { useFolder } from "../../../../../providers/FolderProvider";
import { protectedWebUrls } from "../../../../../routing/routes";
import { cn, focusRing } from "../../../../../utils/variants";
import { Checkbox } from "../../../../Fieldset/Checkbox";
import DeleteButton from "./Buttons/DeleteButton";
import EditButton from "./Buttons/EditButton";
import { FolderLink } from "./Buttons/FolderLink";

export default function FolderCard({ folder }: { folder: Folder }) {
  const { selectedItems, toggleItem } = useFolder();
  const isChecked = selectedItems.some((i) => i.id === folder.id);

  return (
    <label
      htmlFor={"folder-" + folder.id}
      className="relative w-full max-w-70 flex-1 flex shrink-0 items-center gap-2 py-2 px-3 transition-border duration-300 rounded border hover:border-primary not-dark:shadow bg-stone-200 dark:bg-stone-900 hover:bg-stone-300 dark:hover:bg-stone-800 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-stone-300 dark:has-data-[state=checked]:bg-stone-800 focus-within:border-primary dark:focus-within:border-primary focus-within:bg-stone-300 dark:focus-within:bg-stone-800 group"
    >
      <Checkbox
        id={"folder-" + folder.id}
        checked={isChecked}
        onCheckedChange={() => toggleItem(folder)}
      />
      <FolderLink
        href={protectedWebUrls.media + "/" + folder.path}
        className={cn(
          "rounded-lg p-3 transition-all duration-300 border border-stone-300 dark:border-stone-800 bg-stone-200 dark:bg-stone-925 group-hover:border-stone-400 dark:group-hover:border-stone-700 group-hover:bg-stone-300 dark:group-hover:bg-stone-900 group-focus-within:border-stone-400 dark:group-focus-within:border-stone-700 group-focus-within:bg-stone-300 dark:group-focus-within:bg-stone-900 peer-data-[state=checked]:border-stone-400 dark:peer-data-[state=checked]:border-stone-700",
          focusRing,
        )}
      />
      <div className="flex flex-col gap-1 overflow-hidden">
        <p className="text-neutral-100 truncate">{folder.name}</p>
        <p className="text-xs text-nowrap text-neutral-400">
          {folder.subfolderCount != 1
            ? folder.subfolderCount + " pastas"
            : folder.subfolderCount + " pasta"}
          ,{" "}
          {folder.fileCount != 1
            ? folder.fileCount + " arquivos"
            : folder.fileCount + " arquivo"}
        </p>
      </div>
      <div className="absolute top-2 right-2 flex items-center gap-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-has-data-[state=checked]:opacity-100">
        <EditButton {...folder} />
        <DeleteButton {...folder} />
      </div>
    </label>
  );
}

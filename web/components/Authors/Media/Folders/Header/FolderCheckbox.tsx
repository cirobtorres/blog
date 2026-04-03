"use client";

import { useFolder } from "../../../../../providers/FolderProvider";
import { Checkbox } from "../../../../Fieldset/Checkbox";
import DeleteButton from "./Buttons/DeteleButton";
import MoveButton from "./Buttons/MoveButton";

export default function FolderCheckbox({
  allFolders,
}: {
  allFolders: Folder[];
}) {
  const { selectedItems, selectAll, clearSelection } = useFolder();

  const count = selectedItems.length;

  const isAllSelected = count === allFolders.length && allFolders.length > 0;

  const handleSelectAll = () => {
    if (isAllSelected) clearSelection();
    else selectAll(allFolders);
  };

  return (
    <div className="w-full flex flex-row items-center gap-2">
      <label
        htmlFor="folders-select-all"
        className="flex flex-row flex-nowrap items-center gap-2 border rounded-lg p-1 not-dark:shadow bg-stone-200 dark:bg-stone-900 overflow-hidden"
      >
        <Checkbox
          id="folders-select-all"
          className="size-6"
          checked={isAllSelected}
          onCheckedChange={handleSelectAll}
        />
        <span className="w-full max-w-22 min-w-22 flex items-center text-sm text-nowrap text-neutral-600 dark:text-neutral-500">
          {count} {count === 1 ? "pasta" : "pastas"}
        </span>
      </label>
      <DeleteButton
        folders={selectedItems}
        disabled={selectedItems.length === 0}
      />
      <MoveButton
        folders={selectedItems}
        disabled={selectedItems.length === 0}
      />
    </div>
  );
}

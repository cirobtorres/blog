"use client";

import { useFile } from "../../../../../providers/FileProvider";
import { Checkbox } from "../../../../Fieldset/Checkbox";
import DeleteButton from "./Buttons/DeleteButton";
import MoveButton from "./Buttons/MoveButton";

export default function MediaFileCheckbox({ allFiles }: { allFiles: Media[] }) {
  const { selectedItems, selectAll, clearSelection } = useFile();

  const count = selectedItems.length;

  const isAllSelected = count === allFiles.length && allFiles.length > 0;

  const handleSelectAll = () => {
    if (isAllSelected) clearSelection();
    else selectAll(allFiles);
  };

  return (
    <div className="w-full flex flex-row items-center gap-2">
      <label
        htmlFor="files-select-all"
        className="flex flex-row flex-nowrap items-center gap-2 border rounded-lg p-1 not-dark:shadow bg-stone-200 dark:bg-stone-900 overflow-hidden"
      >
        <Checkbox
          id="files-select-all"
          className="size-6"
          checked={isAllSelected}
          onCheckedChange={handleSelectAll}
        />
        <span className="w-full max-w-22 min-w-22 flex items-center text-sm text-nowrap text-neutral-600 dark:text-neutral-500">
          {count} {count === 1 ? "arquivo" : "arquivos"}
        </span>
      </label>
      <DeleteButton
        files={selectedItems}
        disabled={selectedItems.length === 0}
      />
      <MoveButton files={selectedItems} disabled={selectedItems.length === 0} />
    </div>
  );
}

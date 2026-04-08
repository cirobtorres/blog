"use client";

import { useFolder } from "../../../../../../providers/FolderProvider";
import { cn } from "../../../../../../utils/variants";
import { Checkbox } from "../../../../../Fieldset/Checkbox";

export default function FolderCardCheckbox({
  folder,
  className,
}: {
  folder: Folder;
  className?: string;
}) {
  const { selectedItems, toggleItem } = useFolder();
  const isChecked = selectedItems.some((i) => i.id === folder.id);

  return (
    <Checkbox
      id={"folder-" + folder.id}
      checked={isChecked}
      onCheckedChange={() => toggleItem(folder)}
      className={cn(className)}
    />
  );
}

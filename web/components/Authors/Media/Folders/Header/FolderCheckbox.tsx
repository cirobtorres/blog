"use client";

import React from "react";
import { useFolder } from "../../../../../providers/FolderProvider";
import { sonnerToastPromise, soonerPromise } from "../../../../../utils/sooner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../../../../AlertDialog";
import { Button } from "../../../../Button";
import { Checkbox } from "../../../../Fieldset/Checkbox";
import deleteFolders from "../../../../../services/media/deleteFolders";

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
      <Button
        variant="link"
        disabled={selectedItems.length === 0}
        className="h-8 w-full max-w-30"
      >
        Mover
      </Button>
    </div>
  );
}

const DeleteButton = ({
  folders,
  disabled,
}: {
  folders: Folder[];
  disabled?: boolean;
}) => (
  <AlertDialog>
    <FoldersExcludeTrigger disabled={disabled} />
    <AlertDialogContent asChild>
      <form className="max-w-xs">
        <AlertDialogHeader>Excluir pasta</AlertDialogHeader>
        <AlertDialogDescription asChild className="p-4">
          <div className="w-full">
            <p className="text-sm text-neutral-600 dark:text-neutral-500">
              Excluir estas{" "}
              <strong className="text-neutral-900 dark:text-neutral-100">
                {folders.length}
              </strong>{" "}
              pastas?
            </p>
            <ul className="flex flex-wrap gap-x-3">
              {folders.map((folder) => (
                <li
                  key={folder.id}
                  className="text-neutral-900 dark:text-neutral-100"
                >
                  {folder.name}
                </li>
              ))}
            </ul>
          </div>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full max-w-30 h-8">
            Cancelar
          </AlertDialogCancel>
          <DeleteFoldersAction folders={folders} />
        </AlertDialogFooter>
      </form>
    </AlertDialogContent>
  </AlertDialog>
);

const DeleteFoldersAction = ({ folders }: { folders: Folder[] }) => {
  const [, action, isPending] = React.useActionState(async () => {
    const success = (serverResponse: ActionState) => {
      return (
        <div className="flex flex-col">
          <p>{serverResponse.success}</p>
        </div>
      );
    };

    const error = (serverResponse: ActionState) => {
      return <p>{serverResponse.error}</p>;
    };

    const result = deleteFolders(folders);
    const promise = soonerPromise(result);
    sonnerToastPromise(promise, success, error, "Excluindo arquivo...");

    return result;
  }, null);
  return (
    <Button
      type="submit"
      variant="destructive"
      disabled={isPending}
      formAction={action}
      className="h-8 w-full max-w-30"
    >
      Excluir
    </Button>
  );
};

const FoldersExcludeTrigger = ({ disabled }: { disabled?: boolean }) => {
  return (
    <AlertDialogTrigger asChild>
      <Button
        type="submit"
        variant="destructive"
        disabled={disabled ?? true}
        className="h-8 w-full max-w-30"
      >
        Excluir
      </Button>
    </AlertDialogTrigger>
  );
};

"use client";

import React from "react";
import { useFile } from "../../../../../providers/FileProvider";
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
import { sonnerToastPromise, soonerPromise } from "../../../../../utils/sooner";
import deleteFiles from "../../../../../services/media/deleteFiles";

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
      <Button
        variant="link"
        className="h-8 w-full max-w-30"
        disabled={selectedItems.length === 0}
      >
        Mover
      </Button>
    </div>
  );
}

const DeleteButton = ({
  files,
  disabled,
}: {
  files: Media[];
  disabled?: boolean;
}) => (
  <AlertDialog>
    <FilesExcludeTrigger disabled={disabled} />
    <AlertDialogContent asChild>
      <form className="max-w-xs">
        <AlertDialogHeader>Excluir pasta</AlertDialogHeader>
        <AlertDialogDescription asChild className="p-4">
          <div className="w-full">
            <p className="text-sm text-neutral-600 dark:text-neutral-500">
              Excluir estas{" "}
              <strong className="text-neutral-900 dark:text-neutral-100">
                {files.length}
              </strong>{" "}
              pastas?
            </p>
            <ul className="flex flex-wrap gap-x-3">
              {files.map((folder) => (
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
          <DeleteFilesAction files={files} />
        </AlertDialogFooter>
      </form>
    </AlertDialogContent>
  </AlertDialog>
);

const DeleteFilesAction = ({ files }: { files: Media[] }) => {
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

    const result = deleteFiles(files);
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

const FilesExcludeTrigger = ({ disabled }: { disabled?: boolean }) => {
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

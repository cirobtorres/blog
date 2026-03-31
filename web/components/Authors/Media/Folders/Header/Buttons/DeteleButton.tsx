"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../../../../../AlertDialog";
import deleteFolders from "../../../../../../services/media/deleteFolders";
import {
  sonnerToastPromise,
  soonerPromise,
} from "../../../../../../utils/sooner";
import { Button } from "../../../../../Button";

export default function DeleteButton({
  folders,
  disabled,
}: {
  folders: Folder[];
  disabled?: boolean;
}) {
  return (
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
              {/* <ul className="flex flex-wrap gap-x-3">
                {folders.map((folder) => (
                  <li
                    key={folder.id}
                    className="text-neutral-900 dark:text-neutral-100"
                  >
                    {folder.name}
                  </li>
                ))}
              </ul> */}
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
}

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

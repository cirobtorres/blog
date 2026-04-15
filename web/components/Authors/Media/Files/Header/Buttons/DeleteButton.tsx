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
import {
  sonnerToastPromise,
  sonnerPromise,
} from "../../../../../../utils/sonner";
import deleteFiles from "../../../../../../services/media/deleteFiles";
import { Button } from "../../../../../Button";

const defaultState: ActionState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export default function DeleteButton({
  files,
  disabled,
}: {
  files: Media[];
  disabled?: boolean;
}) {
  return (
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
              {/* <ul className="flex flex-wrap gap-x-3">
                {files.map((folder) => (
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
            <AlertDialogCancel
              variant="outline"
              className="w-full max-w-30 h-8"
            >
              Cancelar
            </AlertDialogCancel>
            <DeleteFilesAction files={files} />
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

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

    const filesId = files.map((file) => file.id);

    const result = deleteFiles(filesId);
    const promise = sonnerPromise(result);
    sonnerToastPromise(promise, success, error, "Excluindo arquivo...");

    return result;
  }, defaultState);
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

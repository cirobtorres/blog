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
import { Button } from "../../../../../Button";
import {
  sonnerToastPromise,
  sonnerPromise,
} from "../../../../../../utils/sonner";
import Spinner from "../../../../../Spinner";
import deleteFolder from "../../../../../../services/media/deleteFolder";

export default function FolderCardDeleteButton({ id, path }: Folder) {
  return (
    <AlertDialog>
      <FolderCardDeleteTrigger />
      <AlertDialogContent className="max-w-xs">
        <form>
          <AlertDialogHeader>Excluir pasta</AlertDialogHeader>
          <AlertDialogDescription className="text-wrap break-all text-sm p-4 text-neutral-600 dark:text-neutral-500">
            Excluir a pasta{" "}
            <strong className="text-wrap break-all text-neutral-900 dark:text-neutral-100">
              {path.split("/").splice(-1)}
            </strong>
            ?
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel className="w-full max-w-30 h-8">
              Cancelar
            </AlertDialogCancel>
            <FolderCardDeleteAction folderId={id} />
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const FolderCardDeleteAction = ({ folderId }: { folderId: string }) => {
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

    const result = deleteFolder(folderId);
    const promise = sonnerPromise(result);
    sonnerToastPromise(promise, success, error, "Excluindo arquivo...");

    return result;
  }, null);
  return (
    <Button
      type="submit"
      variant="default"
      disabled={isPending}
      formAction={action}
      className="w-full max-w-30 h-8"
    >
      {isPending && <Spinner />} Salvar
    </Button>
  );
};

const FolderCardDeleteTrigger = () => {
  return (
    <AlertDialogTrigger asChild>
      <Button variant="outline" className="size-8 not-dark:shadow-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className=""
        >
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
          <path d="M3 6h18" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      </Button>
    </AlertDialogTrigger>
  );
};

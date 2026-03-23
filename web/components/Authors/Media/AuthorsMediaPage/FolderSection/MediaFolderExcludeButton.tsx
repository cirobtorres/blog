"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../AlertDialog";
import { Button } from "../../../../Button";
import { sonnerToastPromise } from "../../../../../utils/sooner";
import Spinner from "../../../../Spinner";
import deleteFolder from "../../../../../services/cloudinary/deleteFolder";

export default function MediaFolderExcludeButton({
  folder,
}: {
  folder: string;
}) {
  return (
    <AlertDialog>
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
      <AlertDialogContent className="max-w-xs">
        <form>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir pasta</AlertDialogTitle>
            <AlertDialogCancel className="absolute top-1/2 -translate-y-1/2 right-3 size-8">
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
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </AlertDialogCancel>
          </AlertDialogHeader>
          <AlertDialogDescription asChild className="p-4">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-500">
                Tem certeza que gostaria de excluir a pasta{" "}
                <strong className="text-primary">{folder}</strong>?
              </p>
              <p className="text-sm font-bold text-destructive underline underline-offset-2">
                Essa ação não poderá ser desfeita!
              </p>
            </div>
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel className="w-full max-w-30 h-8">
              Cancelar
            </AlertDialogCancel>
            <DeleteFolderAction folder={folder} />
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const DeleteFolderAction = ({ folder }: { folder: string }) => {
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

    const result = deleteFolder({ folder });

    const promise: Promise<ActionState> = new Promise((resolve, reject) => {
      result.then((data) => {
        if (data.ok) resolve(result);
        else reject(result);
      });
    });

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

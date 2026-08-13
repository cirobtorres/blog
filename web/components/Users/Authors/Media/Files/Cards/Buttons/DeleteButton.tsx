"use client";

import React from "react";
import {
  sonnerToastPromise,
  sonnerPromise,
} from "../../../../../../../utils/sonner";
import Spinner from "../../../../../../Spinner";
import deleteFile from "../../../../../../../services/media/deleteFile";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../../../../../../AlertDialog";
import { Button } from "../../../../../../Button";
import {
  cn,
  focusRing,
  linkVariants,
} from "../../../../../../../utils/variants";

const defaultState: ActionState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export default function DeleteButton({
  id,
  name,
  extension,
}: {
  id: string;
  name: string;
  extension: string;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className={cn(
            linkVariants(),
            "cursor-pointer size-8 border rounded text-sm inline-flex items-center justify-center whitespace-nowrap transition-all duration-300 shrink-0 outline-none select-none px-2.5 not-dark:shadow [&_svg]:shrink-0 [&_svg]:pointer-events-none [&_svg]:size-4 text-neutral-900 dark:text-neutral-100 bg-stone-100 dark:bg-stone-900",
            focusRing,
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent asChild className="max-w-xs">
        <form>
          <AlertDialogHeader>Excluir arquivo</AlertDialogHeader>
          <AlertDialogDescription className="text-wrap break-all text-sm p-4 text-neutral-600 dark:text-neutral-500">
            Excluir{" "}
            <span className="text-wrap break-all text-neutral-900 dark:text-neutral-100 font-bold">
              {name}.{extension}
            </span>
            ?
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel
              variant="outline"
              className="w-full max-w-30 h-8"
            >
              Cancelar
            </AlertDialogCancel>
            <DeleteMediaAction id={id} />
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const DeleteMediaAction = ({ id }: { id: string }) => {
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

    const result = deleteFile({ id });
    const promise = sonnerPromise(result);
    sonnerToastPromise(promise, success, error, "Excluindo arquivo...");

    return result;
  }, defaultState);
  return (
    <Button
      type="submit"
      variant="destructive"
      formAction={action}
      disabled={isPending}
      className="w-full max-w-30 h-8"
    >
      {isPending && <Spinner />} Excluir
    </Button>
  );
};

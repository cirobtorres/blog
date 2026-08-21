"use client";

import React from "react";
import { Button } from "../../../Button";
import { sonnerPromise, sonnerToastPromise } from "../../../../utils/sonner";
import { useDeleteTag } from "../../../../services/hooks/tags/hook-tags";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../../../AlertDialog";
import Spinner from "../../../Spinner";

const defaultState: ActionState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export default function TagDelete({ tag }: { tag: Tag }) {
  const { mutateAsync, isPending: isPendingAsync } = useDeleteTag();
  const [, action, isPending] = React.useActionState(async () => {
    const success = (responseStatus: ActionState) => (
      <p>{responseStatus?.success ?? "Tag excluída!"}</p>
    );
    const error = (responseStatus: ActionState) => (
      <div className="flex flex-col">
        <p className="text-sm text-neutral-900 dark:text-neutral-100">
          Ação não concluída
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-500">
          {responseStatus?.error ?? "Ocorreu algum erro"}
        </p>
      </div>
    );

    const promise = mutateAsync({ tagId: tag.id });
    const result = sonnerPromise(promise);
    sonnerToastPromise(result, success, error, "Excluindo tag...");

    return promise;
  }, defaultState);

  const aaa = () => {
    const success = (responseStatus: ActionState) => (
      <p>{responseStatus?.success ?? "Tag excluída!"}</p>
    );
    const error = (responseStatus: ActionState) => (
      <div className="flex flex-col">
        <p className="text-sm text-neutral-900 dark:text-neutral-100">
          Ação não concluída
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-500">
          {responseStatus?.error ?? "Ocorreu algum erro"}
        </p>
      </div>
    );

    const promise = mutateAsync({ tagId: tag.id });
    const result = sonnerPromise(promise);
    sonnerToastPromise(result, success, error, "Excluindo tag...");

    return promise;
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="size-fit p-1">
          <CloseIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-xs">
        <AlertDialogHeader>Excluir Tag?</AlertDialogHeader>
        <AlertDialogDescription className="p-4">
          <strong className="text-destructive">Excluir</strong> {tag.name}?
        </AlertDialogDescription>
        <AlertDialogFooter className="w-full">
          <AlertDialogCancel variant="outline" className="w-full max-w-30 h-8">
            Cancelar
          </AlertDialogCancel>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              React.startTransition(() => {
                action();
              });
            }}
            className="w-full max-w-30 ml-auto mr-0"
          >
            <Button
              variant="destructive"
              className="w-full max-w-30 h-8"
              // onClick={aaa}
              // disabled={isPendingAsync}
              disabled={isPending}
            >
              {isPending && <Spinner className="p-1" />} Confirmar
            </Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const CloseIcon = () => (
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
);

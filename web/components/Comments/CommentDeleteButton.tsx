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
} from "../AlertDialog";
import Spinner from "../Spinner";
import { Button } from "../Button";
import deleteComment from "../../services/comment/deleteComment";
import { sonnerPromise, sonnerToastPromise } from "../../utils/sonner";

const defaultState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export default function DeleteCommentButton({
  userId,
  commentId,
  currentPath,
}: {
  userId: string;
  commentId: string;
  currentPath: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const [, action, isPending] = React.useActionState(async () => {
    const success = (serverResponse: ActionState) => (
      <p>{serverResponse.success ?? "Comentário excluído"}</p>
    );
    const error = (serverResponse: ActionState) => (
      <p>{serverResponse.error ?? "Erro ao excluir comentário"}</p>
    );

    const isSignedIn = !userId;
    if (isSignedIn) return defaultState;

    const data = {
      commentId,
      userId,
      articlePath: currentPath,
    };
    const promise = deleteComment(data);
    const result = sonnerPromise(promise);
    sonnerToastPromise(result, success, error, "Excluindo comentário...");

    return result;
  }, defaultState);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          disabled={isPending}
          className="w-20 h-8 text-neutral-900 dark:text-neutral-100 not-dark:shadow-none"
        >
          Excluir
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-xs">
        <AlertDialogHeader>Excluir comentário</AlertDialogHeader>
        <form action={action}>
          <AlertDialogDescription className="p-4">
            Confirmar?
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel
              variant="outline"
              className="w-full max-w-30 h-8"
            >
              Cancelar
            </AlertDialogCancel>
            <Button
              type="button"
              disabled={isPending}
              variant="default"
              className="w-full max-w-30 h-8"
              onClick={() => {
                React.startTransition(() => {
                  action();
                });
              }}
            >
              {isPending && <Spinner />} Confirmar
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

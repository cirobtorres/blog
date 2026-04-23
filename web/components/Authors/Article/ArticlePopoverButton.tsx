"use client";

import React from "react";
import { buttonVariants, cn } from "../../../utils/variants";
import { Button } from "../../Button";
import { Popover, PopoverContent, PopoverTrigger } from "../../Popover";
import { sonnerPromise, sonnerToastPromise } from "../../../utils/sonner";
import deleteArticle from "../../../services/article/deleteArticle";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../../AlertDialog";
import Spinner from "../../Spinner";
import unpublishArticle from "../../../services/article/unpublishArticle";

const defaultState: ActionState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export function ArticlePopoverButton({
  articleId,
  status,
}: {
  articleId: string;
  status: ArticleStatus;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="size-8">
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
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="max-w-fit">
        <Button variant="outline" className="w-full max-w-30 h-8">
          Preview
        </Button>
        <UnpublishButton articleId={articleId} status={status} />
        <DeleteButton articleId={articleId} />
      </PopoverContent>
    </Popover>
  );
}

const UnpublishButton = ({
  articleId,
  status,
}: {
  articleId: string;
  status: ArticleStatus;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [, action, isPending] = React.useActionState(async () => {
    const success = (serverResponse: ActionState) => {
      return <p>{serverResponse.success || "Artigo despublicado!"}</p>;
    };

    const error = (serverResponse: ActionState) => {
      return <p>{serverResponse.error ?? "Artigo não despublicado"}</p>;
    };

    const result = unpublishArticle(articleId);
    const promise = sonnerPromise(result);
    sonnerToastPromise(promise, success, error, "Despublicando artigo...");
    return promise;
  }, defaultState);

  return status === "DRAFT" ? (
    <div
      data-disabled="disabled"
      className={cn(
        buttonVariants({ variant: "outline" }),
        "cursor-auto w-full max-w-30 h-8 hover:text-neutral-500 dark:hover:text-neutral-400 hover:bg-stone-200 dark:hover:bg-stone-900 hover:border-stone-300 dark:hover:border-stone-700 opacity-50",
      )}
    >
      Despublicar
    </div>
  ) : (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="w-full max-w-30 h-8">
          Despublicar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-xs">
        <AlertDialogHeader>Despublicar artigo</AlertDialogHeader>
        <form action={action}>
          <AlertDialogDescription className="p-4">
            Tem certeza que deseja{" "}
            <b className="text-informative">DESPUBLICAR</b> o artigo?
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel
              variant="outline"
              className="w-full max-w-30 h-8"
            >
              Cancelar
            </AlertDialogCancel>
            <Button
              disabled={isPending}
              variant="default"
              className="w-full max-w-30 h-8"
            >
              {isPending && <Spinner />} Salvar
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const DeleteButton = ({ articleId }: { articleId: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const [, action, isPending] = React.useActionState(async () => {
    const success = (serverResponse: ActionState) => {
      router.push("/users/authors/articles");
      return <p>{serverResponse.success || "Artigo excluído!"}</p>;
    };

    const error = (serverResponse: ActionState) => {
      return <p>{serverResponse.error ?? "Artigo não excluído"}</p>;
    };

    const result = deleteArticle(articleId);
    const promise = sonnerPromise(result);
    sonnerToastPromise(promise, success, error, "Excluíndo artigo...");
    return promise;
  }, defaultState);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-full max-w-30 h-8">
          Excluir
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-xs">
        <AlertDialogHeader>Excluir artigo</AlertDialogHeader>
        <form action={action}>
          <AlertDialogDescription className="p-4">
            Tem certeza que deseja <b className="text-destructive">EXCLUIR</b> o
            artigo? Essa operação não tem retorno!
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel
              variant="outline"
              className="w-full max-w-30 h-8"
            >
              Cancelar
            </AlertDialogCancel>
            <Button
              disabled={isPending}
              variant="destructive"
              className="w-full max-w-30 h-8"
            >
              {isPending && <Spinner />} Excluir
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export function ButtonPlaceholder() {
  return (
    <div
      className={cn(
        buttonVariants({ variant: "outline" }),
        "cursor-auto size-8 opacity-50 hover:text-neutral-500 hover:bg-stone-200 dark:hover:bg-stone-900 dark:hover:text-neutral-400 hover:border-stone-300 dark:hover:border-stone-700",
      )}
    >
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
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
      </svg>
    </div>
  );
}

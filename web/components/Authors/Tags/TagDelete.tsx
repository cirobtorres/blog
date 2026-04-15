"use client";

import React from "react";
import { Button } from "../../Button";
import { sonnerPromise, sonnerToastPromise } from "../../../utils/sonner";
import Spinner from "../../Spinner";
import { useDeleteTag } from "../../../services/hooks/tags/hook-tags";

const defaultState: ActionState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export default function TagDelete({ tagId }: { tagId: string }) {
  const { mutateAsync } = useDeleteTag();
  const [, action, isPending] = React.useActionState(async () => {
    const success = (responseStatus: ActionState) => (
      <p>{responseStatus?.success ?? "Tag excluída!"}</p>
    );
    const error = (responseStatus: ActionState) => (
      <p>{responseStatus?.error ?? "Ocorreu algum erro"}</p>
    );

    const promise = mutateAsync({ tagId });
    const result = sonnerPromise(promise);
    sonnerToastPromise(result, success, error, "Excluindo tag...");

    return result;
  }, defaultState);

  return (
    <form action={action}>
      <Button
        disabled={isPending}
        variant="destructive"
        className="size-fit p-1"
      >
        {isPending ? <Spinner /> : <CloseIcon />}
      </Button>
    </form>
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

"use client";

import React from "react";
import { serverLogout } from "../../services/auth/session/server/logout";
import Spinner from "../Spinner";
import { Button } from "../Button";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const [, action, isPending] = React.useActionState(async () => {
    await serverLogout();
    router.refresh();
  }, null);

  return (
    <form action={action}>
      <Button
        type="submit"
        variant="link"
        disabled={isPending}
        className="w-full h-auto text-start text-destructive font-normal p-1 border border-transparent not-dark:shadow-none justify-start bg-inherit dark:bg-inherit hover:bg-stone-300 dark:hover:bg-stone-800 hover:border-transparent dark:hover:border-transparent focus-visible:bg-stone-300 dark:focus-visible:bg-stone-800"
      >
        {isPending && <Spinner />} Sair
      </Button>
    </form>
  );
}

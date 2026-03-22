"use client";

import React from "react";
import { Button } from "../Buttons";
import { logout } from "../../services/auth/session/server/logout";
import Spinner from "../Spinner";

export function LogoutButton() {
  const [, action, isPending] = React.useActionState(async () => {
    await logout();
  }, null);

  return (
    <form action={action}>
      <Button
        type="submit"
        variant="link"
        disabled={isPending}
        className="h-auto text-start w-full font-normal p-1 border-none not-dark:shadow-none justify-start bg-stone-200 dark:bg-stone-900 hover:bg-stone-300 dark:hover:bg-stone-800 disabled:bg-stone-300 dark:disabled:bg-stone-800"
      >
        {isPending && <Spinner />} Sair
      </Button>
    </form>
  );
}

"use client";

import React from "react";
import { logout } from "../../services/auth/session/server/logout";
import Spinner from "../Spinner";
import { Button } from "../Button";

export function LogoutButton({
  setUser,
}: {
  setUser: React.Dispatch<
    React.SetStateAction<UserSignedIn | UserSignedOut | null>
  >;
}) {
  const [, action, isPending] = React.useActionState(async () => {
    await logout();
    setUser({ ok: false, data: null });
  }, null);

  return (
    <form action={action}>
      <Button
        type="submit"
        variant="link"
        disabled={isPending}
        className="w-full h-auto text-start text-destructive font-normal p-1 border-none not-dark:shadow-none justify-start bg-inherit dark:bg-inherit hover:not-disabled:border-none hover:not-disabled:bg-stone-300 dark:hover:not-disabled:bg-stone-800 dark:hover:not-disabled:border-none"
      >
        {isPending && <Spinner />} Sair
      </Button>
    </form>
  );
}

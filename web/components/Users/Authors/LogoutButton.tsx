"use client";

import React from "react";
import Spinner from "../../Spinner";
import { Button } from "../../Button";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { getRequiredAuthorities } from "../../../routing/protected/getRequiredAuthorities";

console.log("process.env.KEYCLOAK_ISSUER", process.env.KEYCLOAK_ISSUER);
console.log(
  "process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER",
  process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER,
);

export function LogoutButton() {
  const pathname = usePathname();
  const [, action, isPending] = React.useActionState(async () => {
    const requiredAuthorities = !!getRequiredAuthorities(pathname);
    const postLogoutRedirectUri = requiredAuthorities
      ? window.location.origin
      : window.location.href;

    const res = await fetch(
      `/api/auth/federated-logout?redirect=${encodeURIComponent(postLogoutRedirectUri)}`,
    );
    const { url } = await res.json();

    await signOut({ redirect: false });
    window.location.href = url;
  }, null);

  return (
    <form action={action}>
      <Button
        type="submit"
        variant="link"
        disabled={isPending}
        className="w-full h-auto text-start text-destructive font-normal p-1 border border-transparent not-dark:shadow-none justify-start bg-inherit dark:bg-inherit hover:bg-stone-125 dark:hover:bg-stone-800 hover:border-transparent dark:hover:border-transparent"
      >
        {isPending && <Spinner />} Sair
      </Button>
    </form>
  );
}

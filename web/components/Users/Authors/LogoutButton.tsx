"use client";

import React from "react";
import Spinner from "../../Spinner";
import { Button } from "../../Button";
import { redirect } from "next/navigation";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

export function LogoutButton({ session }: { session: Session }) {
  if (!session || !session.user) redirect("/"); // TODO

  const [, action, isPending] = React.useActionState(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const data = await signOut({
      redirect: false,
    });
    const keycloakLogoutUrl = `${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/protocol/openid-connect/logout?id_token_hint=${session.idToken}&post_logout_redirect_uri=${encodeURIComponent(window.location.origin)}`;
    // const keycloakLogoutUrl = `${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/protocol/openid-connect/logout`; // Requires permission to logout

    window.location.href = keycloakLogoutUrl;
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

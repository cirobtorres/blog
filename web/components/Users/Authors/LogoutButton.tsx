"use client";

import React from "react";
import Spinner from "../../Spinner";
import { Button } from "../../Button";
import { redirect, usePathname } from "next/navigation";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { getRequiredAuthorities } from "../../../routing/protected/getRequiredAuthorities";

export function LogoutButton({ session }: { session: Session }) {
  if (!session || !session.user) redirect("/"); // TODO
  const pathname = usePathname();

  const [, action, isPending] = React.useActionState(async () => {
    const requiredAuthorities = !!getRequiredAuthorities(pathname);

    const postLogoutRedirectUri = requiredAuthorities
      ? window.location.origin
      : window.location.href;

    await signOut({
      redirect: false,
    });
    const keycloakLogoutUrl = `${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/protocol/openid-connect/logout?id_token_hint=${session.idToken}&post_logout_redirect_uri=${encodeURIComponent(postLogoutRedirectUri)}`;
    // const keycloakLogoutUrl = `${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/protocol/openid-connect/logout`; // Requires permission to logout

    window.location.href = keycloakLogoutUrl;
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

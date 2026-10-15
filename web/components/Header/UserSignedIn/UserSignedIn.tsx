"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../Popover";
import { AvatarName } from "../../Avatar";
import { protectedWebUrls } from "../../../routing/routes";
import { cn, focusRing } from "../../../utils/variants";
import { Link } from "../../Links";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { redirect, usePathname } from "next/navigation";
import { getRequiredAuthorities } from "../../../routing/protected/getRequiredAuthorities";
import {
  AuthorIcon,
  MediaIcon,
  PreferencesIcon,
  WriteIcon,
  TagIcon,
} from "../../Icons";
import Spinner from "../../Spinner";

const elStyleWrapper = "flex flex-col p-1";
const elStyleItem =
  "w-full cursor-pointer flex items-center gap-1 text-xs py-1 px-2 text-start text-neutral-900 dark:text-neutral-100 hover:bg-stone-125 dark:hover:bg-stone-800 font-normal transition-all duration-300 rounded";

export default function UserSignedIn({ session }: { session: Session }) {
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

    const keycloakLogoutUrl =
      `${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}` +
      `/protocol/openid-connect/logout` +
      `?id_token_hint=${session.idToken}` +
      `&post_logout_redirect_uri=${encodeURIComponent(postLogoutRedirectUri)}`;

    window.location.href = keycloakLogoutUrl;
  }, null);

  const { user } = session;
  const isAuthor = user.authorities.some((i) => i.toUpperCase() === "AUTHOR");

  return (
    <div className="ml-auto mr-0">
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            tabIndex={0}
            className={cn(
              "flex items-center justify-start gap-2 cursor-pointer rounded-lg border border-transparent transition-all duration-300 group",
              focusRing,
            )}
          >
            <AvatarName
              authorName={user.name || "Anonymous"}
              options={{ hideName: true }}
            />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={10}
          className="flex flex-col justify-center gap-0 p-0 overflow-hidden"
        >
          <div className="flex flex-col p-2 border-b">
            <p className="text-xs font-bold truncate text-nowrap">
              {user.name}
            </p>
            <p className="text-xs line-clamp-2 text-neutral-400 dark:text-neutral-500">
              {user.email}
            </p>
          </div>
          <div className={cn(elStyleWrapper, "border-b")}>
            <p className="text-xs font-medium text-nowrap p-1 text-neutral-500">
              Usuário
            </p>
            <Link
              href={protectedWebUrls.users}
              className={cn(elStyleItem, "flex items-center gap-2 pl-4")}
            >
              <PreferencesIcon className="size-3" />
              Preferências
            </Link>
          </div>
          {isAuthor && (
            <div className={cn(elStyleWrapper, "border-b")}>
              <p className="text-xs cursor-pointer flex items-center gap-1 font-medium text-nowrap p-1 text-neutral-500">
                Administrativo
              </p>
              <Link
                href={protectedWebUrls.authors}
                className={cn(elStyleItem, "flex items-center gap-2 pl-4")}
              >
                <AuthorIcon className="size-3" />
                Autor
              </Link>
              <Link
                href={protectedWebUrls.write}
                className={cn(elStyleItem, "flex items-center gap-2 pl-4")}
              >
                <WriteIcon className="size-3" />
                Escrever
              </Link>
              <Link
                href={protectedWebUrls.media}
                className={cn(elStyleItem, "flex items-center gap-2 pl-4")}
              >
                <MediaIcon className="size-3" />
                Media
              </Link>
              <Link
                href={protectedWebUrls.tag}
                className={cn(elStyleItem, "flex items-center gap-2 pl-4")}
              >
                <TagIcon className="size-3" />
                Tag
              </Link>
            </div>
          )}
          <form action={action} className={elStyleWrapper}>
            <button type="submit" disabled={isPending} className={elStyleItem}>
              {isPending && <Spinner className="size-4" />} Sair
            </button>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}

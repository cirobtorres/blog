"use client";

import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../Popover";
import { cn, focusRing } from "../../../utils/variants";
import { protectedWebUrls } from "../../../routing/routes";
import { Link } from "../../Links";
import { logout } from "../../../services/auth/session/server/logout";
import Spinner from "../../Spinner";

const elStyleWrapper = "flex flex-col p-1";
const elStyleItem =
  "w-full cursor-pointer flex items-center gap-1 text-xs py-1 px-2 text-start text-neutral-900 dark:text-neutral-100 hover:bg-stone-300 dark:hover:bg-stone-800 font-normal transition-[background-color,box-shadow] duration-300 rounded";

export default function UserSignedIn({
  user,
  setUserState,
}: {
  user: AuthSessionConfirmed;
  setUserState: Dispatch<SetStateAction<AuthSession | null>>;
}) {
  const [, action, isPending] = React.useActionState(async () => {
    const result = await logout();
    if (result.ok) setUserState({ ok: false, data: null });
  }, null);

  return (
    <div className="ml-auto mr-0">
      <Popover>
        <PopoverTrigger
          asChild
          tabIndex={0}
          className={cn(
            "flex items-center justify-start gap-2 cursor-pointer transition-[background-color,box-shadow] duration-300 group",
            focusRing,
          )}
        >
          <Image
            src={
              user.data.pictureUrl ??
              "https://placehold.co/100x100/0a0a0a/f5f5f5/jpg"
            }
            alt="User avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={10}
          className="flex flex-col justify-center gap-0 p-0 overflow-hidden"
        >
          <div className="flex flex-col p-2 border-b">
            <p className="text-xs font-bold truncate text-nowrap">
              {user.data.name}
            </p>
            <p className="text-xs line-clamp-2 text-neutral-400 dark:text-neutral-500">
              {user.data.providerEmail}
            </p>
          </div>
          <div className={cn(elStyleWrapper, "border-b")}>
            <p className="text-xs font-medium text-nowrap p-1 text-neutral-500">
              Usuário
            </p>
            <Link
              href="/"
              className={cn(elStyleItem, "flex items-center gap-2 pl-4")}
            >
              <PreferencesIcon />
              Preferências
            </Link>
          </div>
          <div className={cn(elStyleWrapper, "border-b")}>
            <p className="text-xs cursor-pointer flex items-center gap-1 font-medium text-nowrap p-1 text-neutral-500">
              Administrativo
            </p>
            <Link
              href={protectedWebUrls.authors}
              className={cn(elStyleItem, "flex items-center gap-2 pl-4")}
            >
              <AuthorIcon />
              Autor
            </Link>
            <Link
              href={protectedWebUrls.write}
              className={cn(elStyleItem, "flex items-center gap-2 pl-4")}
            >
              <WriteIcon />
              Escrever
            </Link>
            <Link
              href={protectedWebUrls.media}
              className={cn(elStyleItem, "flex items-center gap-2 pl-4")}
            >
              <MediaIcon />
              Media
            </Link>
          </div>
          {/* <div className={cn(elStyleWrapper, "border-b")}>
            <p className="text-xs font-medium text-nowrap p-1 text-neutral-500">
              Tema
            </p>
            <p className={cn(elStyleItem, "flex items-center gap-2 pl-4")}>
              <LightThemeIcon />
              Claro
            </p>
            <p className={cn(elStyleItem, "flex items-center gap-2 pl-4")}>
              <DarkThemeIcon />
              Escuro
            </p>
            <p className={cn(elStyleItem, "flex items-center gap-2 pl-4")}>
              <CustomSystemThemeIcon />
              Sistema
            </p>
          </div> */}
          <form action={action} className={elStyleWrapper}>
            <button type="submit" disabled={isPending} className={elStyleItem}>
              {isPending && <Spinner />} Sair
            </button>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}

const PreferencesIcon = () => (
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
    className="size-3"
  >
    <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const AuthorIcon = () => (
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
    className="size-3"
  >
    <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 .83.18 2 2 0 0 0 .83-.18l8.58-3.9a1 1 0 0 0 0-1.831z" />
    <path d="M16 17h6" />
    <path d="M19 14v6" />
    <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 .825.178" />
    <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l2.116-.962" />
  </svg>
);

const WriteIcon = () => (
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
    className="size-3"
  >
    <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
    <path d="M2 6h4" />
    <path d="M2 10h4" />
    <path d="M2 14h4" />
    <path d="M2 18h4" />
    <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
  </svg>
);

const MediaIcon = () => (
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
    className="size-3"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
);

const LightThemeIcon = () => (
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
    className="size-3"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const DarkThemeIcon = () => (
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
    className="size-3"
  >
    <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
  </svg>
);

const CustomSystemThemeIcon = () => (
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
    className="size-3"
  >
    <path d="M12 17v4" />
    <path d="m14.305 7.53.923-.382" />
    <path d="m15.228 4.852-.923-.383" />
    <path d="m16.852 3.228-.383-.924" />
    <path d="m16.852 8.772-.383.923" />
    <path d="m19.148 3.228.383-.924" />
    <path d="m19.53 9.696-.382-.924" />
    <path d="m20.772 4.852.924-.383" />
    <path d="m20.772 7.148.924.383" />
    <path d="M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
    <path d="M8 21h8" />
    <circle cx="18" cy="6" r="3" />
  </svg>
);

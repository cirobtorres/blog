"use server";

import { notFound } from "next/navigation";
import { getSessionUser } from "../../../services/auth/session/server/getSessionUser";
import {
  AboutPathLink,
  ArticlesPathLink,
  MediaPathLink,
  TagPathLink,
  HomePathLink,
  UsersPathLink,
} from "../../../components/Authors/Media/AsideNavButtons";
import Image from "next/image";
import { cn, focusRing } from "../../../utils/variants";
import Link from "next/link";

export default async function AuthorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authorized, user } = await getSessionUser();

  if (!authorized) notFound();

  return (
    <main className="w-full min-h-screen grid grid-cols-[60px_1fr_60px] mx-auto">
      <aside className="relative w-full h-full border-r bg-stone-200 dark:bg-stone-900">
        <nav className="fixed w-15 h-full mx-auto flex flex-col gap-2 py-2">
          <Link
            href="/"
            className="size-11 p-1 mx-2 rounded-lg cursor-pointer transition-[background-color,box-shadow] duration-300 hover:bg-stone-200 dark:hover:bg-stone-800"
          >
            <div
              role="logo"
              className="size-full p-1 rounded-full bg-stone-900 dark:bg-stone-100"
            />
          </Link>
          <div className="w-full h-px bg-stone-700" />
          <HomePathLink />
          <ArticlesPathLink />
          <MediaPathLink />
          <TagPathLink />
          <UsersPathLink />
          <div className="w-full flex flex-col gap-2 mt-auto">
            <AboutPathLink />
            <div className="w-full h-px bg-stone-700" />
            <div
              tabIndex={0}
              className={cn(
                "size-11 p-1 mx-2 flex items-center justify-start gap-2 rounded-lg cursor-pointer transition-[background-color,box-shadow] duration-300 hover:bg-stone-200 dark:hover:bg-stone-800 group",
                focusRing,
              )}
            >
              {(user as User).pictureUrl ? (
                <Image
                  src={(user as User).pictureUrl as string}
                  alt={"Avatar de " + (user as User).name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <span
                  className={cn(
                    "size-full p-1 shrink-0 flex justify-center items-center rounded-full bg-primary",
                  )}
                >
                  {(user as User).name
                    .toUpperCase()
                    .split(" ")
                    .map((i) => i[0])
                    .splice(0, 2)
                    .join("")}
                </span>
              )}
            </div>
          </div>
        </nav>
      </aside>
      {children}
    </main>
  );
}

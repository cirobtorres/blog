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
import Link from "next/link";
import { UserButton } from "../../../components/Authors/UserButton";
import { DashedBackground } from "../../../components/DashedBackground";

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
            <UserButton user={user as User} />
          </div>
        </nav>
      </aside>
      {children}
      <DashedBackground className="border-l" />
    </main>
  );
}

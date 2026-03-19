"use server";

import { notFound } from "next/navigation";
import { getSessionUser } from "../../../services/auth/session/server/getSessionUser";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import {
  AboutPathLink,
  ArticlesPathLink,
  MediaPathLink,
  TagPathLink,
  HomePathLink,
  UsersPathLink,
} from "../../../components/Authors/Media/AsideNavButtons";

export default async function AuthorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authorized } = await getSessionUser();

  if (!authorized) notFound();

  return (
    <div className="w-full min-h-screen grid grid-rows-[var(--height-header)_1fr_var(--height-footer)]">
      <Header sticky />
      <main className="w-full grid grid-cols-[60px_1fr_60px] mx-auto">
        <aside className="relative w-full h-full border-r bg-stone-200 dark:bg-stone-900">
          <nav className="sticky top-(--height-header) mx-auto flex flex-col gap-2 p-2">
            <HomePathLink />
            <ArticlesPathLink />
            <MediaPathLink />
            <TagPathLink />
            <UsersPathLink />
            <AboutPathLink />
          </nav>
        </aside>
        {children}
      </main>
      <Footer />
    </div>
  );
}

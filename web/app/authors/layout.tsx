"use server";

import { notFound } from "next/navigation";
import { getSessionUser } from "../../services/auth/session/server/getSessionUser";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Link } from "../../components/Links";

export default async function AuthorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authorized } = await getSessionUser();

  if (!authorized) notFound();

  return (
    <div className="w-full min-h-screen grid grid-rows-[var(--height-header)_1fr_var(--height-footer)]">
      <Header />
      <main
        className="w-full grid grid-cols-[var(--container-xs)_1fr] min-[1536px]:grid-cols-[var(--container-xs)_1fr_minmax(0,var(--container-xs))] mx-auto"
        // 1552px = calc(var(--container-xs)+8px+var(--container-4xl)+8px+var(--container-xs))
      >
        <aside className="w-full max-w-xs h-full border-r flex flex-col items-end pt-25 bg-stone-200 dark:bg-stone-900">
          <div className="w-full border-b p-2 text-end">
            <Link href="/authors/articles">Artigos</Link>
          </div>
          <div className="w-full border-b p-2 text-end">
            <Link href="/authors/media">Media</Link>
          </div>
        </aside>
        {children}
      </main>
      <Footer />
    </div>
  );
}

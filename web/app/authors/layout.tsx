"use server";

import { notFound, redirect } from "next/navigation";
import { getSessionUser } from "../../services/auth/session/server/getSessionUser";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Link } from "../../components/Links";

export default async function AuthorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authorized, redirect: redirectPath, user } = await getSessionUser();

  if (!authorized && redirectPath) {
    if (!!user) redirect(redirectPath);
    notFound();
  }

  return (
    <div className="w-full min-h-screen grid grid-rows-[var(--height-header)_1fr_var(--height-footer)]">
      <Header />
      <main className="relative grid grid-cols-[280px_1fr] mx-auto">
        <aside className="sticky top-0 flex flex-col justify-center items-end ml-auto mr-0 mb-auto mt-25">
          <Link href="/">Artigos</Link>
          <Link href="/">Media</Link>
        </aside>
        {children}
      </main>
      <Footer />
    </div>
  );
}

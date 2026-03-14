"use server";

import { notFound, redirect } from "next/navigation";
import { getSessionUser } from "../../services/auth/session/server/getSessionUser";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

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
      <main className="grid grid-cols-[400px_1fr]">
        <aside className="border-r bg-container"></aside>
        {children}
      </main>
      <Footer />
    </div>
  );
}

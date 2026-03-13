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
    <main className="w-full min-h-screen grid grid-rows-[var(--height-header)_1fr_var(--height-footer)]">
      <Header />
      <div className="grid grid-cols-[auto_minmax(0,1200px)_auto] gap-2">
        <div className="w-full h-full bg-container border-r"></div>
        <div className="w-full mx-auto">{children}</div>
        <div className="w-full h-full bg-container border-l"></div>
      </div>
      <Footer />
    </main>
  );
}

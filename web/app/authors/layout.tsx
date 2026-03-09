"use server";

import { notFound, redirect } from "next/navigation";
import { getSessionUser } from "../../services/auth/session/server/getSessionUser";

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

  return children;
}

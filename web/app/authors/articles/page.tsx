"use server";

import { notFound } from "next/navigation";
import { ArticleCreate } from "../../../components/Forms/ArticleCreate";
import { getSessionUser } from "../../../services/auth/session/server/getSessionUser";

export default async function AuthorsArticlesPage() {
  const { authorized, user } = await getSessionUser();

  if (!authorized) notFound();

  if (!user) return;

  return <ArticleCreate />;
}

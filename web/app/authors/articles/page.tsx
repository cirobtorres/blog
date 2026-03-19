"use server";

// import { notFound } from "next/navigation";
// import { getSessionUser } from "../../../services/auth/session/server/getSessionUser";
import { ArticleCreate } from "../../../components/Forms/ArticleCreate";

export default async function AuthorsArticlesPage() {
  // const { authorized, user } = await getSessionUser();

  // if (!authorized) notFound();

  // if (!user) return;

  return <ArticleCreate />;
}

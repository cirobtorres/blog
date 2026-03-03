import { getUser } from "./getUser";

export async function getSessionUser(requiredRole?: string): Promise<{
  authorized: boolean;
  redirect: string | null;
  user: User | null;
}> {
  const session = await getUser();

  if (!session.ok || !session.data) {
    return { authorized: false, redirect: "/sign-in", user: null };
  }

  if (requiredRole && !session.data.authorities.includes(requiredRole)) {
    return { authorized: false, redirect: "/", user: null };
  }

  return { authorized: true, redirect: null, user: session.data };
}

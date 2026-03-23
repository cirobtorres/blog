"use client";

import { publicWebUrls } from "../../../../routing/routes";
import { getAuthorClient } from "../../getAuthorClient";
import getUser from "./getUser";

export async function getSessionUser(pathname?: string | undefined): Promise<{
  authorized: boolean;
  redirect: string | null;
  user: User | null;
}> {
  const session = await getUser();
  // Right now I'm only requesting ["/authors"].
  // But what happens if the page needs ["/authors", "/admin"]?
  const requiredRoles = getAuthorClient({ pathname });

  if (!session.ok || !session.data) {
    return {
      authorized: false,
      redirect: publicWebUrls.signIn + "?login=required",
      user: null,
    };
  }

  if (
    requiredRoles &&
    !requiredRoles.every((role) => session.data.authorities.includes(role))
  ) {
    return {
      authorized: false,
      redirect: publicWebUrls.signIn + "?login=required",
      user: null,
    };
  }

  return { authorized: true, redirect: null, user: session.data };
}

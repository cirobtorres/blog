"use server";

import { publicWebUrls } from "../../../../config/routes";
// import { getAuthorServer } from "../../getAuthorServer";
import { getUser } from "./getUser";

// services/auth/session/server/getSessionUser.ts

export async function getSessionUser() {
  const session = await getUser();

  if (!session.ok || !session.data) {
    return {
      authorized: false,
      redirect: publicWebUrls.signIn + "?login=required",
      user: null,
    };
  }

  const isAuthor = session.data.authorities.includes("AUTHOR");

  if (!isAuthor) {
    return {
      authorized: false,
      user: session.data,
    };
  }

  return { authorized: true, redirect: null, user: session.data };
}

// export async function getSessionUser(): Promise<{
//   authorized: boolean;
//   redirect: string | null;
//   user: User | null;
// }> {
//   const session = await getUser();
//   // TODO: test for multiple authorities.
//   // Right now I'm only requesting ["/authors"],
//   // but what happens if the page needs
//   // ["/authors", "/admin"]?
//   const requiredRoles = await getAuthorServer();

//   if (!session.ok || !session.data) {
//     return {
//       authorized: false,
//       redirect: publicWebUrls.signIn + "?login=required",
//       user: null,
//     };
//   }

//   if (
//     requiredRoles &&
//     !requiredRoles.every((role) => session.data.authorities.includes(role))
//   ) {
//     return {
//       authorized: false,
//       redirect: publicWebUrls.signIn + "?login=required",
//       user: null,
//     };
//   }

//   return { authorized: true, redirect: null, user: session.data };
// }

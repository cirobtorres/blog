"use server";

import { publicWebUrls } from "../../../../config/routes";
import { getUser } from "./getUser";

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

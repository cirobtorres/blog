"use client";

import { redirect } from "next/navigation";
import { apiClientUrls } from "../../config/routes";
import { getSessionUser } from "./session/client/getSessionUser";

const logout = async (pathname?: string | undefined) => {
  const isProd = process.env.NODE_ENV === "production";

  const response = await fetch(apiClientUrls.logout, {
    method: "POST",
    credentials: "include",
  });

  const {
    authorized,
    redirect: redirectTo,
    user,
  } = await getSessionUser(pathname);

  if (!response.ok) {
    if (!isProd) {
      console.error("logout:", response);
    }
  }

  // User is authenticated, but he is not auhorized
  if (!authorized && redirectTo && user) {
    // TODO: redirect to previous page ...
    redirect(redirectTo);
  }

  // User is anonymous, but he is authorized (public routes)
};

export { logout };

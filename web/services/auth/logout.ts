"use client";

import { apiClientUrls, publicWebUrls } from "../../config/routes";
import { getAuthorClient } from "./getAuthorClient";

const logout = async (pathname?: string) => {
  // Logout
  await fetch(apiClientUrls.logout, {
    method: "POST",
    credentials: "include",
  });

  const requiredRoles = getAuthorClient({ pathname }); // Checks if current route requires authority

  const isProtectedRoute = requiredRoles && requiredRoles.length > 0; // && !pathname?.startsWith("/public");

  if (isProtectedRoute) {
    window.location.href = publicWebUrls.signIn + "?login=required";
  } else {
    window.location.reload(); // If not protected, just refreshes the page
  }
};

export { logout };

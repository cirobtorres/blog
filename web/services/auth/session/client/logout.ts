"use client";

import { apiClientUrls, publicWebUrls } from "../../../../config/routes";
import { getAuthorClient } from "../../getAuthorClient";

const logout = async () => {
  try {
    await fetch(apiClientUrls.logout, {
      method: "POST",
      credentials: "include",
    });

    const pathname = window.location.pathname;
    const requiredRoles = getAuthorClient({ pathname });
    const isProtectedRoute = requiredRoles.includes("AUTHOR");

    if (isProtectedRoute) {
      window.location.href = publicWebUrls.signIn + "?login=required";
    } else {
      window.location.reload(); // Refreshes the page
    }
  } catch (e) {
    window.location.reload();
  }
};

export { logout };

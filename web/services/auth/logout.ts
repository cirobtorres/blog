"use client";

import { apiClientUrls, publicWebUrls } from "../../config/routes";
import { getAuthorClient } from "./getAuthorClient";

const logout = async () => {
  const isProg = process.env.NODE_ENV;
  try {
    await fetch(apiClientUrls.logout, {
      method: "POST",
      credentials: "include",
    });

    const pathname = window.location.pathname;
    const requiredRoles = getAuthorClient({ pathname });
    const isProtectedRoute = requiredRoles.includes("AUTHOR");

    if (!isProg) {
      console.log(
        `logout(): pathname={"${pathname}"} needs authentication. isProtectedRoute={${isProtectedRoute}}`,
      );
    }

    if (isProtectedRoute) {
      window.location.href = publicWebUrls.signIn + "?login=required";
    } else {
      window.location.reload(); // Refreshes the page
    }
  } catch (e) {
    if (!isProg) {
      console.log("logout():", e);
    }
    window.location.reload();
  }
};

export { logout };

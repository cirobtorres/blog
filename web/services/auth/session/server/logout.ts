"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { apiClientUrls } from "../../../../routing/routes";
import { revalidatePath } from "next/cache";
import { getAuthorClient } from "../../getAuthorClient";

export async function logout() {
  const headersList = await headers();
  const cookieStore = await cookies();
  const referer = headersList.get("referer");
  const pathname = referer ? new URL(referer).pathname : "/";
  const accessToken = cookieStore.get("access_token")?.value;

  try {
    await fetch(apiClientUrls.logout, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error("Logout error:", e);
    return { ok: false, success: null, error: null, data: null };
  }
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");

  const requiredRoles = getAuthorClient({ pathname });
  const isProtectedRoute = requiredRoles.includes("AUTHOR");

  if (isProtectedRoute) {
    redirect(
      "/users/sign-in?login=required&redirect_url=" +
        encodeURIComponent(pathname),
    );
  }

  revalidatePath("/", "layout");

  return { ok: true, success: null, error: null, data: null };
}

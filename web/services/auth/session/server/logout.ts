"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { apiClientUrls, publicWebUrls } from "../../../../routing/routes";
import { revalidatePath } from "next/cache";
import { hasAutorities } from "../../../../routing/protected/hasAutorities";
import { serverFetch } from "../../../auth-fetch-actions";

export async function logout() {
  const headersList = await headers();
  const cookieStore = await cookies();
  const referer = headersList.get("referer");
  const pathname = referer ? new URL(referer).pathname : "/";
  const refreshToken = cookieStore.get("refresh_token")?.value;

  try {
    await serverFetch(apiClientUrls.logout, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refresh_token=${refreshToken}`,
      },
    });
  } catch (e) {
    console.error("Logout error:", e);
    return {
      ok: false,
      success: null,
      error: "Erro ao efetuar o logout",
      data: null,
    };
  }
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");

  const required = hasAutorities(pathname);

  if (required) {
    redirect(
      `${publicWebUrls.signIn}?login=required&callbackUrl=${encodeURIComponent(pathname)}`,
    );
  }

  revalidatePath("/", "layout");

  return {
    ok: true,
    success: "Logout realizado com sucesso",
    error: null,
    data: null,
  };
}

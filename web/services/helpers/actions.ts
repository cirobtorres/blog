import { cookies } from "next/headers";

export async function applyCookiesInAction(setCookieHeader: string) {
  const cookieStore = await cookies();
  const isProd = process.env.NODE_ENV === "production";

  const rawCookies = setCookieHeader.split(/,(?=[^;]+?=)/);

  rawCookies.forEach((cookieStr) => {
    const parts = cookieStr.split(";").map((s) => s.trim());
    const [nameValue, ...options] = parts;
    const [name, value] = nameValue.split("=");

    cookieStore.set(name, value, {
      httpOnly: true,
      secure: isProd,
      path: "/",
      sameSite: isProd ? "strict" : "lax",
    });
  });
}

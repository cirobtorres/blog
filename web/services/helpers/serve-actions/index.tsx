import { NextResponse } from "next/server";

function parseSetCookie(header: string) {
  return header.split(/,(?=[^;]+?=)/);
}

function decodeJwt(token: string) {
  return JSON.parse(atob(token.split(".")[1]));
}

function extractTokenFromHeader(header: string, name: string) {
  const cookies = header.split(/,(?=[^;]+?=)/);
  const target = cookies.find((c) => c.trim().startsWith(name + "="));
  return target ? target.split(";")[0].split("=")[1] : null;
}

function applySpringCookies(response: NextResponse, setCookieHeader: string) {
  const isProd = process.env.NODE_ENV === "production";
  const rawCookies = setCookieHeader.split(/,(?=[^;]+?=)/);

  rawCookies.forEach((cookieStr) => {
    const parts = cookieStr.split(";").map((s) => s.trim());
    const [nameValue] = parts;
    const [name, value] = nameValue.split("=");

    response.cookies.set(name, value, {
      httpOnly: true,
      secure: isProd,
      path: "/",
      sameSite: isProd ? "strict" : "lax",
    });
  });
}

function extractPayload(accessToken: string): AuthTokensPayload {
  return JSON.parse(atob(accessToken.split(".")[1]));
}

export {
  parseSetCookie,
  decodeJwt,
  extractTokenFromHeader,
  applySpringCookies,
  extractPayload,
};

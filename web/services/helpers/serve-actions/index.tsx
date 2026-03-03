import { NextResponse } from "next/server";

function parseSetCookie(header: string) {
  // Magic RegEx: divides by commas, skipping the ones that comes within dates (ex: Sun, 15-Jun...)
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

function applySpringCookies(response: NextResponse, header: string) {
  const isProd = process.env.NODE_ENV === "production";
  const rawCookies = header.split(/,(?=[^;]+?=)/);

  rawCookies.forEach((cookieStr) => {
    const [nameValue, ...attributes] = cookieStr
      .split(";")
      .map((s) => s.trim());
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

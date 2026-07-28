"use server";

import { NextRequest, NextResponse } from "next/server";
import { protectedWebUrls } from "../../../../routing/routes";

const KEYCLOAK_ISSUER =
  process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER ||
  "http://localhost:8085/realms/blog-realm";
const KEYCLOAK_CLIENT_ID =
  process.env.NEXT_PUBLIC_KEYCLOAK_BLOG_WEB_CLIENT_ID || "blog-next";
const KEYCLOAK_CLIENT_SECRET =
  process.env.KEYCLOAK_BLOG_WEB_CLIENT_SECRET || "NOT_SAFE";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

type TokenResponse = {
  access_token: string;
  refresh_token?: string;
  id_token?: string;
  expires_in?: number;
  refresh_expires_in?: number;
  token_type?: string;
  scope?: string;
};

function safeReturnTo(value: unknown) {
  if (typeof value !== "string") return protectedWebUrls.authors;
  if (!value.startsWith("/")) return protectedWebUrls.authors;
  if (value.startsWith("//")) return protectedWebUrls.authors;
  return value;
}

function decodeState(state: string | null) {
  if (!state) return null;

  try {
    return JSON.parse(Buffer.from(state, "base64url").toString("utf8")) as {
      provider?: string;
      returnTo?: string;
      nonce?: string;
    };
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error");
  const state = request.nextUrl.searchParams.get("state");
  const savedState = request.cookies.get("oauth_state")?.value;

  if (error) {
    return NextResponse.redirect(
      new URL(`/users/sign-in?error=${encodeURIComponent(error)}`, request.url),
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/users/sign-in?error=missing_code", request.url),
    );
  }

  if (!state || !savedState || state !== savedState) {
    return NextResponse.redirect(
      new URL("/users/sign-in?error=invalid_state", request.url),
    );
  }

  const parsedState = decodeState(state);
  const returnTo = safeReturnTo(parsedState?.returnTo);

  const redirectUri = `${APP_URL}/local/auth/callback`;

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: KEYCLOAK_CLIENT_ID,
    code,
    redirect_uri: redirectUri,
  });

  if (KEYCLOAK_CLIENT_SECRET) {
    body.set("client_secret", KEYCLOAK_CLIENT_SECRET);
  }

  const tokenResponse = await fetch(
    `${KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
      cache: "no-store",
    },
  );

  if (!tokenResponse.ok) {
    console.error("Keycloak token exchange failed:", {
      status: tokenResponse.status,
      body: await tokenResponse.text(),
    });

    return NextResponse.redirect(
      new URL("/users/sign-in?error=token_exchange_failed", request.url),
    );
  }

  const tokens = (await tokenResponse.json()) as TokenResponse;

  const springResponse = await fetch(`${API_URL}/auth/social/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens.access_token}`,
    },
    body: JSON.stringify(tokens),
    cache: "no-store",
  });

  if (!springResponse.ok) {
    console.error("Spring social session failed:", {
      status: springResponse.status,
      body: await springResponse.text(),
    });

    return NextResponse.redirect(
      new URL("/users/sign-in?error=spring_session_failed", request.url),
    );
  }

  const response = NextResponse.redirect(new URL(returnTo, request.url));

  response.cookies.delete("oauth_state");

  const setCookieHeaders = springResponse.headers.getSetCookie();

  for (const cookie of setCookieHeaders) {
    response.headers.append("Set-Cookie", cookie);
  }

  return response;
}

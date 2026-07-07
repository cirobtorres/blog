import { NextRequest, NextResponse } from "next/server";

const KEYCLOAK_URL = process.env.KEYCLOAK_URL || "http://localhost:8085";
const KEYCLOAK_REALM = process.env.KEYCLOAK_WEB_CLIENT_REALM || "blog-realm";
const KEYCLOAK_CLIENT_ID =
  process.env.KEYCLOAK_BLOG_WEB_CLIENT_ID || "blog-next";
const KEYCLOAK_CLIENT_SECRET =
  process.env.KEYCLOAK_BLOG_WEB_CLIENT_SECRET || "";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

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
  if (typeof value !== "string") return "/users/authors";
  if (!value.startsWith("/")) return "/users/authors";
  if (value.startsWith("//")) return "/users/authors";
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
    `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`,
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
    const text = await tokenResponse.text();

    console.error("Keycloak token exchange failed:", {
      status: tokenResponse.status,
      body: text,
    });

    return NextResponse.redirect(
      new URL("/users/sign-in?error=token_exchange_failed", request.url),
    );
  }

  const tokens = (await tokenResponse.json()) as TokenResponse;

  const response = NextResponse.redirect(new URL(returnTo, request.url));

  response.cookies.delete("oauth_state");

  response.cookies.set("access_token", tokens.access_token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: tokens.expires_in ?? 60 * 5,
  });

  if (tokens.refresh_token) {
    response.cookies.set("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: tokens.refresh_expires_in ?? 60 * 60 * 24 * 30,
    });
  }

  if (tokens.id_token) {
    response.cookies.set("id_token", tokens.id_token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: tokens.expires_in ?? 60 * 5,
    });
  }

  return response;
}

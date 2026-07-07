import { NextRequest, NextResponse } from "next/server";

const KEYCLOAK_URL = process.env.KEYCLOAK_URL || "http://localhost:8085";
const KEYCLOAK_REALM = process.env.KEYCLOAK_WEB_CLIENT_REALM || "blog-realm";
const KEYCLOAK_CLIENT_ID =
  process.env.KEYCLOAK_BLOG_WEB_CLIENT_ID || "blog-next";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const providerAliases = {
  google: "google",
  github: "github",
} as const;

type Provider = keyof typeof providerAliases;

const isProvider = (provider: string): provider is Provider => {
  return provider in providerAliases;
};

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ provider: string }> },
) {
  const { provider } = await context.params;

  if (!isProvider(provider)) {
    return NextResponse.redirect(new URL("/users/sign-in", request.url));
  }

  const returnTo =
    request.nextUrl.searchParams.get("returnTo") || "/users/authors";

  const statePayload = {
    provider,
    returnTo,
    nonce: crypto.randomUUID(),
  };

  const state = Buffer.from(JSON.stringify(statePayload)).toString("base64url");

  const redirectUri = `${APP_URL}/local/auth/callback`;

  const authUrl = new URL(
    `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/auth`,
  );

  authUrl.searchParams.set("client_id", KEYCLOAK_CLIENT_ID);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "openid email profile");
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("kc_idp_hint", providerAliases[provider]);
  authUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(authUrl);

  response.cookies.set("oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10,
  });

  return response;
}

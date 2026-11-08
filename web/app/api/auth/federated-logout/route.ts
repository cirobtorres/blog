// app/api/auth/federated-logout/route.ts
import { NextResponse } from "next/server";
import { auth } from "../../../../keycloak/auth";

export async function GET(req: Request) {
  const session = await auth();
  const { searchParams, origin } = new URL(req.url);
  const redirectTo = searchParams.get("redirect") ?? origin;

  const url = new URL(
    `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout`,
  );
  if (session?.idToken) url.searchParams.set("id_token_hint", session.idToken);
  url.searchParams.set("post_logout_redirect_uri", redirectTo);

  return NextResponse.json({ url: url.toString() });
}

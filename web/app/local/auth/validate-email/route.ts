import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const keycloakLink = searchParams.get("keycloak_link");
  if (!keycloakLink) {
    return NextResponse.redirect(
      new URL("/users/sign-in/error?msg=link_invalido", request.url),
    );
  }
  try {
    const targetUrl = new URL(keycloakLink);
    const finalRedirectUri = new URL(
      "/users/sign-in/validate-email/success",
      request.url,
    ).toString();
    targetUrl.searchParams.set("redirect_uri", finalRedirectUri);
    return NextResponse.redirect(targetUrl.toString());
  } catch (error) {
    console.error("Erro ao estruturar redirecionamento:", error);
    return NextResponse.redirect(
      new URL("/users/sign-in/error?msg=expirado_ou_invalido", request.url),
    );
  }
}

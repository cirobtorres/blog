import { auth } from "@/keycloak/auth";
import { NextRequest, NextResponse } from "next/server";
import { hasAutorities } from "./routing/protected/hasAutorities";
import { Session } from "next-auth";

interface NextAuthRequest extends NextRequest {
  auth: Session | null;
}

export default auth(async function middleware(request: NextAuthRequest) {
  const { pathname } = request.nextUrl;
  const session = request.auth;

  // PUBLIC-----------------------------------------------
  // Direct pass
  const requiredAuthorities = hasAutorities(pathname);

  if (!requiredAuthorities) {
    return NextResponse.next();
  }

  // PRIVATE----------------------------------------------
  // Unauthenticated: redirect
  if (!session || !session.user) {
    const loginUrl = new URL("/api/auth/signin/keycloak", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Banned users: redirect
  if (session.user.isBanned) {
    return NextResponse.redirect(new URL("/user/banned", request.url));
  }

  // Unauthorized: redirect
  const userAuthorities: string[] = session.user.authorities || [];
  const normalizedUserAuthorities = userAuthorities.map((role: string) =>
    role.toUpperCase(),
  );

  const hasPermission = requiredAuthorities.every((role) =>
    normalizedUserAuthorities.includes(role.toUpperCase()),
  );

  if (!hasPermission) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Authenticated and authorized
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

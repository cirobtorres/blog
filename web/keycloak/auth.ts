import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";
import { JWT } from "next-auth/jwt";
import { apiServerUrls } from "../routing/routes";

const WEB_CLIENT_ID = process.env.NEXT_PUBLIC_KEYCLOAK_BLOG_WEB_CLIENT_ID;
const WEB_CLIENT_SECRET = process.env.KEYCLOAK_BLOG_WEB_CLIENT_SECRET;
const ISSUER = process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER;

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const params = new URLSearchParams({
      client_id: WEB_CLIENT_ID!,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken ?? "",
    });

    if (WEB_CLIENT_SECRET) {
      params.append("client_secret", WEB_CLIENT_SECRET);
    }

    const response = await fetch(`${ISSUER}/protocol/openid-connect/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      console.warn("(refreshAccessToken)");
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires:
        Date.now() + (refreshedTokens.expires_in ?? 300) * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      error: undefined,
    };
  } catch (error) {
    console.error("(refreshAccessToken)", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Keycloak({
      clientId: WEB_CLIENT_ID!,
      clientSecret: WEB_CLIENT_SECRET!,
      issuer: ISSUER,
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at
          ? account.expires_at * 1000
          : Date.now() + (account.expires_in ?? 300) * 1000;
        try {
          const response = await fetch(apiServerUrls.auth.me, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${account.access_token}`,
            },
          });
          if (response.ok) {
            const springUser = await response.json();
            token.dbUserId = springUser.id;
            token.isBanned = springUser.isBanned;
            token.isDeleted = springUser.isDeleted;
            token.authorities = springUser.authorities;
          } else if (response.status === 403) {
            token.isBanned = true;
          }
        } catch (error) {
          console.error("NextAuth failed to synchronize tables:", error);
        }
      }

      if (Date.now() < (token.accessTokenExpires as number) - 10000) {
        return token;
      }

      if (!token.refreshToken) {
        console.error("No refresh token available on token object.");
        return { ...token, error: "RefreshAccessTokenError" };
      }

      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.idToken = token.idToken as string;
      session.error = token.error as string | undefined;
      if (session.user) {
        session.user.id = token.dbUserId as string;
        session.user.isBanned = token.isBanned as boolean;
        session.user.isDeleted = token.isDeleted as boolean;
        session.user.isEmailVerified = token.isEmailVerified as boolean;
        session.user.authorities = token.authorities as string[];
      }
      return session;
    },
  },
});

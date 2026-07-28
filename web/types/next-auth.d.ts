import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    idToken?: string;
    error?: string;
    user: {
      id: string;
      isBanned: boolean;
      isDeleted: boolean;
      isEmailVerified: boolean;
      authorities: string[];
    } & DefaultSession["user"]; // name + email
  }

  interface User extends DefaultUser {
    id: string;
    isBanned: boolean;
    isDeleted: boolean;
    isEmailVerified: boolean;
    authorities: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    idToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    dbUserId?: string;
    isBanned?: boolean;
    isDeleted?: boolean;
    isEmailVerified?: boolean;
    authorities?: string[];
    error?: string;
  }
}

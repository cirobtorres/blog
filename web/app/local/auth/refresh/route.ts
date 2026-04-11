import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { applySpringCookies } from "@/services/helpers/server";
import { coordinatedRefresh } from "../../../../services/helpers/refresh";

export async function POST(_request: NextRequest) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { error: "No refresh token found" },
      { status: 401 },
    );
  }

  try {
    const { ok, setCookieHeader } = await coordinatedRefresh(refreshToken);

    if (ok) {
      const response = NextResponse.json({ ok: true });
      if (setCookieHeader) {
        applySpringCookies(response, setCookieHeader);
      }
      return response;
    }

    return NextResponse.json(
      { error: "Session expired on server" },
      { status: 401 },
    );
  } catch (error) {
    console.error("Refresh Route Error:", error);
    return NextResponse.json(
      { error: "Internal server error during refresh" },
      { status: 500 },
    );
  }
}

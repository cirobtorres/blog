import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { apiServerUrls } from "@/routing/routes";
import { applySpringCookies } from "@/services/helpers/server";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { error: "No refresh token found" },
      { status: 401 },
    );
  }

  try {
    const refreshRes = await fetch(apiServerUrls.refresh, {
      method: "POST",
      headers: {
        Cookie: `refresh_token=${refreshToken}`,
      },
    });

    if (refreshRes.ok) {
      const response = NextResponse.json({ ok: true });

      const setCookieHeader = refreshRes.headers.get("set-cookie");

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

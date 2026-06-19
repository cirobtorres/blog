import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { apiServerUrls } from "../../../../routing/routes";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const refreshRes = await fetch(apiServerUrls.refresh, {
    method: "POST",
    headers: {
      Cookie: `refresh_token=${refreshToken}`,
    },
  });

  const response = NextResponse.json({
    ok: refreshRes.ok,
  });

  if (refreshRes.ok) {
    const cookies = refreshRes.headers.getSetCookie();

    for (const cookie of cookies) {
      response.headers.append("Set-Cookie", cookie);
    }
  }

  return response;
}

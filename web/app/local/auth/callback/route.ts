import { NextResponse } from "next/server";
import { pubWebUrlsAbsPath } from "../../../../routing/routes";

export async function GET() {
  return NextResponse.redirect(pubWebUrlsAbsPath.home);
}

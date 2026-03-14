import { NextResponse } from "next/server";
import { pubWebUrlsAbsPath } from "../../../../config/routes";

export async function GET() {
  return NextResponse.redirect(pubWebUrlsAbsPath.home);
}

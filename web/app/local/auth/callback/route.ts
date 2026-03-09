import { NextResponse } from "next/server";
import { publicWebUrls } from "../../../../config/routes";

export async function GET() {
  return NextResponse.redirect(publicWebUrls.home);
}

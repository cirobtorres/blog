import { NextResponse } from "next/server";
import { webUrls } from "../../../../urls";

export async function GET() {
  return NextResponse.redirect(webUrls.home);
}

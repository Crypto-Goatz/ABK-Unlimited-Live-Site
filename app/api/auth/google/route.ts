import { NextResponse } from "next/server";
import { getGoogleLoginUrl } from "@/lib/auth/google-oauth";

export async function GET() {
  try {
    const url = getGoogleLoginUrl();
    return NextResponse.redirect(url);
  } catch {
    return NextResponse.redirect(
      new URL("/admin/login?error=auth_failed", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
    );
  }
}

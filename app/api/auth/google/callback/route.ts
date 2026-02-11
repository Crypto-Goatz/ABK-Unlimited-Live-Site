import { NextRequest, NextResponse } from "next/server";
import { exchangeGoogleCode, isAuthorizedAdmin } from "@/lib/auth/google-oauth";
import { createSessionToken, COOKIE_NAME, EXPIRY_DAYS } from "@/lib/auth/session";

export async function GET(req: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/admin/login?error=no_code", baseUrl));
  }

  try {
    const user = await exchangeGoogleCode(code);

    if (!isAuthorizedAdmin(user.email)) {
      return NextResponse.redirect(
        new URL("/admin/login?error=unauthorized", baseUrl)
      );
    }

    const token = await createSessionToken(user);
    const response = NextResponse.redirect(new URL("/admin", baseUrl));

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: EXPIRY_DAYS * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.redirect(
      new URL("/admin/login?error=auth_failed", baseUrl)
    );
  }
}

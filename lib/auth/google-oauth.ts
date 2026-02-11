import { google } from "googleapis";

const SCOPES = ["openid", "email", "profile"];

export function getGoogleOAuthClient() {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const redirectUri =
    process.env.GOOGLE_OAUTH_REDIRECT_URI ||
    `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/auth/google/callback`;

  if (!clientId || !clientSecret) {
    throw new Error("Google OAuth credentials not configured");
  }

  return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
}

export function getGoogleLoginUrl(): string {
  const client = getGoogleOAuthClient();
  return client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "select_account",
  });
}

export async function exchangeGoogleCode(code: string): Promise<{
  email: string;
  name: string;
  picture: string;
}> {
  const client = getGoogleOAuthClient();
  const { tokens } = await client.getToken(code);
  client.setCredentials(tokens);

  const oauth2 = google.oauth2({ version: "v2", auth: client });
  const { data } = await oauth2.userinfo.get();

  if (!data.email) {
    throw new Error("No email returned from Google");
  }

  return {
    email: data.email,
    name: data.name || data.email,
    picture: data.picture || "",
  };
}

export function isAuthorizedAdmin(email: string): boolean {
  const allowedEmails = process.env.ADMIN_EMAILS || "";
  const emailList = allowedEmails
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (emailList.length === 0) return false;
  return emailList.includes(email.toLowerCase());
}

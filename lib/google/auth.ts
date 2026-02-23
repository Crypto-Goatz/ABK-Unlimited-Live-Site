import { google } from "googleapis";

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/script.projects",
  "https://www.googleapis.com/auth/script.deployments",
  "https://www.googleapis.com/auth/script.scriptapp",
];

const GMAIL_SCOPES = ["https://www.googleapis.com/auth/gmail.send"];

let cachedAuth: InstanceType<typeof google.auth.GoogleAuth> | null = null;

export function getGoogleAuth() {
  if (cachedAuth) return cachedAuth;

  const keyBase64 = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!keyBase64) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY is not configured");
  }

  const credentials = JSON.parse(
    Buffer.from(keyBase64, "base64").toString("utf-8")
  );

  cachedAuth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  });

  return cachedAuth;
}

/**
 * Create a GoogleAuth instance from credentials directly.
 * Used during setup before env vars exist.
 */
export function getAuthFromCredentials(credentials: object) {
  return new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  });
}

export function getSheetsClient() {
  return google.sheets({ version: "v4", auth: getGoogleAuth() });
}

export function getDriveClient() {
  return google.drive({ version: "v3", auth: getGoogleAuth() });
}

export function getSheetsClientWithAuth(auth: InstanceType<typeof google.auth.GoogleAuth>) {
  return google.sheets({ version: "v4", auth });
}

export function getDriveClientWithAuth(auth: InstanceType<typeof google.auth.GoogleAuth>) {
  return google.drive({ version: "v3", auth });
}

/**
 * Gmail client with domain-wide delegation (impersonates sender)
 * Requires gmail.send scope authorized in Google Workspace admin
 */
export function getGmailClient() {
  const keyBase64 = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!keyBase64) return null;

  const credentials = JSON.parse(
    Buffer.from(keyBase64, "base64").toString("utf-8")
  );

  const impersonateEmail =
    process.env.GOOGLE_IMPERSONATE_EMAIL || "brian@abkunlimited.com";

  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: GMAIL_SCOPES,
    subject: impersonateEmail,
  });

  return google.gmail({ version: "v1", auth });
}

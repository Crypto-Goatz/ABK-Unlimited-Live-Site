/**
 * Centralized configuration access.
 * Re-exports getSiteConfig and provides runtime env checks.
 */

export { getSiteConfig, type SiteConfig } from "@/config/site.config";
export { SHEETS_SCHEMA, type SheetName } from "@/config/sheets-schema";

/**
 * Check if all required environment variables are set.
 * Returns an array of missing variable names.
 */
export function checkRequiredEnv(): string[] {
  const required = [
    "GOOGLE_SHEETS_ID",
    "GOOGLE_DRIVE_FOLDER_ID",
    "GOOGLE_SERVICE_ACCOUNT_KEY",
    "GOOGLE_OAUTH_CLIENT_ID",
    "SESSION_SECRET",
  ];

  return required.filter((key) => !process.env[key]);
}

/**
 * Check if optional integrations are configured.
 */
export function getIntegrationStatus() {
  return {
    googleSheets: !!process.env.GOOGLE_SHEETS_ID,
    googleDrive: !!process.env.GOOGLE_DRIVE_FOLDER_ID,
    gemini: !!process.env.GEMINI_API_KEY,
    cro9: !!process.env.NEXT_PUBLIC_CRO9_KEY,
    crm: !!process.env.CRM_CLIENT_ID || !!process.env.CRM_API_KEY,
    crmTracking: !!process.env.NEXT_PUBLIC_CRM_TRACKING_ID,
    googleOAuth: !!process.env.GOOGLE_OAUTH_CLIENT_ID,
    socialPlanner: !!process.env.CRM_CLIENT_ID,
    appsScript: !!process.env.BLOG_PUBLISH_API_KEY,
  };
}

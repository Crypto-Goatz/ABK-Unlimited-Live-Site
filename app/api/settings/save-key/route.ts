import { NextRequest, NextResponse } from "next/server";
import { setEnvVar, triggerRedeploy } from "@/lib/setup/vercel";

/**
 * POST /api/settings/save-key
 * Save an API key as a Vercel environment variable.
 * This is preferred over storing API keys in Google Sheets.
 *
 * Body: { key: string, value: string, redeploy?: boolean }
 */

const ALLOWED_KEYS: Record<string, string> = {
  gemini: "GEMINI_API_KEY",
  cro9: "NEXT_PUBLIC_CRO9_KEY",
  crm_api: "CRM_API_KEY",
  crm_location: "CRM_LOCATION_ID",
  crm_tracking: "NEXT_PUBLIC_CRM_TRACKING_ID",
  crm_chat_widget: "NEXT_PUBLIC_CRM_CHAT_WIDGET_ID",
  ga4: "NEXT_PUBLIC_GA4_MEASUREMENT_ID",
  primary: "NEXT_PUBLIC_COLOR_PRIMARY",
  secondary: "NEXT_PUBLIC_COLOR_SECONDARY",
  accent: "NEXT_PUBLIC_COLOR_ACCENT",
};

export async function POST(req: NextRequest) {
  try {
    const { key, value, redeploy } = await req.json();

    if (!key || typeof key !== "string") {
      return NextResponse.json({ error: "Missing key" }, { status: 400 });
    }

    const envKey = ALLOWED_KEYS[key];
    if (!envKey) {
      return NextResponse.json(
        { error: `Invalid key. Allowed: ${Object.keys(ALLOWED_KEYS).join(", ")}` },
        { status: 400 }
      );
    }

    if (!value || typeof value !== "string" || !value.trim()) {
      return NextResponse.json({ error: "Missing value" }, { status: 400 });
    }

    await setEnvVar(envKey, value.trim());

    // Optionally trigger a redeploy to pick up the new env var
    if (redeploy) {
      try {
        await triggerRedeploy();
      } catch {
        // Non-fatal — env var is saved, redeploy can happen manually
      }
    }

    return NextResponse.json({
      success: true,
      message: `${envKey} saved. ${redeploy ? "Redeployment triggered." : "Redeploy to activate."}`,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

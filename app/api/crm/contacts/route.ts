import { NextRequest, NextResponse } from "next/server";
import { createCRMClientFromEnv } from "@/lib/crm-client";
import { getSiteConfigFromSheet } from "@/lib/google/sheets";

export async function GET(req: NextRequest) {
  try {
    const siteConfig: Record<string, string> = await getSiteConfigFromSheet().catch(() => ({}));
    const client = createCRMClientFromEnv(siteConfig);

    const query = req.nextUrl.searchParams.get("query") || undefined;
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "20", 10);

    const data = await client.listContacts({ query, page, limit });
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "CRM error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { createCRMClientFromEnv } from "@/lib/crm-client";
import { getSiteConfigFromSheet } from "@/lib/google/sheets";

export async function GET() {
  try {
    const siteConfig: Record<string, string> = await getSiteConfigFromSheet().catch(() => ({}));
    const client = createCRMClientFromEnv(siteConfig);
    const data = await client.listSocialPosts();
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "CRM error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const siteConfig: Record<string, string> = await getSiteConfigFromSheet().catch(() => ({}));
    const client = createCRMClientFromEnv(siteConfig);
    const body = await req.json();

    const data = await client.createSocialPost({
      locationId: siteConfig.crm_location_id || process.env.CRM_LOCATION_ID || "",
      post: body.post,
      platforms: body.platforms || ["facebook"],
      scheduledAt: body.scheduledAt,
    });

    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "CRM error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

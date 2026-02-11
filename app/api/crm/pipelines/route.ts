import { NextRequest, NextResponse } from "next/server";
import { createCRMClientFromEnv } from "@/lib/crm-client";
import { getSiteConfigFromSheet } from "@/lib/google/sheets";

export async function GET(req: NextRequest) {
  try {
    const siteConfig: Record<string, string> = await getSiteConfigFromSheet().catch(() => ({}));
    const client = createCRMClientFromEnv(siteConfig);

    const pipelineId = req.nextUrl.searchParams.get("pipelineId") || undefined;

    const [pipelines, opportunities] = await Promise.all([
      client.listPipelines(),
      client.listOpportunities(pipelineId),
    ]);

    return NextResponse.json({ ...pipelines, ...opportunities });
  } catch (error) {
    const message = error instanceof Error ? error.message : "CRM error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

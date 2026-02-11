import { NextRequest, NextResponse } from "next/server";
import { createCRMClientFromEnv } from "@/lib/crm-client";
import { getSiteConfigFromSheet } from "@/lib/google/sheets";

export async function GET() {
  try {
    const siteConfig: Record<string, string> = await getSiteConfigFromSheet().catch(() => ({}));
    const client = createCRMClientFromEnv(siteConfig);
    const data = await client.listWorkflows();
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
    const { contactId, workflowId } = await req.json();

    if (!contactId || !workflowId) {
      return NextResponse.json(
        { error: "contactId and workflowId required" },
        { status: 400 }
      );
    }

    await client.enrollInWorkflow(contactId, workflowId);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "CRM error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

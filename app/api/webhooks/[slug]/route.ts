import { NextRequest, NextResponse } from "next/server";
import { getSheetData } from "@/lib/google/sheets";
import { createCRMClientFromEnv } from "@/lib/crm-client";
import { getSiteConfigFromSheet } from "@/lib/google/sheets";

interface WebhookConfig {
  slug: string;
  name: string;
  status: string;
  auth_type: string;
  auth_secret: string;
  action_type: string;
  action_config: string;
}

async function getWebhookBySlug(slug: string): Promise<WebhookConfig | null> {
  try {
    const rows = await getSheetData("webhooks");
    const row = rows.find((r) => r.slug === slug);
    if (!row || row.status !== "active") return null;
    return row as unknown as WebhookConfig;
  } catch {
    return null;
  }
}

function verifyAuth(req: NextRequest, webhook: WebhookConfig): boolean {
  if (webhook.auth_type === "none") return true;
  if (webhook.auth_type === "header") {
    const key = req.headers.get("x-webhook-secret");
    return key === webhook.auth_secret;
  }
  if (webhook.auth_type === "query") {
    const key = req.nextUrl.searchParams.get("secret");
    return key === webhook.auth_secret;
  }
  return false;
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const webhook = await getWebhookBySlug(slug);

  if (!webhook) {
    return NextResponse.json({ error: "Webhook not found" }, { status: 404 });
  }

  if (!verifyAuth(req, webhook)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));

  try {
    let config: Record<string, unknown> = {};
    try {
      config = JSON.parse(webhook.action_config || "{}");
    } catch {
      config = {};
    }

    switch (webhook.action_type) {
      case "crm_contact": {
        const siteConfig: Record<string, string> = await getSiteConfigFromSheet().catch(() => ({}));
        const client = createCRMClientFromEnv(siteConfig);
        // Map incoming fields using action_config field mapping
        const fieldMap = (config.fieldMap || {}) as Record<string, string>;
        const contactData: Record<string, unknown> = {
          locationId:
            siteConfig.crm_location_id || process.env.CRM_LOCATION_ID || "",
        };
        for (const [crmField, bodyField] of Object.entries(fieldMap)) {
          if (body[bodyField] !== undefined) {
            contactData[crmField] = body[bodyField];
          }
        }
        // Direct pass-through for standard fields
        if (body.firstName) contactData.firstName = body.firstName;
        if (body.lastName) contactData.lastName = body.lastName;
        if (body.email) contactData.email = body.email;
        if (body.phone) contactData.phone = body.phone;

        const res = await fetch(
          "https://services.leadconnectorhq.com/contacts/",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${
                siteConfig.crm_access_token || process.env.CRM_API_KEY || ""
              }`,
              Version: "2021-07-28",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(contactData),
          }
        );
        const result = await res.json();
        return NextResponse.json({
          success: res.ok,
          action: "crm_contact",
          contactId: result?.contact?.id,
        });
      }

      case "crm_workflow": {
        const siteConfig: Record<string, string> = await getSiteConfigFromSheet().catch(() => ({}));
        const client = createCRMClientFromEnv(siteConfig);
        const workflowId = config.workflowId as string;
        const contactId = body.contactId as string;
        if (!workflowId || !contactId) {
          return NextResponse.json(
            { error: "workflowId and contactId required" },
            { status: 400 }
          );
        }
        await client.enrollInWorkflow(contactId, workflowId);
        return NextResponse.json({ success: true, action: "crm_workflow" });
      }

      case "forward": {
        const targetUrl = config.targetUrl as string;
        if (!targetUrl) {
          return NextResponse.json(
            { error: "Forward target URL not configured" },
            { status: 500 }
          );
        }
        const fwdRes = await fetch(targetUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        return NextResponse.json({
          success: fwdRes.ok,
          action: "forward",
          status: fwdRes.status,
        });
      }

      default:
        return NextResponse.json(
          { error: `Unknown action type: ${webhook.action_type}` },
          { status: 400 }
        );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

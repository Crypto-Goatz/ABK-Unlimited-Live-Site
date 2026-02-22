/**
 * CRM Webhook Handler
 * Receives contact create/update events from CRM and syncs to Google Sheets
 */

import { NextRequest, NextResponse } from "next/server";
import { handleCRMWebhook } from "@/lib/crm-sync";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    // Validate basic structure
    if (!payload.contactId && !payload.contact_id) {
      return NextResponse.json({ error: "Missing contactId" }, { status: 400 });
    }

    await handleCRMWebhook({
      type: payload.type || payload.event || "contact.update",
      contactId: payload.contactId || payload.contact_id,
      locationId: payload.locationId || payload.location_id || "",
      ...payload,
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("CRM webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}

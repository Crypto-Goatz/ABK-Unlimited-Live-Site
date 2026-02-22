/**
 * Attribution Analytics API
 * GET — returns ROI breakdown by source/campaign/medium
 * POST — record a new analytics event (form submission, page view, conversion)
 */

import { NextRequest, NextResponse } from "next/server";
import { getAttributionSummary, recordAnalyticsEvent } from "@/lib/analytics-loop";

export async function GET(req: NextRequest) {
  try {
    const period = req.nextUrl.searchParams.get("period") || "30d";
    const summary = await getAttributionSummary(period);
    return NextResponse.json(summary);
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Failed to fetch attribution data";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await recordAnalyticsEvent({
      customerId: body.customerId,
      crmContactId: body.crmContactId,
      eventName: body.eventName || "form_submission",
      eventCategory: body.eventCategory || "lead",
      attribution: {
        gclid: body.gclid,
        fbclid: body.fbclid,
        msclkid: body.msclkid,
        utmSource: body.utm_source,
        utmMedium: body.utm_medium,
        utmCampaign: body.utm_campaign,
        utmTerm: body.utm_term,
        utmContent: body.utm_content,
        gaClientId: body.ga_client_id,
        sessionId: body.session_id,
        referrer: body.referrer,
        landingPage: body.landing_page,
        deviceType: body.device_type,
      },
      pagePath: body.conversion_page || body.page_path || "/",
      conversionValue: body.conversion_value,
    });

    return NextResponse.json({ recorded: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Failed to record event";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

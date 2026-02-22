/**
 * GA4 Automated Feedback Loop
 *
 * Captures attribution data (gclid, fbclid, UTM params, GA client ID)
 * from both organic and paid traffic, ties it back to CRM contacts,
 * and enables closed-loop optimization.
 *
 * Flow:
 * 1. Visitor arrives → capture click IDs + UTMs + GA client ID (client-side)
 * 2. Form submission → attach attribution to lead/customer record
 * 3. Lead scores in CRM → webhook back to sheets
 * 4. Analytics events sheet tracks the full funnel
 * 5. Admin dashboard shows ROI by source/campaign
 */

import { appendSheetRow, getSheetData } from "./google/sheets";
import { trackConversion } from "./cro9";
import type { AnalyticsEventRow } from "@/config/sheets-schema";

/**
 * Attribution data captured from the visitor's session
 */
export interface Attribution {
  gclid?: string;
  fbclid?: string;
  msclkid?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gaClientId?: string;
  sessionId?: string;
  referrer?: string;
  landingPage?: string;
  deviceType?: string;
  city?: string;
}

/**
 * Record an analytics event tied to a customer
 */
export async function recordAnalyticsEvent(event: {
  customerId?: string;
  crmContactId?: string;
  eventName: string;
  eventCategory: string;
  attribution: Attribution;
  pagePath: string;
  conversionValue?: number;
}): Promise<void> {
  const id = `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  try {
    await appendSheetRow("analytics_events", {
      id,
      customer_id: event.customerId || "",
      crm_contact_id: event.crmContactId || "",
      event_name: event.eventName,
      event_category: event.eventCategory,
      source: event.attribution.utmSource || (event.attribution.gclid ? "google" : event.attribution.fbclid ? "facebook" : "organic"),
      medium: event.attribution.utmMedium || (event.attribution.gclid ? "cpc" : event.attribution.fbclid ? "paid-social" : "organic"),
      campaign: event.attribution.utmCampaign || "",
      gclid: event.attribution.gclid || "",
      fbclid: event.attribution.fbclid || "",
      page_path: event.pagePath,
      referrer: event.attribution.referrer || "",
      ga_client_id: event.attribution.gaClientId || "",
      session_id: event.attribution.sessionId || "",
      device_type: event.attribution.deviceType || "",
      city: event.attribution.city || "",
      conversion_value: String(event.conversionValue || 0),
      timestamp: new Date().toISOString(),
    });

    // Also fire CRO9 conversion event
    await trackConversion({
      name: event.eventName,
      value: event.conversionValue,
      metadata: {
        source: event.attribution.utmSource || "organic",
        medium: event.attribution.utmMedium || "",
        campaign: event.attribution.utmCampaign || "",
        gclid: event.attribution.gclid || "",
        crm_contact_id: event.crmContactId || "",
      },
    });
  } catch (err) {
    console.error("Failed to record analytics event:", err);
  }
}

/**
 * Get attribution summary — ROI by source/campaign
 */
export async function getAttributionSummary(period?: string): Promise<{
  bySource: Record<string, { leads: number; value: number; conversions: number }>;
  byCampaign: Record<string, { leads: number; value: number; conversions: number }>;
  byMedium: Record<string, { leads: number; value: number; conversions: number }>;
  totalLeads: number;
  totalValue: number;
  paidLeads: number;
  organicLeads: number;
}> {
  const events = (await getSheetData("analytics_events")) as unknown as AnalyticsEventRow[];

  // Filter by period if specified
  let filtered = events;
  if (period) {
    const now = Date.now();
    const ms: Record<string, number> = {
      "7d": 7 * 86400000,
      "30d": 30 * 86400000,
      "90d": 90 * 86400000,
    };
    const cutoff = now - (ms[period] || ms["30d"]);
    filtered = events.filter((e) => new Date(e.timestamp).getTime() > cutoff);
  }

  const bySource: Record<string, { leads: number; value: number; conversions: number }> = {};
  const byCampaign: Record<string, { leads: number; value: number; conversions: number }> = {};
  const byMedium: Record<string, { leads: number; value: number; conversions: number }> = {};

  let totalLeads = 0;
  let totalValue = 0;
  let paidLeads = 0;
  let organicLeads = 0;

  for (const event of filtered) {
    const source = event.source || "direct";
    const campaign = event.campaign || "(none)";
    const medium = event.medium || "none";
    const value = parseFloat(event.conversion_value) || 0;
    const isConversion = event.event_category === "conversion";

    // By source
    if (!bySource[source]) bySource[source] = { leads: 0, value: 0, conversions: 0 };
    bySource[source].leads++;
    bySource[source].value += value;
    if (isConversion) bySource[source].conversions++;

    // By campaign
    if (campaign !== "(none)") {
      if (!byCampaign[campaign]) byCampaign[campaign] = { leads: 0, value: 0, conversions: 0 };
      byCampaign[campaign].leads++;
      byCampaign[campaign].value += value;
      if (isConversion) byCampaign[campaign].conversions++;
    }

    // By medium
    if (!byMedium[medium]) byMedium[medium] = { leads: 0, value: 0, conversions: 0 };
    byMedium[medium].leads++;
    byMedium[medium].value += value;
    if (isConversion) byMedium[medium].conversions++;

    totalLeads++;
    totalValue += value;
    if (event.gclid || event.fbclid || medium === "cpc" || medium === "paid-social") {
      paidLeads++;
    } else {
      organicLeads++;
    }
  }

  return { bySource, byCampaign, byMedium, totalLeads, totalValue, paidLeads, organicLeads };
}

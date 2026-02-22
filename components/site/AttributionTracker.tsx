"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * AttributionTracker — captures click IDs and UTM params from URL,
 * stores them in sessionStorage so they persist across page navigations
 * and get attached to form submissions.
 *
 * Captures: gclid, fbclid, msclkid, utm_source, utm_medium, utm_campaign,
 * utm_term, utm_content, GA client ID, referrer, landing page, device type
 */
export function AttributionTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only capture on first visit (don't overwrite existing attribution)
    const existing = sessionStorage.getItem("abk_attribution");
    if (existing) return;

    const attribution: Record<string, string> = {};

    // Click IDs
    const gclid = searchParams.get("gclid");
    const fbclid = searchParams.get("fbclid");
    const msclkid = searchParams.get("msclkid");

    if (gclid) attribution.gclid = gclid;
    if (fbclid) attribution.fbclid = fbclid;
    if (msclkid) attribution.msclkid = msclkid;

    // UTM params
    const utmSource = searchParams.get("utm_source");
    const utmMedium = searchParams.get("utm_medium");
    const utmCampaign = searchParams.get("utm_campaign");
    const utmTerm = searchParams.get("utm_term");
    const utmContent = searchParams.get("utm_content");

    if (utmSource) attribution.utm_source = utmSource;
    if (utmMedium) attribution.utm_medium = utmMedium;
    if (utmCampaign) attribution.utm_campaign = utmCampaign;
    if (utmTerm) attribution.utm_term = utmTerm;
    if (utmContent) attribution.utm_content = utmContent;

    // Landing page
    attribution.landing_page = pathname;

    // Referrer
    if (document.referrer && !document.referrer.includes(window.location.hostname)) {
      attribution.referrer = document.referrer;
    }

    // Device type
    const width = window.innerWidth;
    attribution.device_type = width < 768 ? "mobile" : width < 1024 ? "tablet" : "desktop";

    // GA Client ID — read from GA4 cookie _ga
    const gaCookie = document.cookie.split(";").find((c) => c.trim().startsWith("_ga="));
    if (gaCookie) {
      const parts = gaCookie.split(".");
      if (parts.length >= 4) {
        attribution.ga_client_id = `${parts[2]}.${parts[3]}`;
      }
    }

    // Generate session ID
    attribution.session_id = `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    sessionStorage.setItem("abk_attribution", JSON.stringify(attribution));
  }, [pathname, searchParams]);

  return null;
}

/**
 * Get stored attribution data (call from form submission handlers)
 */
export function getAttribution(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const stored = sessionStorage.getItem("abk_attribution");
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/**
 * Record a conversion page (call when form is on a specific page)
 */
export function setConversionPage(page: string): void {
  if (typeof window === "undefined") return;
  try {
    const stored = sessionStorage.getItem("abk_attribution");
    const data = stored ? JSON.parse(stored) : {};
    data.conversion_page = page;
    sessionStorage.setItem("abk_attribution", JSON.stringify(data));
  } catch {
    // ignore
  }
}

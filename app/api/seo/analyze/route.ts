/**
 * POST /api/seo/analyze — CRO9 → APEX-QA Feedback Loop
 * Pulls CRO9 behavioral data, analyzes underperforming pages,
 * and generates optimization recommendations + content.
 *
 * Can optionally auto-generate content for each recommendation.
 */

import { NextRequest, NextResponse } from "next/server";
import { getAnalyticsStats, getBehavioralData } from "@/lib/cro9";
import {
  analyzeWithCRO9,
  generateQA,
  optimizeNearMiss,
  generateFAQSchema,
} from "@/lib/apex-qa";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      period = "7d",
      autoGenerate = false,
      companyName = "ABK Unlimited",
      crmContactId,
    } = body;

    // Step 1: Pull CRO9 data
    let analyticsData;
    let behavioralData;
    try {
      [analyticsData, behavioralData] = await Promise.all([
        getAnalyticsStats(period),
        getBehavioralData(period),
      ]);
    } catch {
      // CRO9 may not be fully configured yet — use empty data
      analyticsData = { visitors: 0, pageviews: 0, bounceRate: 0, avgSessionDuration: 0, topPages: [] };
      behavioralData = { scrollDepth: [], rageClicks: [], deadClicks: [], exitIntent: [], formAbandonment: [] };
    }

    // Step 2: Analyze with AI
    const analysis = await analyzeWithCRO9(
      {
        topPages: analyticsData.topPages,
        rageClicks: behavioralData.rageClicks,
        deadClicks: behavioralData.deadClicks,
        scrollDepth: behavioralData.scrollDepth,
        bounceRate: analyticsData.bounceRate,
      },
      companyName
    );

    // Step 3: Optionally auto-generate content for each recommendation
    let generatedContent: Array<{
      page: string;
      type: string;
      content: unknown;
    }> = [];

    if (autoGenerate && analysis.recommendations.length > 0) {
      const topRecs = analysis.recommendations
        .filter((r) => r.priority === "high")
        .slice(0, 3);

      const contentPromises = topRecs.map(async (rec) => {
        if (
          rec.action.toLowerCase().includes("faq") ||
          rec.action.toLowerCase().includes("schema")
        ) {
          const result = await generateFAQSchema({
            targetUrl: rec.page,
            keywords: rec.keywords,
            crmContactId,
          });
          return { page: rec.page, type: "faq-schema", content: result };
        } else if (
          rec.action.toLowerCase().includes("content") ||
          rec.action.toLowerCase().includes("restructure")
        ) {
          const result = await optimizeNearMiss({
            targetUrl: rec.page,
            keywords: rec.keywords,
            crmContactId,
          });
          return { page: rec.page, type: "near-miss-optimize", content: result };
        } else {
          const result = await generateQA({
            targetUrl: rec.page,
            keywords: rec.keywords,
            crmContactId,
          });
          return { page: rec.page, type: "qa-pair", content: result };
        }
      });

      generatedContent = await Promise.all(contentPromises);
    }

    return NextResponse.json({
      success: true,
      data: {
        period,
        analytics: {
          visitors: analyticsData.visitors,
          pageviews: analyticsData.pageviews,
          bounceRate: analyticsData.bounceRate,
        },
        behavioral: {
          rageClicks: behavioralData.rageClicks?.length || 0,
          deadClicks: behavioralData.deadClicks?.length || 0,
          lowScrollPages: behavioralData.scrollDepth?.filter(
            (s) => s.avgDepth < 50
          ).length || 0,
        },
        recommendations: analysis.recommendations,
        generatedContent,
      },
    });
  } catch (error) {
    console.error("[SEO/analyze] Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to analyze site",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/seo/optimize — GSC Near-Miss Optimizer
 * Generates optimized H2 + summary for pages ranking 11-20.
 * Logs results to CRM if crmContactId provided.
 */

import { NextRequest, NextResponse } from "next/server";
import { optimizeNearMiss } from "@/lib/apex-qa";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { targetUrl, keywords, crmContactId } = body;

    if (!targetUrl) {
      return NextResponse.json(
        { error: "targetUrl is required" },
        { status: 400 }
      );
    }

    if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
      return NextResponse.json(
        { error: "keywords array is required" },
        { status: 400 }
      );
    }

    const result = await optimizeNearMiss({
      targetUrl,
      keywords,
      crmContactId,
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("[SEO/optimize] Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to optimize content",
      },
      { status: 500 }
    );
  }
}

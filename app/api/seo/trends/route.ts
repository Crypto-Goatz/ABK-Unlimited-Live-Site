/**
 * POST /api/seo/trends — Local Trend Post Generator
 * Generates urgent Google Business Posts from search trend spikes.
 * Logs results to CRM if crmContactId provided.
 */

import { NextRequest, NextResponse } from "next/server";
import { generateTrendPost } from "@/lib/apex-qa";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { keywords, companyName, crmContactId } = body;

    if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
      return NextResponse.json(
        { error: "keywords array is required" },
        { status: 400 }
      );
    }

    const result = await generateTrendPost({
      targetUrl: "",
      keywords,
      companyName,
      crmContactId,
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("[SEO/trends] Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate trend post",
      },
      { status: 500 }
    );
  }
}

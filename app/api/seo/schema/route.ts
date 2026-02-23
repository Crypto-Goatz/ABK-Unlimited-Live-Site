/**
 * POST /api/seo/schema — FAQ Schema Builder
 * Auto-generates JSON-LD structured data for rich snippet display.
 * Logs results to CRM if crmContactId provided.
 */

import { NextRequest, NextResponse } from "next/server";
import { generateFAQSchema } from "@/lib/apex-qa";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { targetUrl, keywords, questions, crmContactId } = body;

    if (
      (!questions || questions.length === 0) &&
      (!keywords || keywords.length === 0)
    ) {
      return NextResponse.json(
        { error: "Either questions or keywords array is required" },
        { status: 400 }
      );
    }

    const result = await generateFAQSchema({
      targetUrl: targetUrl || "",
      keywords: keywords || [],
      questions,
      crmContactId,
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("[SEO/schema] Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate FAQ schema",
      },
      { status: 500 }
    );
  }
}

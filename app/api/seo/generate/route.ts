/**
 * POST /api/seo/generate — Q&A Bot
 * Generates keyword-rich Q&A pairs for Google Business Profile.
 * Logs results to CRM if crmContactId provided.
 */

import { NextRequest, NextResponse } from "next/server";
import { generateQA } from "@/lib/apex-qa";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { targetUrl, keywords, questions, companyName, crmContactId } = body;

    if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
      return NextResponse.json(
        { error: "keywords array is required" },
        { status: 400 }
      );
    }

    const result = await generateQA({
      targetUrl: targetUrl || "",
      keywords,
      questions,
      companyName,
      crmContactId,
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("[SEO/generate] Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to generate Q&A",
      },
      { status: 500 }
    );
  }
}

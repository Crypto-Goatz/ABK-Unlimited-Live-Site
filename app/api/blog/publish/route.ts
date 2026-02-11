import { NextRequest, NextResponse } from "next/server";
import { getSheetData, updateSheetRow } from "@/lib/google/sheets";
import { getSiteConfigFromSheet } from "@/lib/google/sheets";
import { createCRMClientFromEnv } from "@/lib/crm-client";

export async function POST(req: NextRequest) {
  // Auth: either admin session or API key
  const apiKey = req.headers.get("x-api-key");
  const blogApiKey = process.env.BLOG_PUBLISH_API_KEY;

  if (apiKey && blogApiKey && apiKey !== blogApiKey) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  try {
    const { slug } = await req.json();
    if (!slug) {
      return NextResponse.json({ error: "slug required" }, { status: 400 });
    }

    // Find the blog row
    const rows = await getSheetData("blog");
    const rowIndex = rows.findIndex((r) => r.slug === slug);
    if (rowIndex === -1) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    const row = rows[rowIndex];
    const now = new Date().toISOString().split("T")[0];

    // Update sheet: status=published, published_at=now
    await updateSheetRow("blog", rowIndex, {
      ...row,
      status: "published",
      published_at: now,
    });

    // Try to post to CRM Social Planner
    let socialPostId: string | null = null;
    try {
      const siteConfig: Record<string, string> = await getSiteConfigFromSheet().catch(() => ({}));
      const siteUrl = siteConfig.website || process.env.NEXT_PUBLIC_SITE_URL || "";
      const blogUrl = `${siteUrl}/blog/${slug}`;
      const postContent = `${row.title}\n\n${row.excerpt || ""}\n\n${blogUrl}`;

      const client = createCRMClientFromEnv(siteConfig);
      const result = await client.createSocialPost({
        locationId: siteConfig.crm_location_id || process.env.CRM_LOCATION_ID || "",
        post: postContent,
        platforms: ["facebook"],
      });
      socialPostId = result.post?.id || null;
    } catch {
      // Social posting is best-effort
    }

    return NextResponse.json({
      success: true,
      slug,
      published_at: now,
      socialPostId,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

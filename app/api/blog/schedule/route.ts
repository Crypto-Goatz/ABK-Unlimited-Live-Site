import { NextRequest, NextResponse } from "next/server";
import { getSheetData, updateSheetRow } from "@/lib/google/sheets";

export async function POST(req: NextRequest) {
  try {
    const { slug, publishAt } = await req.json();

    if (!slug || !publishAt) {
      return NextResponse.json(
        { error: "slug and publishAt required" },
        { status: 400 }
      );
    }

    const rows = await getSheetData("blog");
    const rowIndex = rows.findIndex((r) => r.slug === slug);
    if (rowIndex === -1) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    const row = rows[rowIndex];

    await updateSheetRow("blog", rowIndex, {
      ...row,
      status: "scheduled",
      published_at: publishAt,
    });

    return NextResponse.json({
      success: true,
      slug,
      status: "scheduled",
      publishAt,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

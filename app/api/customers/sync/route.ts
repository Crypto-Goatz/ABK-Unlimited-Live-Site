/**
 * Customer Sync API
 * POST — trigger a full sync from CRM → Google Sheets
 * PUT — update a customer (syncs to both sheet + CRM)
 */

import { NextRequest, NextResponse } from "next/server";
import { syncFromCRM, updateCustomer } from "@/lib/crm-sync";

export async function POST() {
  try {
    const result = await syncFromCRM();
    return NextResponse.json(result);
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Sync failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { rowIndex, updates } = await req.json();
    if (typeof rowIndex !== "number") {
      return NextResponse.json({ error: "rowIndex is required" }, { status: 400 });
    }
    const result = await updateCustomer(rowIndex, updates);
    return NextResponse.json(result);
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Update failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

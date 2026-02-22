/**
 * Customer Database API
 * GET — list/search customers from Google Sheets
 * POST — create a new customer (syncs to CRM + sheet)
 */

import { NextRequest, NextResponse } from "next/server";
import { getCustomers, createCustomer } from "@/lib/crm-sync";

export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const customers = await getCustomers({
      status: sp.get("status") || undefined,
      temperature: sp.get("temperature") || undefined,
      source: sp.get("source") || undefined,
      search: sp.get("search") || undefined,
    });

    return NextResponse.json({ customers, total: customers.length });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Failed to fetch customers";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await createCustomer(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Failed to create customer";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

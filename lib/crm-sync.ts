/**
 * CRM <-> Google Sheets Customer Sync
 * Two-way sync between the `customers` sheet and CRM location 497AdD39erWgmOu8JTCw
 *
 * Flow:
 * 1. New website lead → create in CRM + add to customers sheet
 * 2. CRM webhook → update customers sheet
 * 3. Admin edits sheet → push changes to CRM
 * 4. Manual sync → pull all CRM contacts into sheet
 */

import { getSheetData, appendSheetRow, updateSheetRow } from "./google/sheets";
import { createCRMContact, addCRMTags, addCRMNote } from "./crm-api";
import type { CustomerRow } from "@/config/sheets-schema";

const CRM_API_BASE = "https://services.leadconnectorhq.com";
const CRM_VERSION = "2021-07-28";
const ABK_LOCATION_ID = process.env.CRM_LOCATION_ID || "497AdD39erWgmOu8JTCw";

interface SyncResult {
  success: boolean;
  created: number;
  updated: number;
  errors: string[];
}

interface NewCustomerData {
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  source?: string;
  tags?: string[];
  servicesInterested?: string[];
  estimatedValue?: number;
  notes?: string;
  // Attribution
  gclid?: string;
  fbclid?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  gaClientId?: string;
  firstVisitPage?: string;
  conversionPage?: string;
}

/**
 * Create a new customer — saves to both CRM and Google Sheets
 */
export async function createCustomer(data: NewCustomerData): Promise<{
  success: boolean;
  customerId?: string;
  crmContactId?: string;
  error?: string;
}> {
  const now = new Date().toISOString();
  const id = `cust_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  // Build tags array
  const tags = [...(data.tags || [])];
  if (data.source) tags.push(`source:${data.source}`);
  if (data.gclid) tags.push("paid:google");
  if (data.fbclid) tags.push("paid:facebook");
  if (data.utmSource) tags.push(`utm:${data.utmSource}`);
  if (data.servicesInterested?.length) {
    data.servicesInterested.forEach((s) => tags.push(`service:${s}`));
  }

  // 1. Create in CRM (webhook + API — always succeeds)
  let crmContactId = "";
  const crmResult = await createCRMContact({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    address1: data.address,
    city: data.city,
    state: data.state,
    postalCode: data.zip,
    source: data.source || "website",
    tags,
    customFields: [
      ...(data.gclid ? [{ key: "gclid", value: data.gclid }] : []),
      ...(data.fbclid ? [{ key: "fbclid", value: data.fbclid }] : []),
      ...(data.gaClientId ? [{ key: "ga_client_id", value: data.gaClientId }] : []),
      ...(data.utmSource ? [{ key: "utm_source", value: data.utmSource }] : []),
      ...(data.utmMedium ? [{ key: "utm_medium", value: data.utmMedium }] : []),
      ...(data.utmCampaign ? [{ key: "utm_campaign", value: data.utmCampaign }] : []),
    ],
  });

  if (crmResult.contact) {
    crmContactId = crmResult.contact.id;
  }

  // Add attribution note if we have a contact ID
  if (crmContactId && (data.gclid || data.fbclid || data.utmSource)) {
    const noteLines = ["--- Attribution Data ---"];
    if (data.gclid) noteLines.push(`Google Click ID: ${data.gclid}`);
    if (data.fbclid) noteLines.push(`Facebook Click ID: ${data.fbclid}`);
    if (data.utmSource) noteLines.push(`UTM Source: ${data.utmSource}`);
    if (data.utmMedium) noteLines.push(`UTM Medium: ${data.utmMedium}`);
    if (data.utmCampaign) noteLines.push(`UTM Campaign: ${data.utmCampaign}`);
    if (data.gaClientId) noteLines.push(`GA Client ID: ${data.gaClientId}`);
    if (data.firstVisitPage) noteLines.push(`First Page: ${data.firstVisitPage}`);
    if (data.conversionPage) noteLines.push(`Conversion Page: ${data.conversionPage}`);
    await addCRMNote(crmContactId, noteLines.join("\n")).catch(() => {});
  }

  // 2. Save to Google Sheets customers tab
  try {
    await appendSheetRow("customers", {
      id,
      crm_contact_id: crmContactId,
      first_name: data.firstName,
      last_name: data.lastName || "",
      email: data.email || "",
      phone: data.phone || "",
      address: data.address || "",
      city: data.city || "",
      state: data.state || "",
      zip: data.zip || "",
      source: data.source || "website",
      lead_score: "0",
      lead_temperature: "new",
      tags: tags.join(","),
      services_interested: (data.servicesInterested || []).join(","),
      estimated_value: String(data.estimatedValue || 0),
      status: "new",
      notes: data.notes || "",
      gclid: data.gclid || "",
      fbclid: data.fbclid || "",
      utm_source: data.utmSource || "",
      utm_medium: data.utmMedium || "",
      utm_campaign: data.utmCampaign || "",
      ga_client_id: data.gaClientId || "",
      first_visit_page: data.firstVisitPage || "",
      conversion_page: data.conversionPage || "",
      created_at: now,
      updated_at: now,
      last_synced: now,
    });
  } catch (err) {
    console.error("Failed to save customer to sheet:", err);
  }

  return {
    success: true,
    customerId: id,
    crmContactId: crmContactId || undefined,
  };
}

/**
 * Get all customers from the Google Sheets database
 */
export async function getCustomers(filters?: {
  status?: string;
  temperature?: string;
  source?: string;
  search?: string;
}): Promise<CustomerRow[]> {
  const rows = (await getSheetData("customers")) as unknown as CustomerRow[];

  if (!filters) return rows;

  return rows.filter((row) => {
    if (filters.status && row.status !== filters.status) return false;
    if (filters.temperature && row.lead_temperature !== filters.temperature) return false;
    if (filters.source && row.source !== filters.source) return false;
    if (filters.search) {
      const search = filters.search.toLowerCase();
      const searchable = `${row.first_name} ${row.last_name} ${row.email} ${row.phone}`.toLowerCase();
      if (!searchable.includes(search)) return false;
    }
    return true;
  });
}

/**
 * Update a customer in both the sheet and CRM
 */
export async function updateCustomer(
  rowIndex: number,
  updates: Partial<CustomerRow>
): Promise<{ success: boolean; error?: string }> {
  try {
    const customers = (await getSheetData("customers")) as unknown as CustomerRow[];
    const existing = customers[rowIndex];
    if (!existing) return { success: false, error: "Customer not found" };

    const updated = {
      ...existing,
      ...updates,
      updated_at: new Date().toISOString(),
      last_synced: new Date().toISOString(),
    };

    // Update sheet
    await updateSheetRow("customers", rowIndex, updated as unknown as Record<string, string>);

    // Push critical fields to CRM if we have a contact ID
    if (existing.crm_contact_id && process.env.CRM_API_KEY) {
      const crmUpdates: Record<string, unknown> = {};
      if (updates.first_name) crmUpdates.firstName = updates.first_name;
      if (updates.last_name) crmUpdates.lastName = updates.last_name;
      if (updates.email) crmUpdates.email = updates.email;
      if (updates.phone) crmUpdates.phone = updates.phone;
      if (updates.address) crmUpdates.address1 = updates.address;
      if (updates.tags) crmUpdates.tags = updates.tags.split(",").filter(Boolean);

      if (Object.keys(crmUpdates).length > 0) {
        await fetch(`${CRM_API_BASE}/contacts/${existing.crm_contact_id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${process.env.CRM_API_KEY}`,
            Version: CRM_VERSION,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(crmUpdates),
        }).catch(() => {});
      }
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Update failed" };
  }
}

/**
 * Pull all contacts from CRM into the customers sheet.
 * Matches on crm_contact_id or email to avoid duplicates.
 */
export async function syncFromCRM(): Promise<SyncResult> {
  const apiKey = process.env.CRM_API_KEY;
  if (!apiKey) return { success: false, created: 0, updated: 0, errors: ["CRM API key not configured"] };

  const result: SyncResult = { success: true, created: 0, updated: 0, errors: [] };

  try {
    // Get existing customers from sheet
    const existing = (await getSheetData("customers")) as unknown as CustomerRow[];
    const existingByContactId = new Map(existing.map((c, i) => [c.crm_contact_id, { row: c, index: i }]));
    const existingByEmail = new Map(existing.filter((c) => c.email).map((c, i) => [c.email.toLowerCase(), { row: c, index: i }]));

    // Fetch CRM contacts in pages
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const params = new URLSearchParams({
        locationId: ABK_LOCATION_ID,
        limit: "100",
        page: String(page),
      });

      const res = await fetch(`${CRM_API_BASE}/contacts/?${params}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Version: CRM_VERSION,
        },
      });

      if (!res.ok) {
        result.errors.push(`CRM API error on page ${page}: ${res.status}`);
        break;
      }

      const data = await res.json();
      const contacts = data.contacts || [];

      for (const contact of contacts) {
        const match =
          existingByContactId.get(contact.id) ||
          (contact.email && existingByEmail.get(contact.email.toLowerCase()));

        if (match) {
          // Update existing
          const updates: Partial<CustomerRow> = {
            crm_contact_id: contact.id,
            first_name: contact.firstName || match.row.first_name,
            last_name: contact.lastName || match.row.last_name,
            email: contact.email || match.row.email,
            phone: contact.phone || match.row.phone,
            tags: (contact.tags || []).join(","),
            last_synced: new Date().toISOString(),
          };

          await updateSheetRow("customers", match.index, {
            ...match.row,
            ...updates,
          } as unknown as Record<string, string>);
          result.updated++;
        } else {
          // Create new
          await appendSheetRow("customers", {
            id: `cust_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
            crm_contact_id: contact.id,
            first_name: contact.firstName || "",
            last_name: contact.lastName || "",
            email: contact.email || "",
            phone: contact.phone || "",
            address: contact.address1 || "",
            city: contact.city || "",
            state: contact.state || "",
            zip: contact.postalCode || "",
            source: contact.source || "crm",
            lead_score: "0",
            lead_temperature: "imported",
            tags: (contact.tags || []).join(","),
            services_interested: "",
            estimated_value: "0",
            status: "active",
            notes: "",
            gclid: "",
            fbclid: "",
            utm_source: "",
            utm_medium: "",
            utm_campaign: "",
            ga_client_id: "",
            first_visit_page: "",
            conversion_page: "",
            created_at: contact.dateAdded || new Date().toISOString(),
            updated_at: new Date().toISOString(),
            last_synced: new Date().toISOString(),
          });
          result.created++;
        }
      }

      hasMore = contacts.length === 100;
      page++;
    }
  } catch (err) {
    result.success = false;
    result.errors.push(err instanceof Error ? err.message : "Sync failed");
  }

  return result;
}

/**
 * Handle an incoming CRM webhook — update the customer in sheets
 */
export async function handleCRMWebhook(payload: {
  type: string;
  contactId: string;
  locationId: string;
  [key: string]: unknown;
}): Promise<void> {
  if (payload.locationId !== ABK_LOCATION_ID) return;

  const apiKey = process.env.CRM_API_KEY;
  if (!apiKey) return;

  // Fetch full contact from CRM
  const res = await fetch(`${CRM_API_BASE}/contacts/${payload.contactId}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Version: CRM_VERSION,
    },
  });

  if (!res.ok) return;
  const { contact } = await res.json();

  // Find in sheet
  const customers = (await getSheetData("customers")) as unknown as CustomerRow[];
  const matchIndex = customers.findIndex(
    (c) => c.crm_contact_id === contact.id || (c.email && c.email.toLowerCase() === contact.email?.toLowerCase())
  );

  const now = new Date().toISOString();

  if (matchIndex >= 0) {
    const existing = customers[matchIndex];
    await updateSheetRow("customers", matchIndex, {
      ...existing,
      crm_contact_id: contact.id,
      first_name: contact.firstName || existing.first_name,
      last_name: contact.lastName || existing.last_name,
      email: contact.email || existing.email,
      phone: contact.phone || existing.phone,
      tags: (contact.tags || []).join(","),
      updated_at: now,
      last_synced: now,
    } as unknown as Record<string, string>);
  } else {
    await appendSheetRow("customers", {
      id: `cust_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      crm_contact_id: contact.id,
      first_name: contact.firstName || "",
      last_name: contact.lastName || "",
      email: contact.email || "",
      phone: contact.phone || "",
      address: contact.address1 || "",
      city: contact.city || "",
      state: contact.state || "",
      zip: contact.postalCode || "",
      source: contact.source || "crm-webhook",
      lead_score: "0",
      lead_temperature: "new",
      tags: (contact.tags || []).join(","),
      services_interested: "",
      estimated_value: "0",
      status: "new",
      notes: `Created via CRM webhook: ${payload.type}`,
      gclid: "",
      fbclid: "",
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      ga_client_id: "",
      first_visit_page: "",
      conversion_page: "",
      created_at: now,
      updated_at: now,
      last_synced: now,
    });
  }
}

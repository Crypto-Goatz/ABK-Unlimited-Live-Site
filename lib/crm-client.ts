/**
 * Unified CRM Client
 * Handles both OAuth tokens and direct API key auth.
 * Reads stored tokens from site_config sheet when available.
 */

import type {
  CRMContactsResponse,
  CRMPipeline,
  CRMOpportunity,
  CRMWorkflow,
  CRMSocialPost,
  CRMSocialPostInput,
} from "./crm-types";

const CRM_API_BASE = "https://services.leadconnectorhq.com";
const CRM_VERSION = "2021-07-28";

interface CRMClientOptions {
  accessToken?: string;
  apiKey?: string;
  locationId: string;
}

export class CRMClient {
  private accessToken?: string;
  private apiKey?: string;
  private locationId: string;

  constructor(opts: CRMClientOptions) {
    this.accessToken = opts.accessToken;
    this.apiKey = opts.apiKey;
    this.locationId = opts.locationId;
  }

  private async fetch<T>(path: string, init?: RequestInit): Promise<T> {
    const token = this.accessToken || this.apiKey;
    if (!token) throw new Error("No CRM credentials available");

    const url = `${CRM_API_BASE}${path}`;
    const res = await fetch(url, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        Version: CRM_VERSION,
        "Content-Type": "application/json",
        ...init?.headers,
      },
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "Unknown error");
      throw new Error(`CRM API error ${res.status}: ${text}`);
    }

    return res.json();
  }

  // Contacts
  async listContacts(params?: {
    query?: string;
    limit?: number;
    page?: number;
  }): Promise<CRMContactsResponse> {
    const searchParams = new URLSearchParams({
      locationId: this.locationId,
      limit: String(params?.limit || 20),
    });
    if (params?.query) searchParams.set("query", params.query);
    if (params?.page) searchParams.set("page", String(params.page));

    return this.fetch<CRMContactsResponse>(`/contacts/?${searchParams}`);
  }

  // Pipelines
  async listPipelines(): Promise<{ pipelines: CRMPipeline[] }> {
    return this.fetch<{ pipelines: CRMPipeline[] }>(
      `/opportunities/pipelines?locationId=${this.locationId}`
    );
  }

  // Opportunities
  async listOpportunities(pipelineId?: string): Promise<{
    opportunities: CRMOpportunity[];
  }> {
    const params = new URLSearchParams({ locationId: this.locationId });
    if (pipelineId) params.set("pipelineId", pipelineId);

    return this.fetch<{ opportunities: CRMOpportunity[] }>(
      `/opportunities/search?${params}`
    );
  }

  // Workflows
  async listWorkflows(): Promise<{ workflows: CRMWorkflow[] }> {
    return this.fetch<{ workflows: CRMWorkflow[] }>(
      `/workflows/?locationId=${this.locationId}`
    );
  }

  async enrollInWorkflow(
    contactId: string,
    workflowId: string
  ): Promise<void> {
    await this.fetch(`/contacts/${contactId}/workflow/${workflowId}`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  }

  // Social Media Posting
  async listSocialPosts(): Promise<{ posts: CRMSocialPost[] }> {
    return this.fetch<{ posts: CRMSocialPost[] }>(
      `/socialMediaPosting/?locationId=${this.locationId}`
    );
  }

  async createSocialPost(input: CRMSocialPostInput): Promise<{ post: CRMSocialPost }> {
    return this.fetch<{ post: CRMSocialPost }>("/socialMediaPosting/post", {
      method: "POST",
      body: JSON.stringify({
        locationId: input.locationId || this.locationId,
        post: input.post,
        platforms: input.platforms,
        ...(input.scheduledAt ? { scheduledAt: input.scheduledAt } : {}),
      }),
    });
  }
}

/**
 * Create a CRM client from environment variables.
 * Prefers OAuth access token from site_config, falls back to API key.
 */
export function createCRMClientFromEnv(siteConfig?: Record<string, string>): CRMClient {
  const accessToken = siteConfig?.crm_access_token;
  const apiKey = process.env.CRM_API_KEY;
  const locationId =
    siteConfig?.crm_location_id || process.env.CRM_LOCATION_ID || "";

  if (!accessToken && !apiKey) {
    throw new Error("No CRM credentials configured");
  }

  return new CRMClient({
    accessToken,
    apiKey: accessToken ? undefined : apiKey,
    locationId,
  });
}

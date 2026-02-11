import { NextRequest, NextResponse } from "next/server";
import { getSheetData } from "@/lib/google/sheets";

interface EndpointConfig {
  slug: string;
  name: string;
  method: string;
  status: string;
  input_schema: string;
  actions: string;
  response_template: string;
  auth_required: string;
}

async function getEndpointBySlug(slug: string): Promise<EndpointConfig | null> {
  try {
    const rows = await getSheetData("custom_endpoints");
    const row = rows.find((r) => r.slug === slug);
    if (!row || row.status !== "active") return null;
    return row as unknown as EndpointConfig;
  } catch {
    return null;
  }
}

async function handleRequest(
  req: NextRequest,
  slug: string
): Promise<NextResponse> {
  const endpoint = await getEndpointBySlug(slug);

  if (!endpoint) {
    return NextResponse.json({ error: "Endpoint not found" }, { status: 404 });
  }

  // Check method
  if (
    endpoint.method !== "ANY" &&
    endpoint.method.toUpperCase() !== req.method
  ) {
    return NextResponse.json(
      { error: `Method ${req.method} not allowed. Expected: ${endpoint.method}` },
      { status: 405 }
    );
  }

  // Auth check
  if (endpoint.auth_required === "true") {
    const apiKey = req.headers.get("x-api-key");
    const blogApiKey = process.env.BLOG_PUBLISH_API_KEY;
    if (!apiKey || apiKey !== blogApiKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const body =
      req.method !== "GET"
        ? await req.json().catch(() => ({}))
        : Object.fromEntries(req.nextUrl.searchParams.entries());

    // Parse actions
    let actions: Array<{ type: string; config: Record<string, unknown> }> = [];
    try {
      actions = JSON.parse(endpoint.actions || "[]");
    } catch {
      actions = [];
    }

    // Process actions sequentially
    const results: Record<string, unknown>[] = [];
    for (const action of actions) {
      switch (action.type) {
        case "respond": {
          const template = action.config.body || endpoint.response_template;
          let responseBody: unknown;
          try {
            responseBody =
              typeof template === "string" ? JSON.parse(template) : template;
          } catch {
            responseBody = { message: template };
          }
          return NextResponse.json(responseBody);
        }

        case "validate": {
          // Basic validation: check required fields
          const required = (action.config.required || []) as string[];
          for (const field of required) {
            if (!body[field]) {
              return NextResponse.json(
                { error: `Missing required field: ${field}` },
                { status: 400 }
              );
            }
          }
          results.push({ type: "validate", passed: true });
          break;
        }

        case "transform": {
          // Apply field mapping
          const mapping = (action.config.mapping || {}) as Record<
            string,
            string
          >;
          for (const [to, from] of Object.entries(mapping)) {
            if (body[from] !== undefined) {
              body[to] = body[from];
            }
          }
          results.push({ type: "transform", applied: Object.keys(mapping) });
          break;
        }

        default:
          results.push({ type: action.type, skipped: true });
      }
    }

    // Default response if no "respond" action
    let responseTemplate: unknown = { success: true, results };
    try {
      if (endpoint.response_template) {
        responseTemplate = JSON.parse(endpoint.response_template);
      }
    } catch {
      // Use default
    }

    return NextResponse.json(responseTemplate);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Endpoint error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  return handleRequest(req, slug);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  return handleRequest(req, slug);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  return handleRequest(req, slug);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  return handleRequest(req, slug);
}

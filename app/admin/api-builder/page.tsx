"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Loader2, Save, ExternalLink } from "lucide-react";

interface EndpointRow {
  id: string;
  slug: string;
  name: string;
  method: string;
  status: string;
  input_schema: string;
  actions: string;
  response_template: string;
  auth_required: string;
  created_at: string;
  [key: string]: string;
}

export default function APIBuilderPage() {
  const [endpoints, setEndpoints] = useState<EndpointRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newEndpoint, setNewEndpoint] = useState({
    name: "",
    slug: "",
    method: "POST",
    auth_required: "false",
    actions: "[]",
    response_template: '{"success": true}',
  });

  const fetchEndpoints = useCallback(async () => {
    try {
      const res = await fetch("/api/content?sheet=custom_endpoints");
      if (res.ok) {
        const { data } = await res.json();
        setEndpoints(data || []);
      }
    } catch {
      // Sheet may not exist yet
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEndpoints();
  }, [fetchEndpoints]);

  async function handleAdd() {
    setSaving(true);
    try {
      const now = new Date().toISOString();
      await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sheet: "custom_endpoints",
          data: {
            id: `ep-${Date.now()}`,
            ...newEndpoint,
            input_schema: "{}",
            status: "active",
            created_at: now,
          },
        }),
      });
      setAdding(false);
      setNewEndpoint({
        name: "",
        slug: "",
        method: "POST",
        auth_required: "false",
        actions: "[]",
        response_template: '{"success": true}',
      });
      await fetchEndpoints();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(index: number) {
    if (!confirm("Delete this endpoint?")) return;
    await fetch(`/api/content?sheet=custom_endpoints&rowIndex=${index}`, {
      method: "DELETE",
    });
    await fetchEndpoints();
  }

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">API Builder</h1>
          <p className="text-gray-600 mt-1">
            Create custom API endpoints with configurable actions and responses.
          </p>
        </div>
        <Button onClick={() => setAdding(true)}>
          <Plus className="w-4 h-4 mr-1" /> New Endpoint
        </Button>
      </div>

      {adding && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">New Endpoint</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
                <Input
                  value={newEndpoint.name}
                  onChange={(e) => setNewEndpoint({ ...newEndpoint, name: e.target.value })}
                  placeholder="Health Check"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Slug</label>
                <Input
                  value={newEndpoint.slug}
                  onChange={(e) => setNewEndpoint({ ...newEndpoint, slug: e.target.value })}
                  placeholder="health-check"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Method</label>
                <select
                  value={newEndpoint.method}
                  onChange={(e) => setNewEndpoint({ ...newEndpoint, method: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="ANY">ANY</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Auth Required</label>
                <select
                  value={newEndpoint.auth_required}
                  onChange={(e) => setNewEndpoint({ ...newEndpoint, auth_required: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="false">No</option>
                  <option value="true">Yes (API Key)</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Actions (JSON array)
              </label>
              <textarea
                value={newEndpoint.actions}
                onChange={(e) => setNewEndpoint({ ...newEndpoint, actions: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                placeholder='[{"type": "validate", "config": {"required": ["name"]}}, {"type": "respond", "config": {"body": {"ok": true}}}]'
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Response Template (JSON)
              </label>
              <textarea
                value={newEndpoint.response_template}
                onChange={(e) => setNewEndpoint({ ...newEndpoint, response_template: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
              />
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleAdd} disabled={saving || !newEndpoint.slug}>
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-1" />}
                Save
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setAdding(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        </div>
      ) : endpoints.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-gray-500">
            No custom endpoints. Click &quot;New Endpoint&quot; to create one.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {endpoints.map((ep, i) => (
            <Card key={ep.id || i}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{ep.name || ep.slug}</p>
                    <code className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded mt-1 inline-block">
                      {ep.method} {siteUrl}/api/custom/{ep.slug}
                    </code>
                    <div className="flex gap-2 mt-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          ep.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {ep.status}
                      </span>
                      <span className="text-xs text-gray-400">
                        auth: {ep.auth_required === "true" ? "required" : "none"}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <a
                      href={`/api/custom/${ep.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" variant="ghost">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </a>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(i)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

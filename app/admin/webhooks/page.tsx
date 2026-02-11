"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Loader2, TestTube, Save } from "lucide-react";

interface WebhookRow {
  id: string;
  slug: string;
  name: string;
  status: string;
  auth_type: string;
  auth_secret: string;
  action_type: string;
  action_config: string;
  created_at: string;
  updated_at: string;
  [key: string]: string;
}

export default function WebhooksPage() {
  const [webhooks, setWebhooks] = useState<WebhookRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [testResult, setTestResult] = useState<{ slug: string; result: string } | null>(null);
  const [newWebhook, setNewWebhook] = useState({
    name: "",
    slug: "",
    auth_type: "none",
    auth_secret: "",
    action_type: "crm_contact",
    action_config: "{}",
  });

  const fetchWebhooks = useCallback(async () => {
    try {
      const res = await fetch("/api/content?sheet=webhooks");
      if (res.ok) {
        const { data } = await res.json();
        setWebhooks(data || []);
      }
    } catch {
      // Sheet may not exist yet
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWebhooks();
  }, [fetchWebhooks]);

  async function handleAdd() {
    setSaving(true);
    try {
      const now = new Date().toISOString();
      await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sheet: "webhooks",
          data: {
            id: `wh-${Date.now()}`,
            ...newWebhook,
            status: "active",
            created_at: now,
            updated_at: now,
          },
        }),
      });
      setAdding(false);
      setNewWebhook({
        name: "",
        slug: "",
        auth_type: "none",
        auth_secret: "",
        action_type: "crm_contact",
        action_config: "{}",
      });
      await fetchWebhooks();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(index: number) {
    if (!confirm("Delete this webhook?")) return;
    await fetch(`/api/content?sheet=webhooks&rowIndex=${index}`, {
      method: "DELETE",
    });
    await fetchWebhooks();
  }

  async function handleTest(slug: string) {
    setTestResult(null);
    try {
      const res = await fetch(`/api/webhooks/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: "Test",
          lastName: "User",
          email: "test@example.com",
        }),
      });
      const data = await res.json();
      setTestResult({ slug, result: JSON.stringify(data, null, 2) });
    } catch (e) {
      setTestResult({
        slug,
        result: e instanceof Error ? e.message : "Test failed",
      });
    }
  }

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Webhooks</h1>
          <p className="text-gray-600 mt-1">
            Create webhook endpoints that process incoming data and connect to CRM.
          </p>
        </div>
        <Button onClick={() => setAdding(true)}>
          <Plus className="w-4 h-4 mr-1" /> New Webhook
        </Button>
      </div>

      {adding && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">New Webhook</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
                <Input
                  value={newWebhook.name}
                  onChange={(e) => setNewWebhook({ ...newWebhook, name: e.target.value })}
                  placeholder="Contact Form"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Slug</label>
                <Input
                  value={newWebhook.slug}
                  onChange={(e) => setNewWebhook({ ...newWebhook, slug: e.target.value })}
                  placeholder="contact-form"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Auth Type</label>
                <select
                  value={newWebhook.auth_type}
                  onChange={(e) => setNewWebhook({ ...newWebhook, auth_type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="none">None</option>
                  <option value="header">Header Secret</option>
                  <option value="query">Query Param</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Action Type</label>
                <select
                  value={newWebhook.action_type}
                  onChange={(e) => setNewWebhook({ ...newWebhook, action_type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="crm_contact">Create CRM Contact</option>
                  <option value="crm_workflow">Trigger CRM Workflow</option>
                  <option value="forward">Forward to URL</option>
                </select>
              </div>
            </div>
            {newWebhook.auth_type !== "none" && (
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Auth Secret</label>
                <Input
                  value={newWebhook.auth_secret}
                  onChange={(e) => setNewWebhook({ ...newWebhook, auth_secret: e.target.value })}
                  placeholder="secret-key"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Action Config (JSON)
              </label>
              <textarea
                value={newWebhook.action_config}
                onChange={(e) => setNewWebhook({ ...newWebhook, action_config: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                placeholder='{"fieldMap": {"firstName": "first_name"}}'
              />
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleAdd} disabled={saving || !newWebhook.slug}>
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
      ) : webhooks.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-gray-500">
            No webhooks configured. Click &quot;New Webhook&quot; to create one.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {webhooks.map((wh, i) => (
            <Card key={wh.id || i}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{wh.name || wh.slug}</p>
                    <code className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded mt-1 inline-block">
                      POST {siteUrl}/api/webhooks/{wh.slug}
                    </code>
                    <div className="flex gap-2 mt-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          wh.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {wh.status}
                      </span>
                      <span className="text-xs text-gray-400">
                        {wh.action_type} &middot; auth: {wh.auth_type}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleTest(wh.slug)}
                    >
                      <TestTube className="w-4 h-4" />
                    </Button>
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
                {testResult?.slug === wh.slug && (
                  <pre className="mt-3 p-3 bg-gray-900 text-green-400 text-xs rounded-lg overflow-auto">
                    {testResult.result}
                  </pre>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

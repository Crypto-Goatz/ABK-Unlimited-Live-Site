"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getPublicUrl } from "@/lib/drive-utils";
import {
  CheckCircle2,
  XCircle,
  ExternalLink,
  Key,
  Save,
  Upload,
  Trash2,
  Palette,
  ImageIcon,
  Shield,
  Share2,
  FileCode,
  RefreshCw,
  BarChart3,
  MessageSquare,
  Zap,
} from "lucide-react";

interface IntegrationStatus {
  googleSheets: boolean;
  googleDrive: boolean;
  gemini: boolean;
  cro9: boolean;
  crm: boolean;
  googleOAuth: boolean;
  socialPlanner: boolean;
  appsScript: boolean;
}

interface EnvStatus {
  GOOGLE_SERVICE_ACCOUNT_EMAIL: string;
  GOOGLE_SHEETS_ID: string;
  GOOGLE_DRIVE_FOLDER_ID: string;
  GEMINI_API_KEY: string;
  CRO9_API_KEY: string;
  CRM_API_KEY: string;
}

function maskValue(val: string): string {
  if (!val || val === "not set") return "Not configured";
  if (val.length <= 8) return "****";
  return val.slice(0, 4) + "****" + val.slice(-4);
}

type ApiKeyField = {
  id: string;
  label: string;
  description: string;
  apiKey: string; // key name for save-key endpoint
  icon: typeof Key;
  placeholder: string;
};

const API_KEY_FIELDS: ApiKeyField[] = [
  {
    id: "gemini",
    label: "Gemini API Key",
    description: "Enable AI content generation powered by Google Gemini.",
    apiKey: "gemini",
    icon: Zap,
    placeholder: "Enter Gemini API key...",
  },
  {
    id: "cro9",
    label: "CRO9 / SXO Analytics Key",
    description: "Enable behavioral analytics, heatmaps, and search experience optimization.",
    apiKey: "cro9",
    icon: BarChart3,
    placeholder: "Enter CRO9 key...",
  },
  {
    id: "ga4",
    label: "GA4 Measurement ID",
    description: "Google Analytics 4 tracking for traffic and conversion data.",
    apiKey: "ga4",
    icon: BarChart3,
    placeholder: "G-XXXXXXXXXX",
  },
  {
    id: "crm_tracking",
    label: "CRM Tracking ID",
    description: "CRM tracking pixel for attribution and lead scoring.",
    apiKey: "crm_tracking",
    icon: MessageSquare,
    placeholder: "Enter CRM tracking ID...",
  },
];

export default function SettingsPage() {
  const [status, setStatus] = useState<IntegrationStatus | null>(null);
  const [envStatus, setEnvStatus] = useState<EnvStatus | null>(null);
  const [loading, setLoading] = useState(true);

  // API key states
  const [keyValues, setKeyValues] = useState<Record<string, string>>({});
  const [keySaving, setKeySaving] = useState<Record<string, boolean>>({});
  const [keyMessages, setKeyMessages] = useState<Record<string, { text: string; success: boolean }>>({});

  // Logo state
  const [logoImageId, setLogoImageId] = useState<string | null>(null);
  const [logoUploading, setLogoUploading] = useState(false);
  const [logoMessage, setLogoMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Color state
  const [colors, setColors] = useState({
    primary: "#14664f",
    secondary: "#1a1a2e",
    accent: "#f59e0b",
  });
  const [colorSaving, setColorSaving] = useState(false);
  const [colorMessage, setColorMessage] = useState<string | null>(null);

  // Redeploy state
  const [redeploying, setRedeploying] = useState(false);
  const [redeployMessage, setRedeployMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const [statusRes, envRes] = await Promise.all([
          fetch("/api/settings/status"),
          fetch("/api/settings/env"),
        ]);

        if (statusRes.ok) {
          const statusData = await statusRes.json();
          setStatus(statusData);
        }

        if (envRes.ok) {
          const envData = await envRes.json();
          setEnvStatus(envData);
        }
      } catch {
        // Settings endpoints may not exist yet
      }

      // Load site_config for logo and colors
      try {
        const configRes = await fetch("/api/content?sheet=site_config");
        if (configRes.ok) {
          const { data } = await configRes.json();
          const configMap: Record<string, string> = {};
          for (const row of data) {
            if (row.key && row.value) configMap[row.key] = row.value;
          }
          if (configMap.logo_image_id) setLogoImageId(configMap.logo_image_id);
          if (configMap.primary_color)
            setColors((c) => ({ ...c, primary: configMap.primary_color }));
          if (configMap.secondary_color)
            setColors((c) => ({ ...c, secondary: configMap.secondary_color }));
          if (configMap.accent_color)
            setColors((c) => ({ ...c, accent: configMap.accent_color }));
        }
      } catch {
        // site_config may not be available
      }

      setLoading(false);
    }
    loadSettings();
  }, []);

  // Save API key to Vercel env var
  const handleSaveKey = async (field: ApiKeyField) => {
    const value = keyValues[field.id];
    if (!value?.trim()) return;

    setKeySaving((s) => ({ ...s, [field.id]: true }));
    setKeyMessages((m) => ({ ...m, [field.id]: undefined as unknown as { text: string; success: boolean } }));

    try {
      const res = await fetch("/api/settings/save-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: field.apiKey, value: value.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }

      setKeyMessages((m) => ({
        ...m,
        [field.id]: { text: `${field.label} saved. Redeploy to activate.`, success: true },
      }));
      setKeyValues((v) => ({ ...v, [field.id]: "" }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to save";
      setKeyMessages((m) => ({
        ...m,
        [field.id]: { text: message, success: false },
      }));
    } finally {
      setKeySaving((s) => ({ ...s, [field.id]: false }));
    }
  };

  // Save Gemini key — fallback to site_config if Vercel API not configured
  const handleSaveGeminiLegacy = async () => {
    const value = keyValues["gemini"];
    if (!value?.trim()) return;

    setKeySaving((s) => ({ ...s, gemini: true }));

    try {
      // Try Vercel env var first
      const res = await fetch("/api/settings/save-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "gemini", value: value.trim() }),
      });

      if (res.ok) {
        setKeyMessages((m) => ({
          ...m,
          gemini: { text: "Gemini API key saved. Redeploy to activate.", success: true },
        }));
        setKeyValues((v) => ({ ...v, gemini: "" }));
        return;
      }

      // Fallback to site_config sheet
      const sheetRes = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sheet: "site_config",
          data: { key: "gemini_api_key", value: value.trim() },
        }),
      });

      if (!sheetRes.ok) throw new Error("Failed to save via both Vercel and Sheets");

      setKeyMessages((m) => ({
        ...m,
        gemini: { text: "Gemini API key saved to config sheet.", success: true },
      }));
      setKeyValues((v) => ({ ...v, gemini: "" }));
    } catch {
      setKeyMessages((m) => ({
        ...m,
        gemini: { text: "Failed to save Gemini API key. Check Vercel configuration.", success: false },
      }));
    } finally {
      setKeySaving((s) => ({ ...s, gemini: false }));
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoUploading(true);
    setLogoMessage(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("subfolder", "general");

      const uploadRes = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });
      if (!uploadRes.ok) throw new Error("Upload failed");
      const { file: uploaded } = await uploadRes.json();

      // Save the file ID to site_config
      await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sheet: "site_config",
          data: { key: "logo_image_id", value: uploaded.id },
        }),
      });

      setLogoImageId(uploaded.id);
      setLogoMessage("Logo uploaded successfully");
    } catch {
      setLogoMessage("Failed to upload logo. Google Drive may not be configured.");
    } finally {
      setLogoUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleLogoRemove = async () => {
    setLogoMessage(null);
    try {
      await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sheet: "site_config",
          data: { key: "logo_image_id", value: "" },
        }),
      });
      setLogoImageId(null);
      setLogoMessage("Logo removed");
    } catch {
      setLogoMessage("Failed to remove logo");
    }
  };

  const handleSaveColors = async () => {
    setColorSaving(true);
    setColorMessage(null);
    try {
      // Save to Vercel env vars
      const colorVars = [
        { key: "NEXT_PUBLIC_COLOR_PRIMARY", value: colors.primary },
        { key: "NEXT_PUBLIC_COLOR_SECONDARY", value: colors.secondary },
        { key: "NEXT_PUBLIC_COLOR_ACCENT", value: colors.accent },
      ];

      for (const { key, value } of colorVars) {
        const res = await fetch("/api/settings/save-key", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: key.replace("NEXT_PUBLIC_COLOR_", "").toLowerCase(), value }),
        });
        // If Vercel API fails, try site_config sheet
        if (!res.ok) {
          await fetch("/api/content", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sheet: "site_config",
              data: { key: key.replace("NEXT_PUBLIC_", "").toLowerCase(), value },
            }),
          });
        }
      }
      setColorMessage("Colors saved successfully. Redeploy to see changes.");
    } catch {
      setColorMessage("Failed to save colors");
    } finally {
      setColorSaving(false);
    }
  };

  const handleRedeploy = async () => {
    setRedeploying(true);
    setRedeployMessage(null);
    try {
      const res = await fetch("/api/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "trigger-redeploy" }),
      });
      if (!res.ok) throw new Error("Failed to trigger redeploy");
      setRedeployMessage("Redeployment triggered. Changes will be live in ~60 seconds.");
    } catch {
      setRedeployMessage("Failed to trigger redeploy. You may need to redeploy from the Vercel dashboard.");
    } finally {
      setRedeploying(false);
    }
  };

  const integrationItems = status
    ? [
        { name: "Google Sheets", connected: status.googleSheets, description: "Content management backend" },
        { name: "Google Drive", connected: status.googleDrive, description: "Media file storage" },
        { name: "Gemini AI", connected: status.gemini, description: "AI content generation" },
        { name: "CRO9 Analytics", connected: status.cro9, description: "Analytics and behavioral tracking" },
        { name: "CRM", connected: status.crm, description: "Customer relationship management" },
      ]
    : [];

  const advancedIntegrations = status
    ? [
        { name: "Google OAuth", connected: status.googleOAuth, description: "Admin sign-in via Google", icon: Shield },
        { name: "Social Planner", connected: status.socialPlanner, description: "Auto-post blogs to social media", icon: Share2 },
        { name: "Apps Script", connected: status.appsScript, description: "Scheduled blog auto-publishing", icon: FileCode },
      ]
    : [];

  const envItems = envStatus
    ? [
        { label: "Service Account Email", value: envStatus.GOOGLE_SERVICE_ACCOUNT_EMAIL },
        { label: "Google Sheets ID", value: envStatus.GOOGLE_SHEETS_ID },
        { label: "Google Drive Folder ID", value: envStatus.GOOGLE_DRIVE_FOLDER_ID },
        { label: "Gemini API Key", value: envStatus.GEMINI_API_KEY },
        { label: "CRO9 API Key", value: envStatus.CRO9_API_KEY },
        { label: "CRM API Key", value: envStatus.CRM_API_KEY },
      ]
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        <span className="ml-3 text-gray-500">Loading settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-600 mt-1">
            Manage your integrations and configuration.
          </p>
        </div>
        <button
          onClick={handleRedeploy}
          disabled={redeploying}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <RefreshCw className={`h-4 w-4 ${redeploying ? "animate-spin" : ""}`} />
          {redeploying ? "Deploying..." : "Redeploy Site"}
        </button>
      </div>

      {redeployMessage && (
        <div
          className={`p-3 rounded-lg text-sm ${
            redeployMessage.includes("triggered")
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {redeployMessage}
        </div>
      )}

      {/* Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Status</CardTitle>
        </CardHeader>
        <CardContent>
          {integrationItems.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {integrationItems.map((item) => (
                <div key={item.name} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.connected ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="text-sm text-green-600">Connected</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-500" />
                        <span className="text-sm text-red-600">Not connected</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              Unable to load integration status.
            </p>
          )}
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Keys &amp; Integrations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-6">
            API keys are saved as encrypted environment variables. After saving, click
            &quot;Redeploy Site&quot; to activate changes.
          </p>
          <div className="space-y-6">
            {API_KEY_FIELDS.map((field) => {
              const Icon = field.icon;
              const msg = keyMessages[field.id];
              return (
                <div key={field.id} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="h-4 w-4 text-gray-500" />
                    <label className="text-sm font-semibold text-gray-800">
                      {field.label}
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{field.description}</p>
                  <div className="flex gap-3">
                    <input
                      type="password"
                      value={keyValues[field.id] || ""}
                      onChange={(e) =>
                        setKeyValues((v) => ({ ...v, [field.id]: e.target.value }))
                      }
                      placeholder={field.placeholder}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() =>
                        field.id === "gemini"
                          ? handleSaveGeminiLegacy()
                          : handleSaveKey(field)
                      }
                      disabled={keySaving[field.id] || !keyValues[field.id]?.trim()}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Save className="h-4 w-4" />
                      {keySaving[field.id] ? "Saving..." : "Save"}
                    </button>
                  </div>
                  {msg && (
                    <p
                      className={`text-xs mt-2 ${
                        msg.success ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {msg.text}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Logo Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Logo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Upload your site logo. Requires Google Drive integration.
          </p>
          {logoImageId && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg flex items-center gap-4">
              <Image
                src={getPublicUrl(logoImageId)}
                alt="Current logo"
                width={160}
                height={48}
                className="h-12 w-auto object-contain"
                unoptimized
              />
              <button
                onClick={handleLogoRemove}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                Remove
              </button>
            </div>
          )}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={logoUploading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Upload className="h-4 w-4" />
              {logoUploading ? "Uploading..." : "Upload Logo"}
            </button>
          </div>
          {logoMessage && (
            <p
              className={`text-sm mt-2 ${
                logoMessage.includes("success") || logoMessage === "Logo removed"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {logoMessage}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Color Scheme */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Color Scheme
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Customize your site&apos;s brand colors. Redeploy after saving.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {(
              [
                { key: "primary", label: "Primary" },
                { key: "secondary", label: "Secondary" },
                { key: "accent", label: "Accent" },
              ] as const
            ).map(({ key, label }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {label}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={colors[key]}
                    onChange={(e) =>
                      setColors((c) => ({ ...c, [key]: e.target.value }))
                    }
                    className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={colors[key]}
                    onChange={(e) =>
                      setColors((c) => ({ ...c, [key]: e.target.value }))
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="#000000"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex rounded-lg overflow-hidden h-8 mb-4">
            <div className="flex-1" style={{ backgroundColor: colors.primary }} />
            <div className="flex-1" style={{ backgroundColor: colors.secondary }} />
            <div className="flex-1" style={{ backgroundColor: colors.accent }} />
          </div>
          <button
            onClick={handleSaveColors}
            disabled={colorSaving}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save className="h-4 w-4" />
            {colorSaving ? "Saving..." : "Save Colors"}
          </button>
          {colorMessage && (
            <p
              className={`text-sm mt-2 ${
                colorMessage.includes("success") ? "text-green-600" : "text-red-600"
              }`}
            >
              {colorMessage}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Advanced Integrations */}
      {advancedIntegrations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Advanced Integrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-gray-100">
              {advancedIntegrations.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.name} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.connected ? (
                        <>
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <span className="text-sm text-green-600">Configured</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-5 w-5 text-gray-300" />
                          <span className="text-sm text-gray-400">Not configured</span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* CRM Connection */}
      <Card>
        <CardHeader>
          <CardTitle>CRM Connection</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Connect your CRM account to sync contacts, manage leads, and automate follow-ups.
          </p>
          <a
            href="/api/crm/connect"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Connect CRM
          </a>
        </CardContent>
      </Card>

      {/* Configuration Status */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration Status</CardTitle>
        </CardHeader>
        <CardContent>
          {envItems.length > 0 ? (
            <div className="space-y-2">
              {envItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <code className="text-sm text-gray-500 font-mono">
                    {maskValue(item.value)}
                  </code>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              Unable to load environment status.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Setup Wizard Link */}
      <Card>
        <CardHeader>
          <CardTitle>Initial Setup</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Run the setup wizard to connect Google Sheets, Drive, and generate initial content.
          </p>
          <a
            href="/admin/setup"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-900 transition-colors"
          >
            <Zap className="h-4 w-4" />
            Run Setup Wizard
          </a>
        </CardContent>
      </Card>
    </div>
  );
}

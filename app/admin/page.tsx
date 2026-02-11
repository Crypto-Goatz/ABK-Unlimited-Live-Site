import { getIntegrationStatus } from "@/lib/config";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  FileText,
  Image,
  Bot,
  BarChart3,
  Settings,
  Activity,
  Blocks,
  Users,
  Webhook,
  Code2,
} from "lucide-react";

export default function AdminDashboardPage() {
  const status = getIntegrationStatus();

  const integrations = [
    { name: "Google Sheets", key: "googleSheets" as const, description: "Content management via Sheets" },
    { name: "Google Drive", key: "googleDrive" as const, description: "Media storage and management" },
    { name: "Gemini AI", key: "gemini" as const, description: "AI content generation" },
    { name: "CRO9 Analytics", key: "cro9" as const, description: "Analytics and behavior tracking" },
    { name: "CRM", key: "crm" as const, description: "Customer relationship management" },
    { name: "Google OAuth", key: "googleOAuth" as const, description: "Admin authentication" },
    { name: "Social Planner", key: "socialPlanner" as const, description: "Automated social posting" },
    { name: "Apps Script", key: "appsScript" as const, description: "Blog auto-publishing" },
  ];

  const quickLinks = [
    { href: "/admin/content", label: "Content Manager", icon: FileText, description: "Edit site content via Google Sheets" },
    { href: "/admin/media", label: "Media Library", icon: Image, description: "Upload and manage images" },
    { href: "/admin/ai", label: "AI Writer", icon: Bot, description: "Generate content with AI" },
    { href: "/admin/crm", label: "CRM Dashboard", icon: Users, description: "Manage contacts, pipelines, social" },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3, description: "View site performance" },
    { href: "/admin/sxo", label: "SXO Panel", icon: Activity, description: "Behavioral data and search experience" },
    { href: "/admin/webhooks", label: "Webhooks", icon: Webhook, description: "Incoming webhook endpoints" },
    { href: "/admin/api-builder", label: "API Builder", icon: Code2, description: "Custom API endpoints" },
    { href: "/admin/apps", label: "Custom Apps", icon: Blocks, description: "Build and manage dynamic tools" },
    { href: "/admin/settings", label: "Settings", icon: Settings, description: "Configure integrations" },
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to Your Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Manage your website content, media, analytics, CRM, webhooks, and integrations all from one place.
          </p>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-lg font-semibold mb-4">Integration Status</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {integrations.map((integration) => {
            const connected = status[integration.key];
            return (
              <Card key={integration.key}>
                <CardContent className="flex items-center gap-3 p-4">
                  {connected ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="font-medium text-sm">{integration.name}</p>
                    <p className="text-xs text-gray-500 truncate">{integration.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="flex items-center gap-3 p-4">
                    <Icon className="h-8 w-8 text-blue-600 shrink-0" />
                    <div>
                      <p className="font-medium">{link.label}</p>
                      <p className="text-sm text-gray-500">{link.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

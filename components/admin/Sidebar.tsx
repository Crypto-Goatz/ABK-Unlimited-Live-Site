"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Sparkles,
  BarChart3,
  Search,
  Settings,
  Blocks,
  ArrowLeft,
  Users,
  Webhook,
  Code2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface User {
  email: string;
  name: string;
  picture: string;
}

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/ai", label: "AI Writer", icon: Sparkles },
  { href: "/admin/crm", label: "CRM", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/sxo", label: "SXO", icon: Search },
  { href: "/admin/webhooks", label: "Webhooks", icon: Webhook },
  { href: "/admin/api-builder", label: "API Builder", icon: Code2 },
  { href: "/admin/apps", label: "Apps", icon: Blocks },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ user }: { user?: User | null }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col shrink-0">
      <div className="p-4 border-b border-gray-800">
        <h2 className="font-bold text-lg">Rocket Dashboard</h2>
        <p className="text-xs text-gray-400 mt-0.5">Client Admin Panel</p>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-800">
        {user && (
          <div className="px-4 py-3 flex items-center gap-2.5">
            {user.picture ? (
              <img
                src={user.picture}
                alt=""
                className="w-7 h-7 rounded-full shrink-0"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-gray-700 shrink-0" />
            )}
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-200 truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        )}
        <div className="p-3 pt-0">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Site
          </Link>
        </div>
      </div>
    </aside>
  );
}

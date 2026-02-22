"use client";

import { useState } from "react";
import { AttributionDashboard } from "@/components/admin/AttributionDashboard";
import { BarChart3, TrendingUp, Target } from "lucide-react";

const TABS = [
  { key: "attribution", label: "Attribution & ROI", icon: Target },
  { key: "traffic", label: "Traffic Analytics", icon: BarChart3 },
  { key: "conversions", label: "Conversions", icon: TrendingUp },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("attribution");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
        <p className="text-gray-500 mt-1">
          Track attribution, ROI by source, and closed-loop optimization for organic and paid traffic.
        </p>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex gap-1 -mb-px">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "border-[#14664f] text-[#14664f]"
                    : "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div>
        {activeTab === "attribution" && <AttributionDashboard />}
        {activeTab === "traffic" && (
          <div className="bg-white rounded-xl border border-gray-200/80 p-8 text-center">
            <BarChart3 className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-600">CRO9 Traffic Analytics</p>
            <p className="text-xs text-gray-400 mt-1">
              Configure your <code className="bg-gray-100 px-1 rounded">NEXT_PUBLIC_CRO9_KEY</code> in Vercel to enable traffic analytics.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Also set <code className="bg-gray-100 px-1 rounded">NEXT_PUBLIC_GA4_MEASUREMENT_ID</code> for Google Analytics 4 integration.
            </p>
          </div>
        )}
        {activeTab === "conversions" && (
          <div className="bg-white rounded-xl border border-gray-200/80 p-8 text-center">
            <TrendingUp className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-600">Conversion Tracking</p>
            <p className="text-xs text-gray-400 mt-1">
              Conversion data populates automatically from form submissions with click ID attribution (gclid, fbclid).
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, DollarSign, MousePointerClick, Globe, Target } from "lucide-react";

interface SourceData {
  leads: number;
  value: number;
  conversions: number;
}

interface AttributionData {
  bySource: Record<string, SourceData>;
  byCampaign: Record<string, SourceData>;
  byMedium: Record<string, SourceData>;
  totalLeads: number;
  totalValue: number;
  paidLeads: number;
  organicLeads: number;
}

export function AttributionDashboard() {
  const [data, setData] = useState<AttributionData | null>(null);
  const [period, setPeriod] = useState("30d");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/analytics/attribution?period=${period}`)
      .then((r) => r.json())
      .then((d) => {
        if (!d.error) setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [period]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-6 h-6 border-2 border-gray-200 border-t-[#14664f] rounded-full animate-spin" />
      </div>
    );
  }

  if (!data || data.totalLeads === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200/80 p-8 text-center">
        <BarChart3 className="w-10 h-10 text-gray-300 mx-auto mb-3" />
        <p className="text-sm text-gray-500">No attribution data yet.</p>
        <p className="text-xs text-gray-400 mt-1">
          Data will populate as form submissions come in with tracked attribution.
        </p>
      </div>
    );
  }

  const sources = Object.entries(data.bySource).sort((a, b) => b[1].leads - a[1].leads);
  const campaigns = Object.entries(data.byCampaign).sort((a, b) => b[1].leads - a[1].leads);

  return (
    <div className="space-y-5">
      {/* Period selector */}
      <div className="flex items-center gap-2">
        {["7d", "30d", "90d"].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              period === p
                ? "bg-[#14664f] text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {p === "7d" ? "7 Days" : p === "30d" ? "30 Days" : "90 Days"}
          </button>
        ))}
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Leads", value: data.totalLeads, icon: TrendingUp, color: "text-gray-800" },
          { label: "Total Value", value: `$${data.totalValue.toLocaleString()}`, icon: DollarSign, color: "text-[#14664f]" },
          { label: "Paid Traffic", value: data.paidLeads, icon: MousePointerClick, color: "text-blue-600" },
          { label: "Organic Traffic", value: data.organicLeads, icon: Globe, color: "text-green-600" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white rounded-xl border border-gray-200/80 p-4">
              <div className="flex items-center gap-2 mb-1">
                <Icon className="w-4 h-4 text-gray-400" />
                <p className="text-xs text-gray-400 uppercase tracking-wider">{s.label}</p>
              </div>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          );
        })}
      </div>

      {/* Source breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* By Source */}
        <div className="bg-white rounded-xl border border-gray-200/80 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#14664f]" />
            Leads by Source
          </h3>
          <div className="space-y-3">
            {sources.slice(0, 8).map(([source, stats]) => {
              const pct = data.totalLeads > 0 ? (stats.leads / data.totalLeads) * 100 : 0;
              return (
                <div key={source}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700 font-medium capitalize">{source}</span>
                    <span className="text-xs text-gray-500">
                      {stats.leads} leads &middot; ${stats.value.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-[#14664f] rounded-full h-2 transition-all"
                      style={{ width: `${Math.max(pct, 2)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* By Campaign */}
        <div className="bg-white rounded-xl border border-gray-200/80 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-[#14664f]" />
            Leads by Campaign
          </h3>
          {campaigns.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">
              No campaign data yet. UTM-tagged links will appear here.
            </p>
          ) : (
            <div className="space-y-3">
              {campaigns.slice(0, 8).map(([campaign, stats]) => {
                const pct = data.totalLeads > 0 ? (stats.leads / data.totalLeads) * 100 : 0;
                return (
                  <div key={campaign}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700 font-medium">{campaign}</span>
                      <span className="text-xs text-gray-500">
                        {stats.leads} leads &middot; ${stats.value.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-[#1a8a6a] rounded-full h-2 transition-all"
                        style={{ width: `${Math.max(pct, 2)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

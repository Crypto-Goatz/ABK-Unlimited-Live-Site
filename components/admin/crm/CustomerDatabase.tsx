"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  RefreshCw,
  Download,
  Users,
  Flame,
  Thermometer,
  Snowflake,
  ArrowUpRight,
  Filter,
} from "lucide-react";

interface Customer {
  id: string;
  crm_contact_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  source: string;
  lead_score: string;
  lead_temperature: string;
  tags: string;
  services_interested: string;
  estimated_value: string;
  status: string;
  gclid: string;
  fbclid: string;
  utm_source: string;
  utm_campaign: string;
  created_at: string;
}

const TEMP_COLORS: Record<string, { bg: string; text: string; icon: React.ElementType }> = {
  hot: { bg: "bg-red-50", text: "text-red-600", icon: Flame },
  warm: { bg: "bg-amber-50", text: "text-amber-600", icon: Thermometer },
  cold: { bg: "bg-blue-50", text: "text-blue-500", icon: Snowflake },
  new: { bg: "bg-[#14664f]/10", text: "text-[#14664f]", icon: Users },
  imported: { bg: "bg-gray-100", text: "text-gray-500", icon: Users },
};

export function CustomerDatabase() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("");
  const [syncResult, setSyncResult] = useState<string>("");

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (filter) params.set("temperature", filter);
      const res = await fetch(`/api/customers?${params}`);
      const data = await res.json();
      setCustomers(data.customers || []);
    } catch {
      setCustomers([]);
    }
    setLoading(false);
  }, [search, filter]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  async function handleSync() {
    setSyncing(true);
    setSyncResult("");
    try {
      const res = await fetch("/api/customers/sync", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setSyncResult(`Synced: ${data.created} new, ${data.updated} updated`);
        fetchCustomers();
      } else {
        setSyncResult(`Error: ${data.errors?.join(", ") || "Sync failed"}`);
      }
    } catch {
      setSyncResult("Sync failed — check CRM connection");
    }
    setSyncing(false);
  }

  const stats = {
    total: customers.length,
    hot: customers.filter((c) => c.lead_temperature === "hot").length,
    warm: customers.filter((c) => c.lead_temperature === "warm").length,
    paid: customers.filter((c) => c.gclid || c.fbclid).length,
  };

  return (
    <div className="space-y-5">
      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Customers", value: stats.total, color: "text-gray-800" },
          { label: "Hot Leads", value: stats.hot, color: "text-red-600" },
          { label: "Warm Leads", value: stats.warm, color: "text-amber-600" },
          { label: "Paid Traffic", value: stats.paid, color: "text-[#14664f]" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200/80 p-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customers..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14664f]/30 focus:border-[#14664f]/50"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14664f]/30 appearance-none bg-white"
            >
              <option value="">All</option>
              <option value="hot">Hot</option>
              <option value="warm">Warm</option>
              <option value="cold">Cold</option>
              <option value="new">New</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {syncResult && (
            <span className="text-xs text-gray-500">{syncResult}</span>
          )}
          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium bg-[#14664f] text-white rounded-lg hover:bg-[#1a8a6a] transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin" : ""}`} />
            {syncing ? "Syncing..." : "Sync CRM"}
          </button>
          <button
            onClick={() => {
              const csv = [
                "Name,Email,Phone,Source,Temperature,Tags,Created",
                ...customers.map((c) =>
                  `"${c.first_name} ${c.last_name}","${c.email}","${c.phone}","${c.source}","${c.lead_temperature}","${c.tags}","${c.created_at}"`
                ),
              ].join("\n");
              const blob = new Blob([csv], { type: "text/csv" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `abk-customers-${new Date().toISOString().split("T")[0]}.csv`;
              a.click();
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </div>

      {/* Customer table */}
      <div className="bg-white rounded-xl border border-gray-200/80 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-gray-200 border-t-[#14664f] rounded-full animate-spin" />
          </div>
        ) : customers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Users className="w-10 h-10 text-gray-300 mb-3" />
            <p className="text-sm text-gray-500">No customers yet.</p>
            <p className="text-xs text-gray-400 mt-1">
              Customers will appear here from form submissions and CRM syncs.
            </p>
            <button
              onClick={handleSync}
              className="mt-4 text-sm text-[#14664f] hover:underline"
            >
              Import from CRM
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Contact</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Source</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Temperature</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Services</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-xs uppercase tracking-wider">Added</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-xs uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => {
                  const temp = TEMP_COLORS[c.lead_temperature] || TEMP_COLORS.new;
                  const TempIcon = temp.icon;
                  return (
                    <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#14664f]/10 flex items-center justify-center text-xs font-bold text-[#14664f] shrink-0">
                            {(c.first_name?.charAt(0) || "?").toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{c.first_name} {c.last_name}</p>
                            {c.estimated_value && c.estimated_value !== "0" && (
                              <p className="text-[11px] text-[#14664f]">${Number(c.estimated_value).toLocaleString()}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-gray-600">{c.email || "—"}</p>
                        <p className="text-xs text-gray-400">{c.phone || ""}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-xs text-gray-500">{c.source || "—"}</span>
                        {(c.gclid || c.fbclid) && (
                          <span className="ml-1.5 text-[10px] font-medium bg-[#14664f]/10 text-[#14664f] px-1.5 py-0.5 rounded">
                            {c.gclid ? "Google" : "Meta"}
                          </span>
                        )}
                        {c.utm_campaign && (
                          <p className="text-[10px] text-gray-400 mt-0.5">{c.utm_campaign}</p>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${temp.bg} ${temp.text}`}>
                          <TempIcon className="w-3 h-3" />
                          {c.lead_temperature}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {c.services_interested?.split(",").filter(Boolean).map((s) => (
                            <span key={s} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                              {s.trim()}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-xs text-gray-400">
                        {c.created_at ? new Date(c.created_at).toLocaleDateString() : "—"}
                      </td>
                      <td className="py-3 px-4">
                        {c.crm_contact_id && (
                          <a
                            href={`https://app.rocketclients.com/v2/location/497AdD39erWgmOu8JTCw/contacts/detail/${c.crm_contact_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#14664f] hover:text-[#1a8a6a] transition-colors"
                            title="View in CRM"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

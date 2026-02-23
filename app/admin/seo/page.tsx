"use client";

import { useState } from "react";
import {
  Rocket,
  LineChart,
  TrendingUp,
  Code,
  Zap,
  Loader2,
  Copy,
  Check,
  Plus,
  Trash2,
  Play,
} from "lucide-react";

type TabKey = "qa" | "gsc" | "trends" | "schema" | "analyze";

interface StrategyItem {
  id: number;
  targetUrl: string;
  keywords: string;
  questions: string;
}

interface ResultData {
  [key: string]: unknown;
}

export default function SEOEnginePage() {
  const [activeTab, setActiveTab] = useState<TabKey>("qa");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Record<string, ResultData | string>>({});
  const [copied, setCopied] = useState<string | null>(null);
  const [items, setItems] = useState<StrategyItem[]>([
    {
      id: 1,
      targetUrl: "https://abkunlimited.com",
      keywords: "Pittsburgh contractor, hardscaping, paving, outdoor firepits",
      questions:
        "What services does ABK Unlimited offer?\nHow much does hardscaping cost in Pittsburgh?",
    },
  ]);

  // Analyze state
  const [analyzePeriod, setAnalyzePeriod] = useState("7d");
  const [autoGenerate, setAutoGenerate] = useState(false);

  const tabs = [
    { key: "qa" as TabKey, label: "Q&A Bot", icon: Rocket, description: "GBP Q&A pairs" },
    { key: "gsc" as TabKey, label: "GSC Optimizer", icon: LineChart, description: "Near-miss keywords" },
    { key: "trends" as TabKey, label: "Local Trends", icon: TrendingUp, description: "Urgent GBP posts" },
    { key: "schema" as TabKey, label: "FAQ Schema", icon: Code, description: "JSON-LD markup" },
    { key: "analyze" as TabKey, label: "CRO9 Analysis", icon: Zap, description: "Feedback loop" },
  ];

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Date.now(), targetUrl: "", keywords: "", questions: "" },
    ]);
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateItem = (id: number, field: keyof StrategyItem, value: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, [field]: value } : i))
    );
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const runFeature = async (item: StrategyItem) => {
    setLoading(true);
    const keywords = item.keywords
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);
    const questions = item.questions
      .split("\n")
      .map((q) => q.trim())
      .filter(Boolean);

    const routeMap: Record<string, string> = {
      qa: "/api/seo/generate",
      gsc: "/api/seo/optimize",
      trends: "/api/seo/trends",
      schema: "/api/seo/schema",
    };

    try {
      const res = await fetch(routeMap[activeTab], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUrl: item.targetUrl,
          keywords,
          questions,
          companyName: "ABK Unlimited",
        }),
      });

      const data = await res.json();
      setResults((prev) => ({
        ...prev,
        [`${activeTab}-${item.id}`]: data.success ? data.data : data.error,
      }));
    } catch (err) {
      setResults((prev) => ({
        ...prev,
        [`${activeTab}-${item.id}`]: `Error: ${err instanceof Error ? err.message : "Request failed"}`,
      }));
    } finally {
      setLoading(false);
    }
  };

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/seo/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          period: analyzePeriod,
          autoGenerate,
          companyName: "ABK Unlimited",
        }),
      });
      const data = await res.json();
      setResults((prev) => ({
        ...prev,
        analyze: data.success ? data.data : data.error,
      }));
    } catch (err) {
      setResults((prev) => ({
        ...prev,
        analyze: `Error: ${err instanceof Error ? err.message : "Request failed"}`,
      }));
    } finally {
      setLoading(false);
    }
  };

  const renderResult = (key: string) => {
    const result = results[key];
    if (!result) return null;

    const text = typeof result === "string" ? result : JSON.stringify(result, null, 2);

    return (
      <div className="mt-4 relative">
        <div className="bg-[#0a1a14] rounded-xl p-4 text-sm font-mono text-[#4ade80] overflow-auto max-h-96">
          <pre className="whitespace-pre-wrap">{text}</pre>
        </div>
        <button
          onClick={() => copyToClipboard(text, key)}
          className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          title="Copy"
        >
          {copied === key ? (
            <Check className="w-3.5 h-3.5 text-[#4ade80]" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-white/60" />
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          APEX-QA SEO Engine
        </h1>
        <p className="text-gray-500 mt-1">
          AI-powered local SEO optimization with CRO9 feedback loop. Generate
          Q&A pairs, optimize near-miss keywords, create trend posts, and build
          FAQ schemas.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                isActive
                  ? "bg-[#14664f] text-white shadow-md shadow-[#14664f]/20"
                  : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-200/80"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* CRO9 Analysis Tab */}
      {activeTab === "analyze" && (
        <div className="bg-white rounded-xl border border-gray-200/80 p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              CRO9 → APEX-QA Feedback Loop
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Pull CRO9 behavioral data, identify underperforming pages, and
              auto-generate optimized content.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Period
              </label>
              <select
                value={analyzePeriod}
                onChange={(e) => setAnalyzePeriod(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
              >
                <option value="1d">Last 24h</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>

            <div className="flex items-center gap-2 mt-5">
              <input
                type="checkbox"
                id="autoGen"
                checked={autoGenerate}
                onChange={(e) => setAutoGenerate(e.target.checked)}
                className="rounded border-gray-300 text-[#14664f] focus:ring-[#14664f]"
              />
              <label htmlFor="autoGen" className="text-sm text-gray-600">
                Auto-generate content for high-priority issues
              </label>
            </div>
          </div>

          <button
            onClick={runAnalysis}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#14664f] text-white rounded-xl text-sm font-medium hover:bg-[#0f4f3d] disabled:opacity-50 transition-colors"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Zap className="w-4 h-4" />
            )}
            Run CRO9 Analysis
          </button>

          {renderResult("analyze")}
        </div>
      )}

      {/* Content Strategy Items */}
      {activeTab !== "analyze" && (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-200/80 p-5 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Target URL
                    </label>
                    <input
                      type="url"
                      value={item.targetUrl}
                      onChange={(e) =>
                        updateItem(item.id, "targetUrl", e.target.value)
                      }
                      placeholder="https://abkunlimited.com/services/hardscaping"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#14664f]/20 focus:border-[#14664f]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Keywords (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={item.keywords}
                      onChange={(e) =>
                        updateItem(item.id, "keywords", e.target.value)
                      }
                      placeholder="Pittsburgh hardscaping, paver installation, outdoor living"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#14664f]/20 focus:border-[#14664f]"
                    />
                  </div>
                  {(activeTab === "qa" || activeTab === "schema") && (
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Questions (one per line)
                      </label>
                      <textarea
                        value={item.questions}
                        onChange={(e) =>
                          updateItem(item.id, "questions", e.target.value)
                        }
                        placeholder="How much does a paver patio cost in Pittsburgh?&#10;What's the best material for a driveway?"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#14664f]/20 focus:border-[#14664f] resize-none"
                      />
                    </div>
                  )}
                </div>
                {items.length > 1 && (
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-3 p-2 text-gray-300 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <button
                onClick={() => runFeature(item)}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-[#14664f] text-white rounded-lg text-sm font-medium hover:bg-[#0f4f3d] disabled:opacity-50 transition-colors"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                {activeTab === "qa" && "Generate Q&A"}
                {activeTab === "gsc" && "Optimize Content"}
                {activeTab === "trends" && "Generate Trend Post"}
                {activeTab === "schema" && "Build FAQ Schema"}
              </button>

              {renderResult(`${activeTab}-${item.id}`)}
            </div>
          ))}

          <button
            onClick={addItem}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-500 bg-white border border-dashed border-gray-300 rounded-xl hover:border-[#14664f] hover:text-[#14664f] transition-colors w-full justify-center"
          >
            <Plus className="w-4 h-4" />
            Add Strategy Item
          </button>
        </div>
      )}
    </div>
  );
}

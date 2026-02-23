import { getBehavioralData } from "@/lib/cro9";
import { SXOPanel } from "@/components/admin/SXOPanel";
import { Activity, Cookie, ExternalLink } from "lucide-react";

export default async function SXOPage() {
  let data = null;
  let error: string | null = null;

  try {
    data = await getBehavioralData();
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load behavioral data";
  }

  return (
    <div className="space-y-6">
      {/* Header row with consent indicator + CRO9 dashboard link */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Search Experience Optimization</h1>
          <p className="text-gray-500 mt-1">
            Behavioral data, heatmaps, and search experience insights powered by CRO9.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {/* Consent status badge */}
          <div className="flex items-center gap-2 text-xs font-medium text-[#14664f] bg-[#14664f]/10 px-3 py-1.5 rounded-full">
            <Cookie className="w-3.5 h-3.5" />
            <span>Consent Gate Active</span>
          </div>
          {/* CRO9 external link */}
          <a
            href="https://app.cro9.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-[#14664f] hover:bg-[#0f5540] px-3.5 py-1.5 rounded-lg transition-colors"
          >
            CRO9 Dashboard
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {error || !data ? (
        <div className="bg-white rounded-xl border border-gray-200/80 p-8 text-center">
          <Activity className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-600">SXO Data Not Available</p>
          <p className="text-gray-400 mt-2 max-w-md mx-auto text-xs">
            {error ??
              "CRO9 behavioral tracking is not configured yet. Set up your CRO9 integration in Settings to access heatmaps, rage clicks, scroll depth, and form abandonment analytics."}
          </p>
          <div className="mt-4 space-y-2 text-xs text-gray-400">
            <p>Required environment variables in Vercel:</p>
            <div className="inline-flex flex-col gap-1 text-left">
              <code className="bg-gray-100 px-2 py-1 rounded">NEXT_PUBLIC_CRO9_KEY</code>
              <code className="bg-gray-100 px-2 py-1 rounded">CRO9_API_URL</code>
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-400">
            The CRO9 tracker script is already installed in the root layout with full SXO mode
            (scroll depth, rage clicks, dead clicks, exit intent, form abandonment).
            Tracking is gated behind GDPR cookie consent.
          </p>
          <a
            href="/admin/settings"
            className="mt-4 inline-block text-sm text-[#14664f] hover:underline"
          >
            Go to Settings
          </a>
        </div>
      ) : (
        <SXOPanel behavioralData={data} />
      )}
    </div>
  );
}

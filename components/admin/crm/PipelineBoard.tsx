"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import type { CRMPipeline, CRMOpportunity } from "@/lib/crm-types";

export function PipelineBoard() {
  const [pipelines, setPipelines] = useState<CRMPipeline[]>([]);
  const [opportunities, setOpportunities] = useState<CRMOpportunity[]>([]);
  const [selectedPipeline, setSelectedPipeline] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const params = selectedPipeline
          ? `?pipelineId=${selectedPipeline}`
          : "";
        const res = await fetch(`/api/crm/pipelines${params}`);
        if (!res.ok) throw new Error("Failed to load pipelines");
        const data = await res.json();
        setPipelines(data.pipelines || []);
        setOpportunities(data.opportunities || []);
        if (!selectedPipeline && data.pipelines?.length > 0) {
          setSelectedPipeline(data.pipelines[0].id);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [selectedPipeline]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-500">Loading pipelines...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
        {error}
      </div>
    );
  }

  const activePipeline = pipelines.find((p) => p.id === selectedPipeline);
  const stages = activePipeline?.stages || [];

  return (
    <div className="space-y-4">
      {pipelines.length > 1 && (
        <div className="flex gap-2">
          {pipelines.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPipeline(p.id)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                selectedPipeline === p.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      )}

      {stages.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No pipeline stages found.</p>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {stages
            .sort((a, b) => a.position - b.position)
            .map((stage) => {
              const stageOpps = opportunities.filter(
                (o) => o.pipelineStageId === stage.id
              );
              return (
                <div
                  key={stage.id}
                  className="w-72 shrink-0 bg-gray-50 rounded-lg p-3"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-sm text-gray-700">
                      {stage.name}
                    </h4>
                    <span className="text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">
                      {stageOpps.length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {stageOpps.map((opp) => (
                      <div
                        key={opp.id}
                        className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm"
                      >
                        <p className="font-medium text-sm text-gray-900 truncate">
                          {opp.name}
                        </p>
                        {opp.monetaryValue > 0 && (
                          <p className="text-sm text-green-600 font-medium mt-1">
                            ${opp.monetaryValue.toLocaleString()}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                          {opp.status}
                        </p>
                      </div>
                    ))}
                    {stageOpps.length === 0 && (
                      <p className="text-xs text-gray-400 text-center py-4">
                        No opportunities
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Loader2, Play } from "lucide-react";
import type { CRMWorkflow } from "@/lib/crm-types";

export function WorkflowList() {
  const [workflows, setWorkflows] = useState<CRMWorkflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrolling, setEnrolling] = useState<string | null>(null);
  const [contactId, setContactId] = useState("");
  const [enrollMessage, setEnrollMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/crm/workflows");
        if (!res.ok) throw new Error("Failed to load workflows");
        const data = await res.json();
        setWorkflows(data.workflows || []);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleEnroll(workflowId: string) {
    if (!contactId.trim()) {
      setEnrollMessage({ type: "error", text: "Enter a contact ID first" });
      return;
    }

    setEnrolling(workflowId);
    setEnrollMessage(null);
    try {
      const res = await fetch("/api/crm/workflows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactId, workflowId }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to enroll");
      }
      setEnrollMessage({ type: "success", text: "Contact enrolled successfully!" });
    } catch (e) {
      setEnrollMessage({
        type: "error",
        text: e instanceof Error ? e.message : "Enrollment failed",
      });
    } finally {
      setEnrolling(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-500">Loading workflows...</span>
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

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contact ID (for workflow enrollment)
        </label>
        <input
          type="text"
          value={contactId}
          onChange={(e) => setContactId(e.target.value)}
          placeholder="Enter contact ID..."
          className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {enrollMessage && (
        <div
          className={`p-3 rounded-lg text-sm ${
            enrollMessage.type === "success"
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {enrollMessage.text}
        </div>
      )}

      {workflows.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No workflows found.</p>
      ) : (
        <div className="space-y-2">
          {workflows.map((wf) => (
            <div
              key={wf.id}
              className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4"
            >
              <div>
                <p className="font-medium text-sm text-gray-900">{wf.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Status: {wf.status} &middot; ID: {wf.id}
                </p>
              </div>
              <button
                onClick={() => handleEnroll(wf.id)}
                disabled={enrolling === wf.id || !contactId.trim()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {enrolling === wf.id ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Play className="w-3.5 h-3.5" />
                )}
                Enroll
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { ContactList } from "@/components/admin/crm/ContactList";
import { PipelineBoard } from "@/components/admin/crm/PipelineBoard";
import { SocialPostForm } from "@/components/admin/crm/SocialPostForm";
import { WorkflowList } from "@/components/admin/crm/WorkflowList";
import { CustomerDatabase } from "@/components/admin/crm/CustomerDatabase";

const TABS = [
  { key: "customers", label: "Customer Database" },
  { key: "contacts", label: "CRM Contacts" },
  { key: "pipelines", label: "Pipelines" },
  { key: "social", label: "Social Planner" },
  { key: "workflows", label: "Workflows" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function CRMPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("customers");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">CRM Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Manage your customer database, contacts, pipelines, social posting, and workflows.
        </p>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex gap-1 -mb-px">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? "border-[#14664f] text-[#14664f]"
                  : "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div>
        {activeTab === "customers" && <CustomerDatabase />}
        {activeTab === "contacts" && <ContactList />}
        {activeTab === "pipelines" && <PipelineBoard />}
        {activeTab === "social" && <SocialPostForm />}
        {activeTab === "workflows" && <WorkflowList />}
      </div>
    </div>
  );
}

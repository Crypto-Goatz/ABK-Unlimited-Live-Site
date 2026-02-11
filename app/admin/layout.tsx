"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/admin/Sidebar";
import { LogOut } from "lucide-react";

interface User {
  email: string;
  name: string;
  picture: string;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) return;
    fetch("/api/auth")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.user) setUser(data.user);
      })
      .catch(() => {});
  }, [isLoginPage]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    window.location.href = "/admin/login";
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col overflow-auto">
        {user && (
          <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-end gap-3 shrink-0">
            <span className="text-sm text-gray-600">{user.email}</span>
            {user.picture && (
              <img
                src={user.picture}
                alt=""
                className="w-7 h-7 rounded-full"
                referrerPolicy="no-referrer"
              />
            )}
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-600 transition-colors"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </header>
        )}
        <main className="flex-1 overflow-auto">
          <div className="p-6 lg:p-8 max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}

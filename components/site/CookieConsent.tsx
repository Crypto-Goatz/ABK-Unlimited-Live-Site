"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
  return match ? match[2] : null
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${value};expires=${expires};path=/;SameSite=Lax`
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!getCookie("abk_consent")) {
      const t = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  function accept(level: "all" | "essential") {
    setCookie("abk_consent", level, 365)
    setVisible(false)
    window.dispatchEvent(new CustomEvent("abk-consent-update", { detail: level }))
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-[9999] animate-slide-up"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="mx-auto max-w-3xl px-4 pb-4">
        <div className="bg-[#0a1a14]/95 backdrop-blur-lg rounded-2xl border border-white/10 p-5 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white/90 leading-relaxed">
                We use cookies to improve your experience and analyze site traffic.{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-2 text-[#4ade80] hover:text-[#86efac] transition-colors"
                >
                  Privacy&nbsp;Policy
                </Link>
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => accept("essential")}
                className="px-4 py-2 text-xs font-medium text-white/70 border border-white/20 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                Essential Only
              </button>
              <button
                onClick={() => accept("all")}
                className="px-5 py-2 text-xs font-semibold text-[#0a1a14] bg-[#4ade80] rounded-lg hover:bg-[#86efac] transition-colors cursor-pointer"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

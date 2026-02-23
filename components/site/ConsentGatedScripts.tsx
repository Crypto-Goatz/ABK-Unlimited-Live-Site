"use client"

import { useState, useEffect } from "react"
import Script from "next/script"

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
  return match ? match[2] : null
}

export function ConsentGatedScripts({
  ga4Id,
  cro9Key,
  crmTrackingId,
}: {
  ga4Id?: string
  cro9Key?: string
  crmTrackingId?: string
}) {
  const [consent, setConsent] = useState<string | null>(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setConsent(getCookie("abk_consent"))
    setChecked(true)

    function onUpdate(e: Event) {
      const detail = (e as CustomEvent).detail as string
      setConsent(detail)
    }
    window.addEventListener("abk-consent-update", onUpdate)
    return () => window.removeEventListener("abk-consent-update", onUpdate)
  }, [])

  if (!checked || consent !== "all") return null

  return (
    <>
      {/* Google Analytics 4 */}
      {ga4Id && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4Id}', {
                send_page_view: true,
                cookie_flags: 'SameSite=None;Secure',
              });
            `}
          </Script>
        </>
      )}

      {/* CRO9 Analytics + SXO Behavioral Tracker */}
      {cro9Key && (
        <Script
          src="https://cdn.cro9.app/tracker.min.js"
          data-api-key={cro9Key}
          data-consent-mode="gdpr"
          data-track-clicks="true"
          data-track-scroll="true"
          data-track-forms="true"
          data-track-rage-clicks="true"
          data-track-dead-clicks="true"
          data-track-exit-intent="true"
          data-sxo-mode="full"
          strategy="afterInteractive"
        />
      )}

      {/* CRM Tracking Script */}
      {crmTrackingId && (
        <Script
          src="https://links.rocketclients.com/js/external-tracking.js"
          data-tracking-id={crmTrackingId}
          strategy="afterInteractive"
        />
      )}
    </>
  )
}

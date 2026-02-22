import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import { Suspense } from "react"
import { AttributionTracker } from "@/components/site/AttributionTracker"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: "ABK Unlimited | Pittsburgh's Trusted General Contractor | Kitchen & Bath Remodeling",
  description:
    "Award-winning Pittsburgh general contractor specializing in kitchen remodeling, bathroom renovations, basement finishing & deck building. Licensed & insured. Free estimates. Call (412) 944-1683.",
  robots: "index, follow",
  openGraph: {
    title: "ABK Unlimited | Pittsburgh's Trusted General Contractor",
    description:
      "Award-winning contractor serving Greater Pittsburgh. Kitchen remodeling, bathroom renovations, basement finishing, deck building, and more.",
    url: "https://abkunlimited.com",
    type: "website",
    siteName: "ABK Unlimited",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cro9Key = process.env.NEXT_PUBLIC_CRO9_KEY
  const crmTrackingId = process.env.NEXT_PUBLIC_CRM_TRACKING_ID
  const ga4Id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              name: "ABK Unlimited",
              description:
                "Full-service residential and commercial general contractor serving Greater Pittsburgh. Kitchen remodeling, bathroom renovations, basement finishing, deck building, and custom home construction.",
              url: "https://abkunlimited.com",
              logo: "https://abkunlimited.com/abk-logo.png",
              telephone: "+1-412-944-1683",
              email: "abk.unlimited@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "138 Balver Ave",
                addressLocality: "Pittsburgh",
                addressRegion: "PA",
                postalCode: "15205",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "40.4406",
                longitude: "-79.9959",
              },
              areaServed: [
                { "@type": "City", name: "Pittsburgh" },
                { "@type": "City", name: "Mount Lebanon" },
                { "@type": "City", name: "Bethel Park" },
                { "@type": "City", name: "Upper Saint Clair" },
                { "@type": "City", name: "Sewickley" },
                { "@type": "City", name: "Moon Township" },
              ],
              priceRange: "$10,000 - $500,000",
              openingHours: "Mo-Fr 07:00-18:00, Sa 08:00-14:00",
              hasCredential: {
                "@type": "EducationalOccupationalCredential",
                credentialCategory: "license",
                name: "Pennsylvania Home Improvement Contractor License #PA163301",
              },
              award: ["Best of Houzz 2025"],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                reviewCount: "9",
                bestRating: "5",
              },
              sameAs: [
                "https://www.facebook.com/profile.php?id=100065571905770",
                "https://www.houzz.com/professionals/general-contractors/abk-unlimited-pfvwus-pf~222150373",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics />

        {/* Attribution Tracker — captures gclid, fbclid, UTMs, GA client ID */}
        <Suspense fallback={null}>
          <AttributionTracker />
        </Suspense>

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

        {/* CRM Tracking Script — lead tracking + chat widget support */}
        {crmTrackingId && (
          <Script
            src="https://links.rocketclients.com/js/external-tracking.js"
            data-tracking-id={crmTrackingId}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  )
}

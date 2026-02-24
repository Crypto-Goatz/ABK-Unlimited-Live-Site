import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { CRMChatWidget } from "@/components/site/CRMChatWidget"
import { ConsentGatedScripts } from "@/components/site/ConsentGatedScripts"
import { CookieConsent } from "@/components/site/CookieConsent"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  metadataBase: new URL("https://abkunlimited.com"),
  title: {
    default: "ABK Unlimited | Pittsburgh's Trusted General Contractor | Kitchen & Bath Remodeling",
    template: "%s | ABK Unlimited Pittsburgh",
  },
  description:
    "Award-winning Pittsburgh general contractor specializing in kitchen remodeling, bathroom renovations, basement finishing & deck building. Licensed & insured. Free estimates. Call (412) 944-1683.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  alternates: {
    canonical: "https://abkunlimited.com",
  },
  openGraph: {
    title: "ABK Unlimited | Pittsburgh's Trusted General Contractor",
    description:
      "Award-winning contractor serving Greater Pittsburgh. Kitchen remodeling, bathroom renovations, basement finishing, deck building, and more.",
    url: "https://abkunlimited.com",
    type: "website",
    siteName: "ABK Unlimited",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ABK Unlimited | Pittsburgh's Trusted General Contractor",
    description:
      "Award-winning contractor serving Greater Pittsburgh. Kitchen remodeling, bathroom renovations, basement finishing, deck building, and more.",
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
                reviewCount: "200",
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

        {/* Non-essential tracking — gated behind cookie consent */}
        <ConsentGatedScripts
          ga4Id={ga4Id || undefined}
          cro9Key={cro9Key || undefined}
          crmTrackingId={crmTrackingId || undefined}
        />

        {/* CRM Chat Widget — essential (user-initiated) */}
        <Suspense fallback={null}>
          <CRMChatWidget />
        </Suspense>

        {/* GDPR cookie consent banner */}
        <CookieConsent />
      </body>
    </html>
  )
}

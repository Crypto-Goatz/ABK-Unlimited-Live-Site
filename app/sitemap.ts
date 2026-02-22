import type { MetadataRoute } from "next"

const BASE_URL = "https://abkunlimited.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/free-estimate`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/portfolio`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/reviews`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/testimonials`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/financing`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/remodelling`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ]

  // Service pages
  const services = [
    "kitchen-remodeling",
    "bathroom-remodeling",
    "basement-finishing",
    "deck-building",
    "hardscaping",
    "paving",
    "outdoor-firepits",
    "home-additions",
    "flooring-installation",
    "custom-homes",
    "commercial-construction",
  ]

  const servicePages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...services.map((slug) => ({
      url: `${BASE_URL}/services/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ]

  // Service area pages
  const serviceAreas = [
    "mt-lebanon",
    "bethel-park",
    "upper-st-clair",
    "sewickley",
    "moon-township",
    "robinson",
    "cranberry-township",
    "wexford",
  ]

  const serviceAreaPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/service-areas`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...serviceAreas.map((slug) => ({
      url: `${BASE_URL}/service-areas/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]

  // Tool pages
  const tools = [
    "cost-calculator",
    "design-gallery",
    "timeline-estimator",
    "visualizer",
  ]

  const toolPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/tools`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    ...tools.map((slug) => ({
      url: `${BASE_URL}/tools/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ]

  return [...corePages, ...servicePages, ...serviceAreaPages, ...toolPages]
}

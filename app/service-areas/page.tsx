import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/site/Header"
import { Footer } from "@/components/site/Footer"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  ArrowRight,
  Phone,
  Users,
  Home,
  CheckCircle,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Service Areas | ABK Unlimited Pittsburgh General Contractor",
  description:
    "ABK Unlimited serves Greater Pittsburgh including Mt. Lebanon, Bethel Park, Upper St. Clair, Sewickley, Moon Township, Robinson, Cranberry Township, and Wexford. Free estimates.",
  openGraph: {
    title: "Service Areas | ABK Unlimited Pittsburgh",
    description:
      "Serving Pittsburgh's finest communities with award-winning home remodeling. Find your area.",
    url: "https://abkunlimited.com/service-areas",
  },
}

const serviceAreas = [
  {
    name: "Mt. Lebanon",
    slug: "mt-lebanon",
    description:
      "South Hills premium community known for excellent schools and beautiful homes. We've completed dozens of kitchen and bathroom remodels for Mt. Lebanon homeowners.",
    highlights: ["Top-rated schools", "Walkable neighborhoods", "Historic charm"],
  },
  {
    name: "Bethel Park",
    slug: "bethel-park",
    description:
      "Family-friendly South Hills community with a mix of established and newer neighborhoods. Popular projects include basement finishing and deck building.",
    highlights: ["Family-oriented", "Growing community", "Park access"],
  },
  {
    name: "Upper St. Clair",
    slug: "upper-st-clair",
    description:
      "Upscale residential community with high-end homes that deserve premium craftsmanship. Specializing in luxury kitchen remodels and whole-home renovations.",
    highlights: ["Upscale homes", "Award-winning schools", "Premium finishes"],
  },
  {
    name: "Sewickley",
    slug: "sewickley",
    description:
      "Historic riverfront village with character-filled homes. Our team excels at blending modern updates with the architectural integrity of Sewickley's historic properties.",
    highlights: ["Historic homes", "Riverfront living", "Boutique village"],
  },
  {
    name: "Moon Township",
    slug: "moon-township",
    description:
      "Growing western suburb near the airport with a mix of new construction and established homes. Popular for home additions and custom outdoor living spaces.",
    highlights: ["Airport proximity", "Diverse housing", "Growing area"],
  },
  {
    name: "Robinson",
    slug: "robinson",
    description:
      "Commercial and residential hub with convenient access and growing neighborhoods. We handle both residential remodels and light commercial construction in Robinson.",
    highlights: ["Convenient location", "Commercial & residential", "Easy access"],
  },
  {
    name: "Cranberry Township",
    slug: "cranberry-township",
    description:
      "Northern growth corridor with newer homes and upscale developments. Popular projects include custom home builds, luxury kitchens, and outdoor living spaces.",
    highlights: ["New developments", "Northern corridor", "Modern homes"],
  },
  {
    name: "Wexford",
    slug: "wexford",
    description:
      "North Hills community with established neighborhoods and quality homes. We regularly complete bathroom remodels, basement finishing, and hardscaping projects here.",
    highlights: ["Established area", "Quality housing", "Strong community"],
  },
]

export default function ServiceAreasPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-secondary overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6">
                Greater Pittsburgh
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-secondary-foreground mb-6">
                Areas We Serve
              </h1>
              <p className="text-xl text-secondary-foreground/80 mb-4">
                ABK Unlimited proudly serves homeowners across Greater Pittsburgh. From the South Hills
                to the North Hills, we bring award-winning craftsmanship to your neighborhood.
              </p>
              <div className="flex items-center justify-center gap-6 text-secondary-foreground/70 text-sm mt-8">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Based in Pittsburgh, PA
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  30+ Mile Radius
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Area Cards */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
                Our Primary Service Areas
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We provide full-service remodeling and construction throughout these communities and surrounding areas.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviceAreas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/service-areas/${area.slug}`}
                  className="group bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {area.name}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {area.description}
                  </p>
                  <ul className="space-y-1.5 mb-4">
                    {area.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                    View Area Details <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-muted/50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-6">
                  Serving All of Greater Pittsburgh
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Our headquarters are in Pittsburgh&apos;s Crafton neighborhood, giving us easy access to
                  communities throughout Allegheny County and beyond. We regularly serve homeowners within a
                  30-mile radius of Pittsburgh.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Don&apos;t see your neighborhood listed? We likely serve your area too. Give us a call or
                  request a free estimate to confirm availability for your location.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Home className="h-5 w-5 text-primary" />
                    <span className="text-foreground font-medium">Residential &amp; Commercial Projects</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-foreground font-medium">Allegheny, Washington &amp; Butler Counties</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-foreground font-medium">Free On-Site Consultations</span>
                  </div>
                </div>
              </div>
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg border border-border">
                <Image
                  src="/pittsburgh-skyline-aerial.jpg"
                  alt="Greater Pittsburgh area aerial view"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-semibold text-lg">Greater Pittsburgh, PA</p>
                  <p className="text-white/80 text-sm">Proudly serving the tri-state area since day one</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <MapPin className="h-12 w-12 text-primary-foreground/80 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl mb-4">
              In Your Neighborhood?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Get a free, no-obligation estimate for your home remodeling project. We&apos;ll come to you
              for an in-person consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-estimate">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg px-8">
                  Get a Free Estimate
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent px-8" asChild>
                <a href="tel:+14129441683">
                  <Phone className="mr-2 h-5 w-5" />
                  (412) 944-1683
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

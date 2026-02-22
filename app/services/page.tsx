import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/site/Header"
import { Footer } from "@/components/site/Footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Our Services | ABK Unlimited Pittsburgh General Contractor",
  description:
    "Full-service residential and commercial contractor. Kitchen remodeling, bathroom renovations, basement finishing, deck building, home additions, flooring, hardscaping, paving, outdoor firepits, and custom homes.",
  openGraph: {
    title: "Our Services | ABK Unlimited",
    description:
      "Complete home remodeling services from Pittsburgh's most trusted contractor. Kitchen, bathroom, basement, deck, additions, flooring, and more.",
    url: "https://abkunlimited.com/services",
    type: "website",
  },
}

const services = [
  {
    title: "Kitchen Remodeling",
    slug: "kitchen-remodeling",
    image: "/modern-white-kitchen-remodel-quartz-countertops.jpg",
    description:
      "Transform your kitchen into the heart of your home with custom cabinetry, premium countertops, and modern appliances. From minor refreshes to complete gut renovations, we handle every detail.",
    features: [
      "Custom cabinetry & islands",
      "Quartz & granite countertops",
      "Appliance installation",
      "Lighting & electrical upgrades",
      "Flooring & backsplash tile",
      "Open concept conversions",
    ],
  },
  {
    title: "Bathroom Remodeling",
    slug: "bathroom-remodeling",
    image: "/luxury-master-bathroom-renovation-walk-in-shower.jpg",
    description:
      "Create a spa-like retreat in your own home. We specialize in walk-in showers, freestanding tubs, heated floors, and custom vanities that combine luxury with functionality.",
    features: [
      "Walk-in shower conversions",
      "Freestanding & soaking tubs",
      "Heated tile floors",
      "Custom double vanities",
      "Tile & stone work",
      "Accessibility modifications",
    ],
  },
  {
    title: "Basement Finishing",
    slug: "basement-finishing",
    image: "/finished-basement-home-theater-with-bar.jpg",
    description:
      "Unlock the full potential of your home by finishing your basement. Whether you want a home theater, wet bar, gym, or guest suite, we handle everything from waterproofing to final finishes.",
    features: [
      "Waterproofing & moisture control",
      "Home theater rooms",
      "Wet bars & kitchenettes",
      "Guest bedroom suites",
      "Home gym spaces",
      "Egress windows & safety",
    ],
  },
  {
    title: "Deck Building",
    slug: "deck-building",
    image: "/custom-composite-deck-with-outdoor-furniture-and-c.jpg",
    description:
      "Extend your living space outdoors with a custom-built deck. We work with composite, hardwood, and pressure-treated materials to create the perfect outdoor entertainment area for your home.",
    features: [
      "Composite & wood options",
      "Multi-level designs",
      "Built-in lighting & outlets",
      "Pergolas & shade structures",
      "Railings & stairs",
      "Hot tub platforms",
    ],
  },
  {
    title: "Home Additions",
    slug: "home-additions",
    image: "/sunroom-addition-with-large-windows-natural-light.jpg",
    description:
      "Need more space? We build seamless home additions that look like they were always part of your home. From sunrooms to second stories, we expand your living space with expert craftsmanship.",
    features: [
      "Room additions & bump-outs",
      "Second-story additions",
      "Sunroom & four-season rooms",
      "In-law suites & ADUs",
      "Garage conversions",
      "Permit handling & design",
    ],
  },
  {
    title: "Flooring Installation",
    slug: "flooring-installation",
    image: "/hardwood-floor-installation-in-living-room.jpg",
    description:
      "Beautiful floors are the foundation of every great space. We install hardwood, engineered wood, luxury vinyl plank, tile, and carpet with precision and care.",
    features: [
      "Hardwood & engineered wood",
      "Luxury vinyl plank (LVP)",
      "Porcelain & ceramic tile",
      "Natural stone",
      "Carpet installation",
      "Subfloor preparation",
    ],
  },
  {
    title: "Custom Homes",
    slug: "custom-homes",
    image: "/custom-new-construction-home-exterior.jpg",
    description:
      "Build your dream home from the ground up. Our custom home division handles everything from site preparation to final landscaping, delivering a home built to your exact specifications.",
    features: [
      "Custom floor plan design",
      "Site preparation & grading",
      "Foundation to finish construction",
      "Energy-efficient building",
      "Smart home integration",
      "Landscaping & hardscaping",
    ],
  },
  {
    title: "Hardscaping",
    slug: "hardscaping",
    image: "/hardscape-patio-outdoor-living.jpg",
    description:
      "Transform your outdoor space with custom hardscaping. From elegant stone patios and retaining walls to walkways and outdoor kitchens, we build stunning outdoor environments that last a lifetime.",
    features: [
      "Natural stone patios",
      "Retaining walls & terracing",
      "Custom walkways & paths",
      "Outdoor kitchens",
      "Seat walls & planters",
      "Drainage solutions",
    ],
  },
  {
    title: "Paving",
    slug: "paving",
    image: "/paver-driveway-herringbone-pattern.jpg",
    description:
      "Upgrade your driveway, walkways, and outdoor surfaces with professional paving. We install interlocking pavers, stamped concrete, and natural stone with precision and artistry.",
    features: [
      "Interlocking paver driveways",
      "Stamped concrete patios",
      "Permeable paver systems",
      "Pool deck paving",
      "Cobblestone & brick accents",
      "Commercial parking areas",
    ],
  },
  {
    title: "Outdoor Firepits",
    slug: "outdoor-firepits",
    image: "/outdoor-firepit-patio-evening.jpg",
    description:
      "Create the ultimate gathering spot with a custom-built firepit or outdoor fireplace. From rustic stone fire circles to modern gas-powered features, we design outdoor fire elements that become the heart of your backyard.",
    features: [
      "Custom stone firepits",
      "Gas & wood-burning options",
      "Outdoor fireplaces",
      "Built-in seating walls",
      "Fire table installations",
      "Complete patio packages",
    ],
  },
  {
    title: "Commercial Construction",
    slug: "commercial-construction",
    image: "/commercial-office-buildout-modern.jpg",
    description:
      "From office buildouts to retail renovations, our commercial division delivers professional results on time and on budget. We work around your schedule to minimize business disruption.",
    features: [
      "Office buildouts & renovations",
      "Retail store construction",
      "Restaurant & hospitality",
      "ADA compliance upgrades",
      "Tenant improvements",
      "Multi-unit residential",
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-secondary overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary/20" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6">
                What We Do
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Our Services
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                Complete residential and commercial construction services.
                From kitchen remodels to custom homes, every project gets our
                full attention and commitment to quality.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid - Alternating Layout */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="space-y-24">
              {services.map((service, index) => (
                <div
                  key={service.slug}
                  className="grid lg:grid-cols-2 gap-12 items-center"
                >
                  {/* Image */}
                  <div
                    className={`relative h-[400px] rounded-2xl overflow-hidden shadow-xl ${
                      index % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {service.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Link href={`/services/${service.slug}`}>
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Learn More
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-secondary">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Not Sure Where to Start?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Tell us about your project and we&apos;ll recommend the best
              approach. Every consultation is free, with no obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-estimate">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
                >
                  Get Free Estimate
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <a href="tel:+14129441683">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  (412) 944-1683
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

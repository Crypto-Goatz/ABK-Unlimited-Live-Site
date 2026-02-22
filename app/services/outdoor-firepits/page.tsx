import { Header } from "@/components/site/Header"
import { Footer } from "@/components/site/Footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import {
  CheckCircle,
  ArrowLeft,
  Phone,
  Star,
  Award,
  Flame,
  ArrowRight,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Outdoor Firepits Pittsburgh | ABK Unlimited Custom Fire Features",
  description:
    "Custom outdoor firepits & fireplaces in Pittsburgh. Stone fire circles, gas fire features, built-in seating walls & complete patio packages. Licensed contractor. Free estimates. Call (412) 944-1683.",
  openGraph: {
    title: "Outdoor Firepits & Fire Features | ABK Unlimited Pittsburgh",
    description:
      "Create the ultimate gathering spot with a custom-built firepit. Stone, gas, and wood-burning options with built-in seating designed for Pittsburgh living.",
    url: "https://abkunlimited.com/services/outdoor-firepits",
    type: "website",
  },
}

const features = [
  "Custom Stone Firepits",
  "Gas & Wood-Burning Options",
  "Outdoor Fireplaces",
  "Built-In Seating Walls",
  "Fire Table Installations",
  "Complete Patio Packages",
  "Lighting & Ambiance Design",
  "Natural Gas Line Installation",
]

const firepitStyles = [
  {
    name: "Classic Stone Fire Circle",
    description:
      "Timeless round or square firepits built with natural stone or manufactured stone veneer. Wood-burning with optional gas starter. The quintessential backyard gathering spot.",
    range: "$5,000 - $12,000",
    includes: "Stone construction, fire-rated liner, cap stones, gravel surround",
  },
  {
    name: "Gas Fire Pit",
    description:
      "Clean-burning natural gas or propane with push-button ignition. No smoke, no sparks, no ash cleanup. Glass media or lava rock with adjustable flame height.",
    range: "$6,000 - $18,000",
    includes: "Gas line, burner system, stone or steel construction, fire media",
  },
  {
    name: "Outdoor Fireplace",
    description:
      "A statement piece that transforms your patio into an outdoor living room. Full masonry or stone veneer construction with chimney, mantel, and optional TV mount.",
    range: "$15,000 - $40,000",
    includes: "Masonry construction, chimney, mantel, hearth, foundation",
  },
  {
    name: "Linear Fire Table",
    description:
      "Sleek, modern rectangular fire features perfect for contemporary outdoor spaces. Gas-powered with stainless steel burner trays and glass or stone surrounds.",
    range: "$4,000 - $15,000",
    includes: "Burner tray, gas connection, table surround, fire glass media",
  },
]

const packages = [
  {
    name: "Firepit Essentials",
    price: "Starting at $8,000",
    features: [
      "Custom stone firepit",
      "Gravel or paver surround",
      "4 Adirondack-style seats",
      "Basic landscape lighting",
    ],
  },
  {
    name: "Gathering Package",
    price: "Starting at $18,000",
    features: [
      "Premium stone firepit",
      "Built-in seat wall (half circle)",
      "Paver patio extension",
      "Integrated LED lighting",
      "Landscaping accents",
    ],
    popular: true,
  },
  {
    name: "Outdoor Living Suite",
    price: "Starting at $35,000",
    features: [
      "Outdoor fireplace or firepit",
      "Full wraparound seat wall",
      "Complete paver patio",
      "Outdoor kitchen area",
      "Landscape & path lighting",
      "Plantings & drainage",
    ],
  },
]

const faqs = [
  {
    q: "Gas or wood-burning — which is better?",
    a: "Gas is more convenient (push-button start, no smoke, no cleanup) and safer for covered areas. Wood-burning gives you the crackling fire experience and campfire aroma. Many clients choose gas for primary use and add a small wood-burning option nearby.",
  },
  {
    q: "Can I use a firepit year-round in Pittsburgh?",
    a: "Absolutely. A well-built firepit extends your outdoor season by months. Most of our clients use their firepits from early spring through late fall, and many enjoy winter fires as well — especially with built-in seating walls that block wind.",
  },
  {
    q: "Do I need a permit for an outdoor firepit?",
    a: "In most Pittsburgh-area municipalities, permanent firepits require a building permit. Gas installations also need plumbing permits. We handle all permitting as part of the project.",
  },
  {
    q: "How far should a firepit be from my house?",
    a: "Building codes typically require 10-25 feet from structures, depending on municipality and fire type. We ensure every installation meets local fire safety codes and HOA requirements.",
  },
  {
    q: "Can you add a firepit to my existing patio?",
    a: "Yes. We regularly retrofit firepits into existing outdoor spaces. We'll assess your current patio structure, utilities, and layout to design the best integration.",
  },
  {
    q: "What about maintenance?",
    a: "Gas firepits need minimal maintenance — occasional cleaning of the burner and media. Wood-burning firepits require ash removal and annual inspection. Stone surfaces should be sealed every 2-3 years.",
  },
]

export default function OutdoorFirepitsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/outdoor-firepit-patio-evening.jpg"
              alt="Custom outdoor firepit with stone seating in Pittsburgh backyard"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/85 to-secondary/50" />
          </div>
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              All Services
            </Link>
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-1.5 mb-6">
                <Flame className="h-4 w-4 text-orange-400" />
                <span className="text-sm font-medium text-orange-300">Outdoor Firepits</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Custom Outdoor{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                  Fire Features
                </span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed mb-8">
                Stone firepits, gas fire tables, outdoor fireplaces, and
                complete entertainment patios. Create the gathering spot
                your family and friends will never want to leave.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
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
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-orange-500/10 text-orange-600 rounded-full text-sm font-medium mb-4">
                What We Build
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Complete Fire Feature Services
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                From simple fire circles to elaborate outdoor living suites.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-orange-500/30 hover:shadow-md transition-all"
                >
                  <Flame className="h-5 w-5 text-orange-500 flex-shrink-0" />
                  <span className="font-medium text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Firepit Styles */}
        <section className="py-20 bg-muted/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Fire Feature Styles & Pricing
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Every fire feature is custom-designed and built on-site.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {firepitStyles.map((style) => (
                <div
                  key={style.name}
                  className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:border-orange-500/20 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-foreground">{style.name}</h3>
                    <span className="text-sm font-semibold text-orange-600 bg-orange-500/10 px-3 py-1 rounded-full whitespace-nowrap">
                      {style.range}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {style.description}
                  </p>
                  <div className="bg-muted rounded-lg px-4 py-2 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">Includes:</span> {style.includes}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Popular Packages
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Pre-designed packages to make planning easy. Every package is fully customizable.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`bg-card rounded-2xl border p-8 relative transition-all hover:shadow-xl ${
                    pkg.popular
                      ? "border-orange-500/50 shadow-lg ring-1 ring-orange-500/20"
                      : "border-border hover:border-orange-500/20"
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-foreground mb-2">{pkg.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-6">{pkg.price}</p>
                  <ul className="space-y-3">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-orange-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/free-estimate" className="block mt-8">
                    <Button
                      className={`w-full ${
                        pkg.popular
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600"
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
                      }`}
                    >
                      Get Estimate
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 bg-muted/50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Firepit FAQs
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-foreground">5.0 Google Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <span className="font-bold text-foreground">Best of Houzz 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="font-bold text-foreground">PA Licensed #PA163301</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-orange-950/40" />
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <Flame className="h-12 w-12 text-orange-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Light Up Your Backyard
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Schedule a free consultation. We&apos;ll visit your property,
              discuss your vision, and design the perfect fire feature for
              your outdoor space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-estimate">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25"
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

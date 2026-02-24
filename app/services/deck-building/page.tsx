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
  Clock,
  Award,
  TreePine,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Deck Building Pittsburgh | ABK Unlimited General Contractor",
  description:
    "Custom deck building in Pittsburgh. Composite Trex & TimberTech, premium wood, multi-level designs, pergolas & railings. Licensed contractor. Free estimates. Call (412) 944-1683.",
}

const features = [
  "Composite Decking (Trex/TimberTech)",
  "Premium Wood Decking",
  "Custom Railings & Balusters",
  "Built-In Seating & Planters",
  "Pergolas & Shade Structures",
  "Outdoor Lighting Systems",
  "Permits & Engineering",
  "Multi-Level Deck Designs",
]

const materialOptions = [
  {
    material: "Composite Decking",
    range: "$45 - $85 / sq ft",
    description:
      "Low-maintenance Trex and TimberTech composite boards. Fade-resistant, scratch-resistant, and backed by 25-50 year warranties. No staining or sealing required.",
    pros: ["No maintenance", "25-50 year warranty", "Won't rot or splinter"],
  },
  {
    material: "Pressure-Treated Wood",
    range: "$25 - $40 / sq ft",
    description:
      "The most affordable option. Pressure-treated lumber is durable and can be stained any color. Requires periodic sealing and staining every 2-3 years.",
    pros: ["Most affordable", "Easy to customize", "Widely available"],
  },
  {
    material: "Hardwood Decking",
    range: "$75 - $150 / sq ft",
    description:
      "Premium exotic hardwoods like Ipe, Tigerwood, and Cumaru offer unmatched beauty and natural durability. Incredibly dense and resistant to insects and rot.",
    pros: ["Stunning natural beauty", "40+ year lifespan", "Extremely durable"],
  },
]

export default function DeckBuildingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-secondary">
          <div className="absolute inset-0">
            <Image
              src="/custom-wooden-deck-outdoor.jpg"
              alt="Custom wooden deck outdoor living space"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Services
            </Link>
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-foreground mb-6">
                Custom Deck Building in Pittsburgh
              </h1>
              <p className="text-xl text-secondary-foreground/80 mb-8 leading-relaxed">
                Expand your living space outdoors with a custom-built deck
                designed for your lifestyle. From intimate retreats to grand
                entertainment spaces, we build decks that last a lifetime.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/free-estimate">
                  <Button size="lg" className="text-lg px-8">
                    Get Free Estimate
                  </Button>
                </Link>
                <a href="tel:+14129441683">
                  <Button variant="outline" size="lg" className="text-lg px-8">
                    <Phone className="h-5 w-5 mr-2" />
                    (412) 944-1683
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-primary text-primary-foreground py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center gap-2">
                <Star className="h-6 w-6" />
                <span className="text-2xl font-bold">5.0/5 Stars</span>
                <span className="text-primary-foreground/80 text-sm">
                  200+ Reviews
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Clock className="h-6 w-6" />
                <span className="text-2xl font-bold">18+ Years</span>
                <span className="text-primary-foreground/80 text-sm">
                  Of Experience
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Award className="h-6 w-6" />
                <span className="text-2xl font-bold">350+ Decks</span>
                <span className="text-primary-foreground/80 text-sm">
                  Built
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Complete Deck Building Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From design to completion, we handle every detail of your new
                deck project.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 p-4 rounded-lg bg-muted/50"
                >
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Material Options Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Decking Material Options
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the perfect material for your lifestyle, budget, and
                aesthetic preferences.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {materialOptions.map((option) => (
                <div
                  key={option.material}
                  className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow"
                >
                  <TreePine className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {option.material}
                  </h3>
                  <p className="text-2xl font-bold text-primary mb-4">
                    {option.range}
                  </p>
                  <p className="text-muted-foreground mb-4">
                    {option.description}
                  </p>
                  <ul className="space-y-2">
                    {option.pros.map((pro) => (
                      <li
                        key={pro}
                        className="flex items-center gap-2 text-sm text-foreground"
                      >
                        <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Our Deck Projects
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Browse some of our recent deck builds across the Pittsburgh
                area.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden group">
                <Image
                  src="/custom-composite-deck-outdoor-living.jpg"
                  alt="Custom composite deck for outdoor living"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden group">
                <Image
                  src="/custom-composite-deck-with-outdoor-furniture-and-c.jpg"
                  alt="Custom composite deck with outdoor furniture"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden group">
                <Image
                  src="/modern-composite-deck-outdoor-living-space.jpg"
                  alt="Modern composite deck outdoor living space"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden group">
                <Image
                  src="/custom-wooden-deck-outdoor.jpg"
                  alt="Custom wooden deck outdoor space"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Build Your Dream Deck?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Get a free design consultation and estimate for your custom deck
              project. We&apos;ll help you choose the perfect materials and
              layout.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-estimate">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8"
                >
                  Get Free Estimate
                </Button>
              </Link>
              <a href="tel:+14129441683">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 border-white text-white hover:bg-white/10"
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
    </>
  )
}

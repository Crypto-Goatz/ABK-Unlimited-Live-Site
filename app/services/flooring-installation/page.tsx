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
  ArrowRight,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Flooring Installation Pittsburgh | ABK Unlimited General Contractor",
  description:
    "Professional flooring installation in Pittsburgh. Hardwood, tile, luxury vinyl plank, carpet & more. Expert refinishing and subfloor repair. Free estimates. Call (412) 944-1683.",
}

const features = [
  "Hardwood Floor Installation",
  "Tile & Stone Flooring",
  "Luxury Vinyl Plank (LVP)",
  "Carpet Installation",
  "Hardwood Refinishing",
  "Subfloor Repair & Leveling",
  "Heated Floor Systems",
  "Custom Patterns & Inlays",
]

const flooringTypes = [
  {
    type: "Hardwood",
    range: "$8 - $25 / sq ft",
    description:
      "Solid and engineered hardwood in oak, maple, walnut, hickory, and exotic species. Timeless beauty that increases home value.",
    best: "Living rooms, bedrooms, hallways",
  },
  {
    type: "Tile & Stone",
    range: "$10 - $30 / sq ft",
    description:
      "Porcelain, ceramic, natural stone, and marble. Waterproof and incredibly durable for high-traffic and wet areas.",
    best: "Bathrooms, kitchens, entryways",
  },
  {
    type: "Luxury Vinyl Plank",
    range: "$6 - $15 / sq ft",
    description:
      "Waterproof, scratch-resistant, and available in realistic wood and stone looks. Perfect balance of beauty, durability, and value.",
    best: "Basements, kitchens, whole-home",
  },
  {
    type: "Carpet",
    range: "$4 - $12 / sq ft",
    description:
      "Plush, Berber, frieze, and patterned options. Provides warmth, sound insulation, and comfort underfoot in bedrooms and living areas.",
    best: "Bedrooms, family rooms, stairs",
  },
]

export default function FlooringInstallationPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero — Parallax-style with flooring image */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/hardwood-flooring-installation.png"
              alt="Hardwood flooring installation"
              fill
              className="object-cover scale-110"
              style={{ transform: "translateZ(0)" }}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/90 via-secondary/80 to-secondary/95" />
          </div>
          {/* Subtle animated grain overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
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
                Flooring Installation in Pittsburgh
              </h1>
              <p className="text-xl text-secondary-foreground/80 mb-8 leading-relaxed">
                The foundation of every beautiful room starts with the right
                floor. Our skilled installers deliver flawless results with
                premium materials, precision craftsmanship, and meticulous
                attention to detail.
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
                <span className="text-2xl font-bold">4.9/5 Stars</span>
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
                <span className="text-2xl font-bold">1,000+ Floors</span>
                <span className="text-primary-foreground/80 text-sm">
                  Installed
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
                Complete Flooring Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From installation to refinishing, we provide comprehensive
                flooring solutions for every room in your home.
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

        {/* Flooring Types Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Flooring Options & Pricing
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We install every type of flooring. Here are typical costs per
                square foot including materials and installation.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {flooringTypes.map((floor) => (
                <div
                  key={floor.type}
                  className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {floor.type}
                  </h3>
                  <p className="text-2xl font-bold text-primary mb-4">
                    {floor.range}
                  </p>
                  <p className="text-muted-foreground mb-4">
                    {floor.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-foreground">
                      <span className="font-semibold">Best for:</span>{" "}
                      {floor.best}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section — Flooring-only images with parallax-style overlapping layout */}
        <section className="py-20 relative overflow-hidden">
          {/* Subtle wood-grain background pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, #000 2px, #000 3px)`,
            backgroundSize: "40px 40px",
          }} />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Flooring Projects
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See the quality and craftsmanship in our recent flooring
                installations.
              </p>
            </div>
            {/* Staggered parallax-inspired grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden group shadow-lg">
                <Image
                  src="/hardwood-floor-installation-in-living-room.jpg"
                  alt="Hardwood floor installation in living room"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-white font-semibold text-sm">Hardwood Installation — Living Room</span>
                </div>
              </div>
              <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden group shadow-lg sm:mt-12">
                <Image
                  src="/flooring-installation-craftsman.jpg"
                  alt="Professional craftsman installing flooring"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-white font-semibold text-sm">Expert Craftsman at Work</span>
                </div>
              </div>
              <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden group shadow-lg sm:-mt-12">
                <Image
                  src="/hardwood-flooring-installation.png"
                  alt="Professional hardwood flooring installation"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-white font-semibold text-sm">Wide-Plank Hardwood Installation</span>
                </div>
              </div>
              <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden group shadow-lg">
                <Image
                  src="/hardwood-floor-installation-in-living-room.jpg"
                  alt="Completed hardwood flooring in open living space"
                  fill
                  className="object-cover object-bottom group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-white font-semibold text-sm">Finished Flooring — Open Floor Plan</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mid CTA — Parallax background */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/flooring-installation-craftsman.jpg"
              alt="Flooring installation in progress"
              fill
              className="object-cover scale-110"
              style={{ transform: "translateZ(0)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 to-secondary/80" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Walk on Something Beautiful
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Your floors set the tone for every room. Let our team help you choose the perfect material, color, and finish for your lifestyle.
            </p>
            <Link href="/free-estimate">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg text-lg px-8">
                Schedule Free In-Home Measurement
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready for Beautiful New Floors?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Schedule a free in-home measurement and consultation. We&apos;ll
              help you choose the perfect flooring and provide a detailed
              estimate.
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

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
  HardHat,
  Ruler,
  Leaf,
  Wifi,
  Shield,
  Gem,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Custom Home Building Pittsburgh | ABK Unlimited General Contractor",
  description:
    "Build your dream home in Pittsburgh with ABK Unlimited. Design-build, energy-efficient construction, smart home integration & premium materials. Licensed contractor. Call (412) 944-1683.",
}

const features = [
  "Design-Build Services",
  "Site Selection Assistance",
  "Architectural Planning",
  "Energy-Efficient Construction",
  "Smart Home Integration",
  "Premium Materials & Finishes",
  "Full Project Management",
  "Comprehensive Warranty",
]

const highlights = [
  {
    icon: Ruler,
    title: "Custom Design-Build",
    description:
      "Work directly with our in-house design team to create a home that perfectly matches your vision, lifestyle, and budget. Every detail is tailored to you.",
  },
  {
    icon: Leaf,
    title: "Energy Efficient",
    description:
      "We build homes with high-performance insulation, energy-efficient windows, HVAC systems, and optional solar-ready infrastructure to minimize your energy costs.",
  },
  {
    icon: Wifi,
    title: "Smart Home Ready",
    description:
      "Future-proof your home with integrated smart home wiring, automated lighting, climate control, security systems, and whole-home audio.",
  },
  {
    icon: Gem,
    title: "Premium Materials",
    description:
      "We source only the finest materials from trusted suppliers. Hardwood floors, natural stone, custom cabinetry, and premium fixtures throughout.",
  },
  {
    icon: Shield,
    title: "Full Warranty",
    description:
      "Every ABK custom home comes with a comprehensive structural warranty and our commitment to your complete satisfaction long after move-in day.",
  },
  {
    icon: HardHat,
    title: "Expert Management",
    description:
      "Our dedicated project managers oversee every phase of construction, keeping you informed with regular updates, on-site meetings, and transparent timelines.",
  },
]

export default function CustomHomesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-secondary">
          <div className="absolute inset-0">
            <Image
              src="/custom-new-construction-home-exterior.jpg"
              alt="Custom new construction home exterior"
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
                Custom Home Building in Pittsburgh
              </h1>
              <p className="text-xl text-secondary-foreground/80 mb-8 leading-relaxed">
                Build the home you&apos;ve always envisioned. From the initial
                sketch to the final walkthrough, our design-build team brings
                your dream home to life with exceptional craftsmanship and
                attention to every detail.
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
                <span className="text-2xl font-bold">75+ Homes</span>
                <span className="text-primary-foreground/80 text-sm">
                  Custom Built
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
                Custom Home Building Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to build your dream home, all under one
                roof.
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

        {/* Highlights Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Why Build With ABK Unlimited?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Building a custom home is one of the biggest investments
                you&apos;ll ever make. Here is why Pittsburgh homeowners trust
                us.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
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
                Custom Home Portfolio
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every ABK custom home is a one-of-a-kind creation built to last
                generations.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden group">
                <Image
                  src="/custom-new-construction-home-exterior.jpg"
                  alt="Custom new construction home exterior"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden group">
                <Image
                  src="/custom-home-construction-process.jpg"
                  alt="Custom home construction process"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden group">
                <Image
                  src="/construction-team-working-on-residential-project.jpg"
                  alt="Construction team working on residential project"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden group">
                <Image
                  src="/modern-luxury-kitchen-remodel-with-white-cabinets-.jpg"
                  alt="Modern luxury kitchen in custom home"
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
              Ready to Build Your Dream Home?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Start with a free consultation. Our design-build team will help
              you plan every detail of your custom home from concept to
              completion.
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

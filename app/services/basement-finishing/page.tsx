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
  Tv,
  Wine,
  Briefcase,
  BedDouble,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Basement Finishing Pittsburgh | ABK Unlimited General Contractor",
  description:
    "Transform your unfinished basement into beautiful living space. Entertainment rooms, home offices, wet bars & guest suites. Licensed Pittsburgh contractor. Free estimates. Call (412) 944-1683.",
}

const features = [
  "Waterproofing & Moisture Control",
  "Framing & Drywall Installation",
  "Electrical Wiring & Outlets",
  "HVAC Extension & Ductwork",
  "Flooring Installation",
  "Bathroom Addition",
  "Egress Window Installation",
  "Custom Built-Ins & Storage",
]

const popularUses = [
  {
    icon: Tv,
    title: "Entertainment Room",
    description:
      "Create the ultimate home theater or game room with surround sound, custom lighting, and comfortable seating areas.",
  },
  {
    icon: Wine,
    title: "Wet Bar & Wine Cellar",
    description:
      "Design a stunning wet bar or wine cellar perfect for entertaining guests with custom cabinetry and refrigeration.",
  },
  {
    icon: Briefcase,
    title: "Home Office",
    description:
      "Build a quiet, dedicated workspace with built-in desks, shelving, proper lighting, and soundproofing.",
  },
  {
    icon: BedDouble,
    title: "Guest Suite",
    description:
      "Add a full bedroom suite with private bathroom, closet, and egress window for a comfortable guest experience.",
  },
]

export default function BasementFinishingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-secondary">
          <div className="absolute inset-0">
            <Image
              src="/finished-basement-living-space.jpg"
              alt="Finished basement living space"
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
                Basement Finishing in Pittsburgh
              </h1>
              <p className="text-xl text-secondary-foreground/80 mb-8 leading-relaxed">
                Unlock the hidden potential of your home. Transform your
                unfinished basement into a beautiful, functional living space
                that adds value and square footage to your home.
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
                <span className="text-2xl font-bold">300+ Basements</span>
                <span className="text-primary-foreground/80 text-sm">
                  Completed
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
                Complete Basement Finishing Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We handle every aspect of your basement transformation, from
                waterproofing to the final coat of paint.
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

        {/* Popular Uses Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Popular Basement Designs
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Your basement can become anything you imagine. Here are the most
                popular options our Pittsburgh clients choose.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {popularUses.map((use) => (
                <div
                  key={use.title}
                  className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <use.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {use.title}
                  </h3>
                  <p className="text-muted-foreground">{use.description}</p>
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
                Basement Transformations
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See what&apos;s possible when you finish your basement with ABK
                Unlimited.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden group">
                <Image
                  src="/finished-basement-home-theater-with-bar.jpg"
                  alt="Finished basement home theater with bar"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden group">
                <Image
                  src="/finished-basement-theater-bar.png"
                  alt="Finished basement entertainment area"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden group">
                <Image
                  src="/basement-transformation-before-after.jpg"
                  alt="Basement transformation before and after"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden group">
                <Image
                  src="/finished-basement-living-space.jpg"
                  alt="Finished basement living space"
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
              Ready to Finish Your Basement?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Add valuable living space to your home. Schedule a free
              consultation to explore your basement&apos;s potential.
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

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
  ChefHat,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kitchen Remodeling Pittsburgh | ABK Unlimited General Contractor",
  description:
    "Transform your kitchen with Pittsburgh's trusted remodeling experts. Custom cabinets, granite countertops, kitchen islands & more. 500+ kitchens completed. Free estimates. Call (412) 944-1683.",
}

const features = [
  "Custom Cabinet Design",
  "Granite/Quartz Countertops",
  "Kitchen Island Installation",
  "Appliance Installation",
  "Backsplash Tile Work",
  "Under-Cabinet Lighting",
  "Flooring Installation",
  "Plumbing & Electrical",
]

const process = [
  {
    step: "01",
    title: "Design Consultation",
    description:
      "We meet at your home to discuss your vision, take measurements, and understand your lifestyle needs.",
  },
  {
    step: "02",
    title: "Planning & Selection",
    description:
      "Our designers create detailed plans while you select cabinets, countertops, fixtures, and finishes.",
  },
  {
    step: "03",
    title: "Construction",
    description:
      "Our skilled craftsmen bring your dream kitchen to life with meticulous attention to every detail.",
  },
  {
    step: "04",
    title: "Final Walkthrough",
    description:
      "We walk through every detail together to ensure your complete satisfaction before the final reveal.",
  },
]

const galleryImages = [
  {
    src: "/modern-white-kitchen-remodel-quartz-countertops.jpg",
    alt: "Modern white kitchen remodel with quartz countertops",
  },
  {
    src: "/farmhouse-kitchen-shaker-cabinets.jpg",
    alt: "Farmhouse kitchen with shaker cabinets",
  },
  {
    src: "/contemporary-kitchen-island-pendant-lights.jpg",
    alt: "Contemporary kitchen island with pendant lights",
  },
  {
    src: "/open-concept-kitchen-living-room-renovation.jpg",
    alt: "Open concept kitchen and living room renovation",
  },
]

const costGuide = [
  {
    tier: "Minor Remodel",
    range: "$15,000 - $30,000",
    description:
      "Cabinet refacing, new countertops, updated fixtures, fresh paint, and new backsplash.",
  },
  {
    tier: "Mid-Range Remodel",
    range: "$35,000 - $75,000",
    description:
      "New custom cabinets, stone countertops, appliance upgrades, new flooring, and layout improvements.",
  },
  {
    tier: "High-End Remodel",
    range: "$80,000 - $150,000+",
    description:
      "Full custom design, premium materials, structural changes, professional-grade appliances, and smart home integration.",
  },
]

export default function KitchenRemodelingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-secondary">
          <div className="absolute inset-0">
            <Image
              src="/modern-kitchen-remodel.png"
              alt="Modern kitchen remodel"
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
                Kitchen Remodeling in Pittsburgh
              </h1>
              <p className="text-xl text-secondary-foreground/80 mb-8 leading-relaxed">
                Your kitchen is the heart of your home. Let our expert team
                transform it into the space you&apos;ve always dreamed of with
                custom designs, premium materials, and meticulous craftsmanship.
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
                <span className="text-2xl font-bold">500+ Kitchens</span>
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
                Complete Kitchen Remodeling Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From minor refreshes to full gut renovations, we handle every
                aspect of your kitchen remodel with expert precision.
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

        {/* Process Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Our 4-Step Kitchen Remodeling Process
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A streamlined approach that keeps your project on time, on
                budget, and stress-free.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
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
                Recent Kitchen Transformations
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Browse some of our recent kitchen remodeling projects in the
                Pittsburgh area.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {galleryImages.map((image) => (
                <div
                  key={image.src}
                  className="relative h-64 sm:h-80 rounded-2xl overflow-hidden group"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cost Guide / Why Choose Us */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Kitchen Remodeling Cost Guide
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every kitchen is unique. Here are typical investment ranges for
                Pittsburgh-area kitchen remodels.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {costGuide.map((tier) => (
                <div
                  key={tier.tier}
                  className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {tier.tier}
                  </h3>
                  <p className="text-2xl font-bold text-primary mb-4">
                    {tier.range}
                  </p>
                  <p className="text-muted-foreground">{tier.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Why Choose ABK Unlimited?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="flex flex-col items-center gap-2">
                  <ChefHat className="h-8 w-8 text-primary" />
                  <span className="font-bold text-foreground">
                    Design Experts
                  </span>
                  <span className="text-sm text-muted-foreground text-center">
                    In-house designers who create functional, beautiful kitchens
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Award className="h-8 w-8 text-primary" />
                  <span className="font-bold text-foreground">
                    Licensed & Insured
                  </span>
                  <span className="text-sm text-muted-foreground text-center">
                    PA HIC #PA163301 - Fully licensed and insured for your
                    protection
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Star className="h-8 w-8 text-primary" />
                  <span className="font-bold text-foreground">
                    5-Star Rated
                  </span>
                  <span className="text-sm text-muted-foreground text-center">
                    Consistently top-rated on Google, Houzz, and HomeAdvisor
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Kitchen?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Schedule a free in-home consultation with our kitchen remodeling
              experts. We&apos;ll help you design the perfect kitchen within your
              budget.
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

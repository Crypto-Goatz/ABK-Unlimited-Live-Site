import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/site/Header"
import { Footer } from "@/components/site/Footer"
import { Button } from "@/components/ui/button"
import {
  ChefHat,
  Bath,
  Layers,
  Footprints,
  Fence,
  Building2,
  Home,
  HardHat,
  CheckCircle,
  ArrowRight,
  Phone,
  Star,
  Shield,
  Clock,
  Award,
  HelpCircle,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Home Remodeling Services | ABK Unlimited Pittsburgh",
  description:
    "Full-service home remodeling in Pittsburgh. Kitchen, bathroom, basement, flooring, decks, home additions, roofing, and custom homes. Licensed & insured. Free estimates.",
  openGraph: {
    title: "Home Remodeling Services | ABK Unlimited Pittsburgh",
    description:
      "Complete indoor and outdoor remodeling from Pittsburgh's trusted general contractor. Quality craftsmanship guaranteed.",
    url: "https://abkunlimited.com/remodelling",
  },
}

const indoorServices = [
  {
    icon: ChefHat,
    title: "Kitchen Remodeling",
    slug: "kitchen-remodeling",
    description:
      "Transform your kitchen into the heart of your home. Custom cabinetry, countertops, islands, tile backsplashes, and complete layout redesigns.",
    image: "/modern-kitchen-remodel.png",
  },
  {
    icon: Bath,
    title: "Bathroom Remodeling",
    slug: "bathroom-remodeling",
    description:
      "From spa-like master baths to functional guest bathrooms. Walk-in showers, soaking tubs, vanity upgrades, and tile work.",
    image: "/luxury-bathroom-renovation.jpg",
  },
  {
    icon: Layers,
    title: "Basement Finishing",
    slug: "basement-finishing",
    description:
      "Unlock your home's hidden potential. Home theaters, gyms, guest suites, wet bars, and livable basement spaces with proper moisture management.",
    image: "/finished-basement-living-space.jpg",
  },
  {
    icon: Footprints,
    title: "Flooring Installation",
    slug: "flooring-installation",
    description:
      "Hardwood, luxury vinyl plank, tile, and carpet. Expert installation that transforms the look and feel of every room in your home.",
    image: "/hardwood-flooring-installation.jpg",
  },
]

const outdoorServices = [
  {
    icon: Fence,
    title: "Decks & Outdoor Living",
    slug: "deck-building",
    description:
      "Custom composite and hardwood decks, pergolas, outdoor kitchens, and screened-in porches built for Pittsburgh's four seasons.",
    image: "/custom-composite-deck-outdoor-living.jpg",
  },
  {
    icon: Building2,
    title: "Home Additions",
    slug: "home-additions",
    description:
      "Seamlessly expand your living space. Bump-outs, second stories, sunrooms, and in-law suites designed to match your existing home.",
    image: "/home-addition-seamless-architecture.jpg",
  },
  {
    icon: Home,
    title: "Roofing",
    slug: "roofing",
    description:
      "Complete roof replacement and repair. Asphalt shingles, metal roofing, and flat roofing systems installed by certified professionals.",
    image: "/custom-new-construction-home-exterior.jpg",
  },
  {
    icon: HardHat,
    title: "Custom Homes",
    slug: "custom-homes",
    description:
      "Build your dream home from the ground up. Full-service custom home construction with dedicated project management throughout.",
    image: "/custom-home-construction-process.jpg",
  },
]

const whyChooseUs = [
  {
    icon: Award,
    title: "Award-Winning Quality",
    description: "Best of Houzz 2025 winner. Our work speaks for itself with 5-star ratings across every platform.",
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "PA HIC #PA163301. Fully licensed, bonded, and insured for your complete protection and peace of mind.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "We set realistic timelines and stick to them. Detailed project schedules keep your remodel on track.",
  },
  {
    icon: Star,
    title: "Transparent Pricing",
    description: "Detailed written estimates with no hidden costs. You'll know exactly what your project costs before we start.",
  },
]

const faqs = [
  {
    question: "How long does a typical kitchen remodel take?",
    answer:
      "A full kitchen remodel typically takes 6-10 weeks depending on the scope. Simple updates like countertops and backsplash can be completed in 2-3 weeks. We provide a detailed timeline before work begins.",
  },
  {
    question: "Do I need permits for my remodeling project?",
    answer:
      "Most structural changes, electrical work, plumbing modifications, and additions require permits in Allegheny County. ABK Unlimited handles all permit applications and inspections as part of our service.",
  },
  {
    question: "Can I live in my home during a remodel?",
    answer:
      "In most cases, yes. We take steps to minimize disruption, including dust barriers and designated work zones. For whole-home renovations, we may recommend temporary arrangements for certain phases.",
  },
  {
    question: "What is your warranty on remodeling work?",
    answer:
      "We provide a 2-year workmanship warranty on all remodeling projects. Many of the materials and products we install carry additional manufacturer warranties of 10-25 years or more.",
  },
  {
    question: "How do I choose materials for my project?",
    answer:
      "Our design consultants guide you through every selection. We have partnerships with local suppliers and showrooms where you can see and touch materials. We also offer our AI Design Visualizer tool to preview choices.",
  },
  {
    question: "Do you offer financing for remodeling projects?",
    answer:
      "Yes! We offer flexible financing options including 0% APR for 12 months, low monthly payments starting at $199/mo, and terms from 3-15 years. Visit our financing page for details.",
  },
]

export default function RemodellingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              name: "ABK Unlimited",
              description:
                "Full-service home remodeling contractor in Pittsburgh, PA. Kitchen, bathroom, basement, decks, additions, roofing, and custom homes.",
              url: "https://abkunlimited.com/remodelling",
              telephone: "+1-412-944-1683",
              email: "info@abkunlimited.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "138 Balver Ave",
                addressLocality: "Pittsburgh",
                addressRegion: "PA",
                postalCode: "15205",
                addressCountry: "US",
              },
              areaServed: {
                "@type": "City",
                name: "Pittsburgh",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Remodeling Services",
                itemListElement: [
                  ...indoorServices.map((s) => ({
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: s.title,
                      description: s.description,
                    },
                  })),
                  ...outdoorServices.map((s) => ({
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: s.title,
                      description: s.description,
                    },
                  })),
                ],
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                reviewCount: "9",
                bestRating: "5",
              },
            }),
          }}
        />

        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-secondary overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/modern-kitchen-remodel.png"
              alt="Pittsburgh home remodeling by ABK Unlimited"
              fill
              className="object-cover opacity-20"
            />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6">
                Full-Service Remodeling
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-secondary-foreground mb-6">
                Pittsburgh Home Remodeling Experts
              </h1>
              <p className="text-xl text-secondary-foreground/80 mb-8">
                From kitchen transformations to custom home builds, ABK Unlimited delivers
                award-winning craftsmanship for every room and every budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/free-estimate">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                    Get a Free Estimate
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10" asChild>
                  <a href="tel:+14129441683">
                    <Phone className="mr-2 h-5 w-5" />
                    (412) 944-1683
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Indoor Services */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Indoor
              </span>
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
                Interior Remodeling Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Transform the inside of your home with expert craftsmanship and attention to detail.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {indoorServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group relative bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                        <service.icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{service.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    <span className="inline-flex items-center gap-1 text-primary font-medium text-sm mt-4 group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Outdoor Services */}
        <section className="py-20 bg-muted/50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Outdoor
              </span>
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
                Exterior & New Construction
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Expand, protect, and enhance the outside of your home.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {outdoorServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group relative bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                        <service.icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{service.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    <span className="inline-flex items-center gap-1 text-primary font-medium text-sm mt-4 group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose ABK */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
                Why Choose ABK Unlimited?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Pittsburgh homeowners trust us for quality, transparency, and results.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseUs.map((item) => (
                <div key={item.title} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-20 bg-muted/50">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
                Remodeling FAQs
              </h2>
              <p className="text-lg text-muted-foreground">
                Answers to common questions about our remodeling services.
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="bg-card rounded-xl border border-border p-6 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl mb-4">
              Start Your Remodel Today
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Whether it&apos;s a single room or a whole-home transformation, ABK Unlimited delivers
              the quality and service Pittsburgh homeowners deserve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-estimate">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg px-8">
                  Get Your Free Estimate
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

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
  Building,
  Store,
  Utensils,
  Stethoscope,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title:
    "Commercial Construction Pittsburgh | ABK Unlimited General Contractor",
  description:
    "Commercial construction services in Pittsburgh. Office buildouts, retail, restaurant, medical, warehouse & tenant improvements. Licensed & insured. Free estimates. Call (412) 944-1683.",
}

const features = [
  "Office Buildouts & Renovations",
  "Retail Store Construction",
  "Restaurant Build-Outs",
  "Medical & Dental Offices",
  "Warehouse & Industrial",
  "Tenant Improvements",
  "ADA Compliance",
  "Code Management & Permits",
]

const sectors = [
  {
    icon: Building,
    title: "Office Spaces",
    description:
      "From startup offices to corporate headquarters, we build productive workspaces with modern open-plan layouts, conference rooms, break areas, and technology infrastructure. We handle everything from demolition to furniture-ready.",
    examples: "Corporate offices, co-working spaces, professional suites",
  },
  {
    icon: Store,
    title: "Retail Stores",
    description:
      "Create a retail environment that drives sales and builds your brand. Custom fixtures, lighting design, fitting rooms, point-of-sale areas, and customer flow optimization for stores of all sizes.",
    examples: "Boutiques, showrooms, franchise locations",
  },
  {
    icon: Utensils,
    title: "Restaurants & Bars",
    description:
      "Full-service restaurant construction including commercial kitchen buildout, hood ventilation, grease traps, bar construction, dining areas, and health code compliance. We know Pittsburgh's permitting process inside and out.",
    examples: "Full-service dining, fast casual, bars & breweries",
  },
  {
    icon: Stethoscope,
    title: "Medical Facilities",
    description:
      "Specialized medical and dental office construction with infection control considerations, HVAC requirements, plumbing for medical equipment, and compliance with healthcare facility regulations.",
    examples: "Dental offices, urgent care, medical practices",
  },
]

export default function CommercialConstructionPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-secondary">
          <div className="absolute inset-0">
            <Image
              src="/commercial-construction-office-building.jpg"
              alt="Commercial construction office building"
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
                Commercial Construction in Pittsburgh
              </h1>
              <p className="text-xl text-secondary-foreground/80 mb-8 leading-relaxed">
                Build, renovate, or expand your commercial space with
                Pittsburgh&apos;s trusted general contractor. We deliver
                on-time, on-budget commercial projects that help your business
                thrive.
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
                <span className="text-2xl font-bold">150+ Projects</span>
                <span className="text-primary-foreground/80 text-sm">
                  Commercial Completed
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
                Commercial Construction Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Full-service commercial construction and renovation for
                businesses of all sizes across Greater Pittsburgh.
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

        {/* Sectors Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Industries We Serve
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We have deep experience building for businesses across these
                key sectors.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {sectors.map((sector) => (
                <div
                  key={sector.title}
                  className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <sector.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      {sector.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {sector.description}
                  </p>
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Examples:</span>{" "}
                    {sector.examples}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Our Commercial Construction Process
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A proven process that keeps your project on schedule and within
                budget, minimizing disruption to your business.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  01
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Consultation
                </h3>
                <p className="text-muted-foreground">
                  We visit your site, understand your business needs, timeline,
                  and budget to develop a comprehensive plan.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  02
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Design & Permits
                </h3>
                <p className="text-muted-foreground">
                  Our team handles architectural drawings, engineering, permit
                  applications, and all code compliance requirements.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  03
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Construction
                </h3>
                <p className="text-muted-foreground">
                  Expert crews execute the build with minimal disruption to
                  neighboring businesses. Daily progress updates and weekly
                  meetings.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  04
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Handover
                </h3>
                <p className="text-muted-foreground">
                  Final inspections, punch list completion, and handover of your
                  move-in ready commercial space with all documentation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Commercial Projects
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A selection of our recent commercial construction projects in
                the Pittsburgh area.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden group">
                <Image
                  src="/commercial-construction-office-building.jpg"
                  alt="Commercial office building construction"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden group">
                <Image
                  src="/commercial-office-buildout-modern.jpg"
                  alt="Modern commercial office buildout"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden group">
                <Image
                  src="/professional-contractor-team-portrait-in-front-of-.jpg"
                  alt="Professional contractor team"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden group">
                <Image
                  src="/contractor-measuring-and-planning-home-renovation.jpg"
                  alt="Contractor planning commercial renovation"
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
              Ready to Build Your Business Space?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Schedule a free consultation to discuss your commercial
              construction project. We&apos;ll provide a detailed scope of work
              and competitive estimate.
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

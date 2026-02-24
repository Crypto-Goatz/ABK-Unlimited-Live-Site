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
  Home,
  ArrowUp,
  Sun,
  Users,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home Additions Pittsburgh | ABK Unlimited General Contractor",
  description:
    "Expand your home with custom additions in Pittsburgh. Room additions, second stories, sunrooms, in-law suites & more. Licensed contractor. Free estimates. Call (412) 944-1683.",
}

const features = [
  "Room Additions",
  "Second Story Additions",
  "Sunroom Construction",
  "In-Law Suite Design & Build",
  "Garage Additions",
  "Bump-Out Expansions",
  "Structural Engineering",
  "Permits & Inspections",
]

const additionTypes = [
  {
    icon: Home,
    title: "Room Addition",
    description:
      "Expand your footprint with a seamlessly integrated room addition. Perfect for growing families who need extra bedrooms, a larger living room, or a dedicated dining space.",
    range: "$80,000 - $200,000+",
  },
  {
    icon: ArrowUp,
    title: "Second Story Addition",
    description:
      "Double your living space without expanding your footprint. Ideal for homeowners who love their lot but need more room. Includes structural reinforcement and stairway design.",
    range: "$150,000 - $400,000+",
  },
  {
    icon: Sun,
    title: "Sunroom Addition",
    description:
      "Bring the outdoors in with a beautiful sunroom featuring floor-to-ceiling windows, climate control, and seamless integration with your existing home.",
    range: "$30,000 - $80,000",
  },
  {
    icon: Users,
    title: "In-Law Suite",
    description:
      "Create an independent living space for family members with a private entrance, kitchenette, full bathroom, bedroom, and living area. ADA-accessible options available.",
    range: "$60,000 - $150,000+",
  },
]

export default function HomeAdditionsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-secondary">
          <div className="absolute inset-0">
            <Image
              src="/home-addition-construction.jpg"
              alt="Home addition construction"
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
                Home Additions in Pittsburgh
              </h1>
              <p className="text-xl text-secondary-foreground/80 mb-8 leading-relaxed">
                Love your neighborhood but need more space? Our expert team
                designs and builds home additions that blend seamlessly with
                your existing architecture while maximizing your living space.
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
                <span className="text-2xl font-bold">200+ Additions</span>
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
                Complete Home Addition Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From initial concept to move-in ready, we manage every phase of
                your home addition project.
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

        {/* Addition Types Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Types of Home Additions
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We build every type of home addition to meet your specific needs
                and budget.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {additionTypes.map((type) => (
                <div
                  key={type.title}
                  className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <type.icon className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {type.title}
                      </h3>
                      <p className="text-lg font-bold text-primary">
                        {type.range}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{type.description}</p>
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
                Home Addition Projects
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See how we&apos;ve helped Pittsburgh homeowners expand their
                living space.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden group">
                <Image
                  src="/home-addition-seamless-architecture.jpg"
                  alt="Home addition with seamless architecture"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden group">
                <Image
                  src="/modern-home-addition-sunroom-with-large-windows.jpg"
                  alt="Modern home addition sunroom with large windows"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden group">
                <Image
                  src="/sunroom-addition-with-large-windows-natural-light.jpg"
                  alt="Sunroom addition with natural light"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden group">
                <Image
                  src="/home-addition-construction.jpg"
                  alt="Home addition construction in progress"
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
              Ready to Expand Your Home?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Don&apos;t move -- improve. Schedule a free consultation to
              discuss your home addition project and get a detailed estimate.
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

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
  Droplets,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bathroom Remodeling Pittsburgh | ABK Unlimited General Contractor",
  description:
    "Luxury bathroom remodeling in Pittsburgh. Walk-in showers, soaking tubs, custom vanities, heated floors & more. Licensed & insured. Free estimates. Call (412) 944-1683.",
}

const features = [
  "Walk-In Shower Conversion",
  "Soaking Tubs & Freestanding Tubs",
  "Custom Vanity & Cabinetry",
  "Heated Floor Systems",
  "Tile & Stone Installation",
  "Lighting Design & Installation",
  "Plumbing Upgrades & Relocation",
  "ADA Accessible Design",
]

const galleryImages = [
  {
    src: "/luxury-master-bathroom-renovation-walk-in-shower.jpg",
    alt: "Luxury master bathroom with walk-in shower",
  },
  {
    src: "/contemporary-double-vanity-bathroom.jpg",
    alt: "Contemporary double vanity bathroom",
  },
  {
    src: "/spa-bathroom-natural-stone.jpg",
    alt: "Spa-style bathroom with natural stone",
  },
  {
    src: "/modern-bathroom-walk-in-shower-glass.jpg",
    alt: "Modern bathroom with frameless glass walk-in shower",
  },
]

const bathroomTypes = [
  {
    type: "Master Bathroom",
    range: "$25,000 - $75,000+",
    description:
      "Full luxury master bath with walk-in shower, freestanding tub, double vanity, heated floors, and premium tile work.",
  },
  {
    type: "Guest Bathroom",
    range: "$15,000 - $35,000",
    description:
      "Complete guest bathroom renovation with new vanity, shower/tub combo, tile, fixtures, and fresh design.",
  },
  {
    type: "Powder Room",
    range: "$8,000 - $20,000",
    description:
      "Half-bath refresh with designer vanity, statement mirror, wallpaper or accent tile, and upgraded fixtures.",
  },
]

export default function BathroomRemodelingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-secondary">
          <div className="absolute inset-0">
            <Image
              src="/luxury-bathroom-remodel.png"
              alt="Luxury bathroom remodel"
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
                Bathroom Remodeling in Pittsburgh
              </h1>
              <p className="text-xl text-secondary-foreground/80 mb-8 leading-relaxed">
                Create your personal spa retreat right at home. From luxurious
                master baths to elegant powder rooms, we deliver stunning
                bathroom transformations that elevate your daily routine.
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
                <span className="text-2xl font-bold">400+ Bathrooms</span>
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
                Complete Bathroom Remodeling Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Whether you want a quick refresh or a full gut renovation, we
                offer comprehensive bathroom remodeling solutions.
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

        {/* Gallery Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Recent Bathroom Transformations
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See some of our stunning bathroom remodels from around the
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

        {/* Bathroom Types / Pricing */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Bathroom Remodeling by Type
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Investment ranges vary based on scope, materials, and
                complexity. Here is what to expect for each type.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {bathroomTypes.map((item) => (
                <div
                  key={item.type}
                  className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
                >
                  <Droplets className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {item.type}
                  </h3>
                  <p className="text-2xl font-bold text-primary mb-4">
                    {item.range}
                  </p>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready for Your Dream Bathroom?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Schedule a free in-home consultation with our bathroom remodeling
              specialists. We&apos;ll design the perfect spa-like retreat for
              your home.
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

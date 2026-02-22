import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/site/Header"
import { Footer } from "@/components/site/Footer"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  ArrowRight,
  Phone,
  Users,
  Home,
  DollarSign,
  CheckCircle,
  Star,
  ChefHat,
  Bath,
  Layers,
  Fence,
  Building2,
  HardHat,
  Footprints,
} from "lucide-react"

interface AreaData {
  name: string
  slug: string
  description: string
  longDescription: string
  population: string
  medianHomeValue: string
  popularServices: string[]
  testimonial: {
    quote: string
    author: string
    project: string
  }
}

const areaData: Record<string, AreaData> = {
  "mt-lebanon": {
    name: "Mt. Lebanon",
    slug: "mt-lebanon",
    description: "South Hills premium community known for top-rated schools and beautiful neighborhoods.",
    longDescription:
      "Mt. Lebanon is one of Pittsburgh's most sought-after communities, known for its walkable downtown, excellent school district, and charming residential streets. Homeowners here value quality and attention to detail, which is exactly what ABK Unlimited delivers. From updating historic kitchens to building modern additions that blend seamlessly with existing architecture, we understand the unique character of Mt. Lebanon homes.",
    population: "33,137",
    medianHomeValue: "$310,000",
    popularServices: ["Kitchen Remodeling", "Bathroom Remodeling", "Basement Finishing", "Home Additions"],
    testimonial: {
      quote: "ABK completely transformed our 1940s kitchen into a modern masterpiece while keeping the charm of our Mt. Lebanon colonial. Incredible work.",
      author: "Sarah M.",
      project: "Kitchen Remodel",
    },
  },
  "bethel-park": {
    name: "Bethel Park",
    slug: "bethel-park",
    description: "Family-friendly South Hills community with established and growing neighborhoods.",
    longDescription:
      "Bethel Park offers the perfect blend of suburban comfort and community spirit. With a mix of mid-century homes and newer developments, our team handles everything from full basement finishing to outdoor deck builds. Bethel Park families love how we help them maximize their living space without the cost and hassle of moving.",
    population: "32,313",
    medianHomeValue: "$210,000",
    popularServices: ["Basement Finishing", "Deck Building", "Bathroom Remodeling", "Flooring Installation"],
    testimonial: {
      quote: "Our basement went from a dark storage area to a beautiful family room with a wet bar. The kids love it, and so do we. ABK was professional from day one.",
      author: "Tom & Julie R.",
      project: "Basement Finishing",
    },
  },
  "upper-st-clair": {
    name: "Upper St. Clair",
    slug: "upper-st-clair",
    description: "Upscale residential community with high-end homes and award-winning schools.",
    longDescription:
      "Upper St. Clair homeowners expect the best, and ABK Unlimited consistently delivers. This upscale community features spacious homes that benefit from luxury kitchen renovations, spa-inspired bathroom remodels, and custom outdoor living spaces. We use premium materials and meticulous craftsmanship to match the high standards of Upper St. Clair properties.",
    population: "19,229",
    medianHomeValue: "$420,000",
    popularServices: ["Kitchen Remodeling", "Bathroom Remodeling", "Home Additions", "Custom Homes"],
    testimonial: {
      quote: "We interviewed five contractors and chose ABK Unlimited. Best decision we made. Our master bathroom is now a true spa retreat.",
      author: "Dr. Karen L.",
      project: "Master Bathroom Remodel",
    },
  },
  sewickley: {
    name: "Sewickley",
    slug: "sewickley",
    description: "Historic riverfront village with character-filled homes and a vibrant downtown.",
    longDescription:
      "Sewickley's historic charm demands a contractor who respects architectural heritage while delivering modern functionality. ABK Unlimited has extensive experience working with older homes, ensuring updates enhance rather than compromise the character that makes Sewickley properties so special. From period-appropriate kitchens to seamless additions, we blend old and new beautifully.",
    population: "3,827",
    medianHomeValue: "$385,000",
    popularServices: ["Kitchen Remodeling", "Home Additions", "Hardscaping", "Bathroom Remodeling"],
    testimonial: {
      quote: "Updating a century-old home is tricky, but ABK nailed it. Our new addition looks like it was always part of the house. Remarkable attention to detail.",
      author: "James & Linda W.",
      project: "Home Addition",
    },
  },
  "moon-township": {
    name: "Moon Township",
    slug: "moon-township",
    description: "Growing western suburb near Pittsburgh International Airport.",
    longDescription:
      "Moon Township is a rapidly growing community with a diverse mix of housing. Located near the airport, it attracts families and professionals who want quality homes without city prices. ABK Unlimited helps Moon Township homeowners add value to their properties with smart remodeling choices, from kitchen updates that boost resale value to outdoor decks that expand livable space.",
    population: "24,185",
    medianHomeValue: "$240,000",
    popularServices: ["Deck Building", "Kitchen Remodeling", "Basement Finishing", "Paving"],
    testimonial: {
      quote: "ABK built us an amazing composite deck with built-in lighting. It's become our favorite room in the house -- even though it's outside! Highly recommend.",
      author: "Mike C.",
      project: "Custom Deck Build",
    },
  },
  robinson: {
    name: "Robinson",
    slug: "robinson",
    description: "Commercial and residential hub with convenient access throughout the west suburbs.",
    longDescription:
      "Robinson Township sits at a crossroads of convenience, offering easy access to highways and amenities. The area features a growing mix of residential neighborhoods alongside commercial development. ABK Unlimited handles both residential remodels and light commercial construction in Robinson, bringing the same quality and professionalism to every project.",
    population: "14,416",
    medianHomeValue: "$225,000",
    popularServices: ["Kitchen Remodeling", "Bathroom Remodeling", "Flooring Installation", "Outdoor Firepits"],
    testimonial: {
      quote: "Quick, clean, and professional. ABK installed new flooring throughout our entire first floor in just four days. Looks absolutely beautiful.",
      author: "Donna K.",
      project: "Flooring Installation",
    },
  },
  "cranberry-township": {
    name: "Cranberry Township",
    slug: "cranberry-township",
    description: "Northern growth corridor with newer developments and upscale communities.",
    longDescription:
      "Cranberry Township is one of the fastest-growing communities in the Pittsburgh region, with modern developments and upscale neighborhoods. Even newer homes benefit from ABK Unlimited's services, whether it's a custom kitchen upgrade, a finished basement for growing families, or a luxury outdoor living space. We also build custom homes in Cranberry's newest developments.",
    population: "32,006",
    medianHomeValue: "$360,000",
    popularServices: ["Custom Homes", "Kitchen Remodeling", "Deck Building", "Home Additions"],
    testimonial: {
      quote: "ABK built our custom home in Cranberry from the ground up. The attention to detail and communication throughout the entire process was outstanding.",
      author: "The Patterson Family",
      project: "Custom Home Build",
    },
  },
  wexford: {
    name: "Wexford",
    slug: "wexford",
    description: "North Hills community with established neighborhoods and strong property values.",
    longDescription:
      "Wexford, located in Pine and Marshall Townships, is a thriving North Hills community with well-maintained homes and strong property values. ABK Unlimited helps Wexford homeowners protect and increase their investment with high-quality remodeling work. From custom hardscaping that transforms your outdoor space to bathroom remodels that add luxury, we deliver results that last.",
    population: "10,753",
    medianHomeValue: "$340,000",
    popularServices: ["Bathroom Remodeling", "Hardscaping", "Basement Finishing", "Kitchen Remodeling"],
    testimonial: {
      quote: "After getting multiple quotes, ABK was the most thorough and reasonably priced. Our new patio and firepit area looks fantastic and they cleaned up perfectly when done.",
      author: "Greg S.",
      project: "Hardscaping & Firepit",
    },
  },
}

const serviceIcons: Record<string, typeof ChefHat> = {
  "Kitchen Remodeling": ChefHat,
  "Bathroom Remodeling": Bath,
  "Basement Finishing": Layers,
  "Deck Building": Fence,
  "Home Additions": Building2,
  "Custom Homes": HardHat,
  "Hardscaping": Layers,
  "Paving": Footprints,
  "Outdoor Firepits": Home,
  "Flooring Installation": Footprints,
}

export function generateStaticParams() {
  return [
    { slug: "mt-lebanon" },
    { slug: "bethel-park" },
    { slug: "upper-st-clair" },
    { slug: "sewickley" },
    { slug: "moon-township" },
    { slug: "robinson" },
    { slug: "cranberry-township" },
    { slug: "wexford" },
  ]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const area = areaData[slug]
  if (!area) return {}

  return {
    title: `${area.name} Home Remodeling | ABK Unlimited Pittsburgh`,
    description: `Professional home remodeling in ${area.name}, PA. Kitchen, bathroom, basement, deck, and more. Licensed & insured. Free estimates from ABK Unlimited.`,
    openGraph: {
      title: `${area.name} Home Remodeling | ABK Unlimited`,
      description: `Trusted contractor serving ${area.name} homeowners. ${area.description}`,
      url: `https://abkunlimited.com/service-areas/${slug}`,
    },
  }
}

export default async function ServiceAreaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const area = areaData[slug]

  if (!area) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-secondary overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <Link
                href="/service-areas"
                className="inline-flex items-center gap-1 text-primary text-sm font-medium mb-6 hover:underline"
              >
                <MapPin className="h-4 w-4" />
                All Service Areas
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-secondary-foreground mb-6">
                Home Remodeling in {area.name}
              </h1>
              <p className="text-xl text-secondary-foreground/80">
                {area.description}
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-6 mt-10">
                <div className="flex items-center gap-2 bg-secondary-foreground/10 px-4 py-2 rounded-full">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm text-secondary-foreground">
                    Pop. {area.population}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-secondary-foreground/10 px-4 py-2 rounded-full">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span className="text-sm text-secondary-foreground">
                    Median Home: {area.medianHomeValue}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-secondary-foreground/10 px-4 py-2 rounded-full">
                  <Star className="h-4 w-4 text-primary" />
                  <span className="text-sm text-secondary-foreground">
                    5.0 Star Rated
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About this area */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Remodeling Services in {area.name}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {area.longDescription}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/free-estimate">
                    <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Get a Free Estimate
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" asChild>
                    <a href="tel:+14129441683">
                      <Phone className="mr-2 h-5 w-5" />
                      (412) 944-1683
                    </a>
                  </Button>
                </div>
              </div>

              {/* Popular Services */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Popular Services in {area.name}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {area.popularServices.map((service) => {
                    const Icon = serviceIcons[service] || Home
                    const serviceSlug = service.toLowerCase().replace(/\s+/g, "-")
                    return (
                      <Link
                        key={service}
                        href={`/services/${serviceSlug}`}
                        className="group bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
                      >
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <h4 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                          {service}
                        </h4>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Local Testimonial */}
        <section className="py-20 bg-muted/50">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm text-center">
              <Star className="h-8 w-8 text-primary mx-auto mb-4" />
              <blockquote className="text-xl md:text-2xl text-foreground font-medium leading-relaxed mb-6">
                &ldquo;{area.testimonial.quote}&rdquo;
              </blockquote>
              <div>
                <p className="font-semibold text-foreground">{area.testimonial.author}</p>
                <p className="text-sm text-muted-foreground">
                  {area.testimonial.project} &mdash; {area.name}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* All Services Available */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                All Services Available in {area.name}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We offer our complete range of remodeling and construction services to {area.name} homeowners.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(serviceIcons).map(([service, Icon]) => {
                const serviceSlug = service.toLowerCase().replace(/\s+/g, "-")
                return (
                  <Link
                    key={service}
                    href={`/services/${serviceSlug}`}
                    className="flex items-center gap-3 bg-card rounded-lg border border-border p-4 hover:border-primary/30 transition-colors"
                  >
                    <Icon className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm font-medium text-foreground">{service}</span>
                    <CheckCircle className="h-4 w-4 text-green-500 ml-auto shrink-0" />
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl mb-4">
              Ready to Remodel in {area.name}?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Get your free, no-obligation estimate today. We&apos;ll visit your {area.name} home
              to discuss your project in person.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-estimate">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg px-8">
                  Get a Free Estimate
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

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
  Award,
  Layers,
  ArrowRight,
  Sparkles,
  Ruler,
  Eye,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hardscaping Services Pittsburgh | ABK Unlimited Patios, Walls & Walkways",
  description:
    "Custom hardscaping in Pittsburgh. Stone patios, retaining walls, outdoor kitchens, walkways & terracing. Licensed contractor with 5-star reviews. Free estimates. Call (412) 944-1683.",
  openGraph: {
    title: "Hardscaping Services | ABK Unlimited Pittsburgh",
    description:
      "Transform your outdoor space with custom stone patios, retaining walls, walkways, and outdoor kitchens built to last through Pittsburgh's four seasons.",
    url: "https://abkunlimited.com/services/hardscaping",
    type: "website",
  },
}

const features = [
  "Natural Stone Patios",
  "Retaining Walls & Terracing",
  "Custom Walkways & Pathways",
  "Outdoor Kitchen Spaces",
  "Seat Walls & Built-In Planters",
  "Drainage & Grading Solutions",
  "Steps & Stairways",
  "Landscape Lighting Integration",
]

const materialOptions = [
  {
    material: "Natural Flagstone",
    range: "$18 - $35 / sq ft",
    description:
      "Irregular, organic shapes create a timeless, elegant look. Bluestone, limestone, and sandstone options available. Each piece is unique — perfect for patios and walkways.",
    pros: ["Unique natural beauty", "Extremely durable", "Increases home value"],
  },
  {
    material: "Travertine Pavers",
    range: "$15 - $30 / sq ft",
    description:
      "Elegant natural stone with a smooth, tumbled finish. Stays cool underfoot making it ideal for pool decks and sun-exposed patios. Timeless Mediterranean aesthetic.",
    pros: ["Stays cool in sun", "Non-slip surface", "Classic elegance"],
  },
  {
    material: "Natural Fieldstone",
    range: "$12 - $25 / sq ft",
    description:
      "Rustic, organic appearance perfect for retaining walls, fire pits, and garden borders. Locally sourced options available for an authentic Pittsburgh landscape.",
    pros: ["Rustic character", "Locally sourced", "Great for walls"],
  },
  {
    material: "Concrete Block Systems",
    range: "$10 - $20 / sq ft",
    description:
      "Engineered interlocking blocks for retaining walls and structural hardscaping. Available in many colors and textures. Excellent for large-scale projects.",
    pros: ["Most economical", "Structural strength", "Many style options"],
  },
]

const galleryImages = [
  { src: "/hardscape-patio-outdoor-living.jpg", alt: "Natural stone patio with outdoor living space", label: "Stone Patio" },
  { src: "/stone-retaining-wall-plants.jpg", alt: "Stone retaining wall with integrated plantings", label: "Retaining Wall" },
  { src: "/flagstone-walkway-stone-path.jpg", alt: "Flagstone walkway through garden landscape", label: "Walkway" },
  { src: "/stone-steps-garden-landscape.jpg", alt: "Custom stone steps with landscape lighting", label: "Stone Steps" },
  { src: "/stone-path-wall-garden.jpg", alt: "Stone path alongside garden retaining wall", label: "Garden Path" },
  { src: "/outdoor-seating-zen-garden.jpg", alt: "Outdoor seating area with zen garden hardscape", label: "Seating Area" },
  { src: "/rustic-stone-wall-mixed.jpg", alt: "Rustic mixed stone wall construction detail", label: "Stonework Detail" },
  { src: "/stone-steps-forest-landscape.jpg", alt: "Stone steps ascending through a lush landscape", label: "Landscape Steps" },
]

const projectTypes = [
  {
    name: "Patio & Entertaining Spaces",
    description: "Multi-level stone patios with built-in seating, outdoor kitchens, and pergola foundations.",
    image: "/aerial-hardscape-patio-pool.jpg",
  },
  {
    name: "Retaining Walls",
    description: "Structural and decorative walls that manage slopes, create usable yard space, and prevent erosion.",
    image: "/stone-wall-with-grass.jpg",
  },
  {
    name: "Walkways & Entrances",
    description: "Welcoming front walkways, garden paths, and stepping stone installations that elevate curb appeal.",
    image: "/flagstone-walkway-stone-path.jpg",
  },
  {
    name: "Outdoor Kitchens",
    description: "Complete outdoor cooking and entertaining areas with stone counters, built-in grills, and bar seating.",
    image: "/outdoor-seating-patio-doorway.jpg",
  },
]

const faqs = [
  {
    q: "How long does a hardscaping project typically take?",
    a: "Most residential hardscaping projects take 1-3 weeks depending on scope. A simple patio can be completed in 5-7 days, while a full outdoor living space with retaining walls and kitchen may take 3-4 weeks.",
  },
  {
    q: "Do I need a permit for hardscaping in Pittsburgh?",
    a: "Retaining walls over 4 feet typically require a permit. Standard patios and walkways usually don't. We handle all permit requirements and ensure your project meets local building codes.",
  },
  {
    q: "How does Pittsburgh weather affect hardscaping?",
    a: "We account for Pittsburgh's freeze-thaw cycles in every design. Proper base preparation, drainage, and material selection prevent frost heave and ensure your hardscape lasts decades.",
  },
  {
    q: "What's the ROI on hardscaping?",
    a: "Professional hardscaping typically returns 50-75% at resale and significantly improves curb appeal. Outdoor living spaces are consistently ranked among the top home improvement investments.",
  },
  {
    q: "Can you work with my existing landscape?",
    a: "Absolutely. We design hardscaping that integrates seamlessly with existing landscaping, structures, and drainage patterns. We protect existing plants and features during construction.",
  },
  {
    q: "Do you offer a warranty on hardscaping work?",
    a: "Yes. All our hardscaping projects include a craftsmanship warranty. Materials carry manufacturer warranties of 20-lifetime depending on the product selected.",
  },
]

export default function HardscapingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/hardscape-patio-outdoor-living.jpg"
              alt="Custom stone patio hardscaping in Pittsburgh"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/40" />
          </div>
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              All Services
            </Link>
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-1.5 mb-6">
                <Layers className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Hardscaping</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Custom Hardscaping in{" "}
                <span className="text-primary">Pittsburgh</span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed mb-8">
                Stone patios, retaining walls, walkways, and outdoor kitchens
                built with precision craftsmanship. We transform ordinary
                yards into extraordinary outdoor living spaces.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/free-estimate">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
                  >
                    Get Free Estimate
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
                <a href="tel:+14129441683">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    (412) 944-1683
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Inline CTA — Design Consultation */}
        <section className="relative py-6 bg-gradient-to-r from-[#0a1a14] to-[#14664f] overflow-hidden">
          <div className="absolute inset-0 bg-[url('/stone-texture-detail-closeup.jpg')] opacity-10 bg-cover bg-center" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Sparkles className="h-5 w-5 text-[#4ade80]" />
              </div>
              <p className="text-white font-medium">
                Free 3D design rendering with every hardscaping project over $15,000
              </p>
            </div>
            <Link href="/free-estimate">
              <Button size="sm" className="bg-white text-[#0a1a14] hover:bg-white/90 font-semibold shrink-0">
                Claim Your Free Design
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                What We Build
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Complete Hardscaping Services
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Every project is custom-designed for your property, lifestyle, and budget.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="font-medium text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery — Masonry Grid */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Our Work
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Hardscaping Gallery
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Every stone placed with purpose. Browse our recent hardscaping projects across Greater Pittsburgh.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {galleryImages.map((img, i) => (
                <div
                  key={img.src}
                  className={`group relative overflow-hidden rounded-2xl ${
                    i === 0 || i === 5 ? "lg:col-span-2 lg:row-span-2" : ""
                  }`}
                >
                  <div className={`relative ${i === 0 || i === 5 ? "aspect-square" : "aspect-[4/3]"}`}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-white font-semibold text-sm">{img.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mid-page CTA — Before/After */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/stone-steps-forest-landscape.jpg"
              alt="Completed hardscaping project"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 to-secondary/70" />
          </div>
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="h-5 w-5 text-[#4ade80]" />
                <span className="text-sm font-semibold uppercase tracking-widest text-[#4ade80]">See the Difference</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Your Yard Has Untapped Potential
              </h2>
              <p className="text-white/70 text-lg mb-8">
                Most Pittsburgh yards sit unused 8 months a year. Our hardscaping extends your livable space outdoors — rain, shine, or snow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/free-estimate">
                  <Button size="lg" className="bg-[#4ade80] text-[#0a1a14] hover:bg-[#86efac] font-semibold shadow-lg">
                    <Ruler className="h-5 w-5 mr-2" />
                    Get a Free Site Visit
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    View Full Portfolio
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Project Types with Images */}
        <section className="py-20 bg-muted/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Hardscaping Project Types
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                From intimate garden paths to expansive outdoor living complexes.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {projectTypes.map((project) => (
                <div
                  key={project.name}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-foreground mb-3">{project.name}</h3>
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Materials & Pricing */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Materials & Pricing
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We work with premium materials to deliver lasting results.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {materialOptions.map((mat) => (
                <div
                  key={mat.material}
                  className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-foreground">{mat.material}</h3>
                    <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap">
                      {mat.range}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {mat.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {mat.pros.map((pro) => (
                      <span
                        key={pro}
                        className="inline-flex items-center gap-1 text-xs bg-muted rounded-full px-3 py-1"
                      >
                        <CheckCircle className="h-3 w-3 text-primary" />
                        {pro}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 bg-muted/50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Hardscaping FAQs
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-foreground">5.0 Google Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <span className="font-bold text-foreground">Best of Houzz 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="font-bold text-foreground">PA Licensed #PA163301</span>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/night-lit-patio-string-lights.jpg"
              alt="Beautifully lit outdoor patio at night"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a14]/95 via-[#0a1a14]/80 to-[#0a1a14]/60" />
          </div>
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Imagine Your Backyard,<br />Completely Transformed
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              From bare yard to breathtaking outdoor living space. Get a free on-site consultation with a 3D design preview of your future hardscape.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-estimate">
                <Button
                  size="lg"
                  className="bg-[#4ade80] text-[#0a1a14] hover:bg-[#86efac] shadow-lg font-semibold text-base px-8"
                >
                  Start Your Transformation
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <a href="tel:+14129441683">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
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
    </div>
  )
}

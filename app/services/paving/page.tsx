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
  ArrowRight,
  Timer,
  ShieldCheck,
  Droplets,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Paving Services Pittsburgh | ABK Unlimited Driveways, Patios & Walkways",
  description:
    "Professional paver installation in Pittsburgh. Interlocking driveways, stamped concrete patios, permeable pavers & pool decks. Licensed contractor. Free estimates. Call (412) 944-1683.",
  openGraph: {
    title: "Paving Services | ABK Unlimited Pittsburgh",
    description:
      "Upgrade your driveway, patio, and walkways with professional paving. Interlocking pavers, stamped concrete, and natural stone installed with precision.",
    url: "https://abkunlimited.com/services/paving",
    type: "website",
  },
}

const features = [
  "Interlocking Paver Driveways",
  "Stamped Concrete Patios",
  "Permeable Paver Systems",
  "Pool Deck Installations",
  "Cobblestone & Brick Accents",
  "Commercial Parking Areas",
  "Paver Restoration & Repair",
  "Custom Border & Inlay Designs",
]

const paverStyles = [
  {
    name: "Herringbone Pattern",
    description: "The gold standard for driveways. Interlocking 45 or 90-degree patterns create exceptional structural integrity and a timeless, sophisticated look.",
    best: "Driveways & high-traffic areas",
    image: "/herringbone-paver-pattern-detail.jpg",
  },
  {
    name: "Running Bond",
    description: "Classic offset brick pattern that creates a clean, linear aesthetic. Versatile enough for walkways, patios, and driveways with a traditional feel.",
    best: "Walkways & patios",
    image: "/brick-patio-herringbone-pattern.jpg",
  },
  {
    name: "Basketweave",
    description: "Alternating pairs of pavers create a woven texture that adds visual interest and old-world charm. Perfect for garden paths and patio accents.",
    best: "Garden paths & accents",
    image: "/paver-pattern-bricks-closeup.jpg",
  },
  {
    name: "Random Ashlar",
    description: "Multiple paver sizes laid in a seemingly random but carefully planned pattern. Creates a natural, organic look that mimics cut stone.",
    best: "Patios & large surfaces",
    image: "/stone-texture-detail-closeup.jpg",
  },
]

const galleryImages = [
  { src: "/paver-driveway-herringbone-pattern.jpg", alt: "Herringbone paver driveway installation", label: "Paver Driveway" },
  { src: "/herringbone-paver-pattern-detail.jpg", alt: "Close-up herringbone paver pattern detail", label: "Pattern Detail" },
  { src: "/brick-patio-herringbone-pattern.jpg", alt: "Brick patio with herringbone pattern", label: "Brick Patio" },
  { src: "/paver-patio-fire-pit-evening.jpg", alt: "Paver patio with fire pit at evening", label: "Fire Pit Patio" },
  { src: "/aerial-hardscape-patio-pool.jpg", alt: "Aerial view of paver patio with pool", label: "Pool Deck" },
  { src: "/pool-deck-aerial-view.jpg", alt: "Pool deck with pavers aerial view", label: "Pool Surround" },
  { src: "/paver-pattern-bricks-closeup.jpg", alt: "Paver brick pattern close-up texture", label: "Brick Texture" },
  { src: "/aerial-view-house-pool-patio.jpg", alt: "Aerial view of home with paver patio and pool", label: "Full Project" },
]

const materialPricing = [
  {
    material: "Interlocking Concrete Pavers",
    range: "$12 - $25 / sq ft",
    description: "The most popular choice. Available in hundreds of colors, shapes, and patterns. Durable, low-maintenance, and easily repairable.",
    pros: ["Highly durable", "Easy to repair", "Endless design options"],
  },
  {
    material: "Natural Stone Pavers",
    range: "$20 - $45 / sq ft",
    description: "Bluestone, travertine, limestone, and granite. Each piece is unique with natural color variation. Premium aesthetic for discerning homeowners.",
    pros: ["Premium look", "Unique character", "Long lifespan"],
  },
  {
    material: "Stamped Concrete",
    range: "$10 - $20 / sq ft",
    description: "Poured concrete textured and colored to mimic stone, brick, or slate. Cost-effective way to achieve a high-end look over large areas.",
    pros: ["Cost-effective", "Seamless surface", "Custom colors"],
  },
  {
    material: "Permeable Pavers",
    range: "$15 - $30 / sq ft",
    description: "Eco-friendly pavers designed to allow water drainage through the surface. Reduces runoff, manages stormwater, and may qualify for green incentives.",
    pros: ["Eco-friendly", "Manages stormwater", "May qualify for credits"],
  },
]

const faqs = [
  {
    q: "How long do paver driveways last?",
    a: "A properly installed paver driveway can last 25-50+ years. Unlike poured concrete or asphalt, individual pavers can be replaced if damaged, making them essentially a lifetime investment.",
  },
  {
    q: "Are pavers better than poured concrete?",
    a: "Pavers offer several advantages: they're more flexible (won't crack from settling), easier to repair (replace individual pavers vs. patching), more aesthetically versatile, and typically last longer.",
  },
  {
    q: "How long does paver installation take?",
    a: "A standard driveway takes 3-5 days. A patio or walkway typically takes 2-4 days. Larger projects with complex patterns may take 1-2 weeks. Weather can affect scheduling.",
  },
  {
    q: "Do pavers require maintenance?",
    a: "Minimal. We recommend annual polymeric sand refresh and occasional power washing. No sealing is required for most modern pavers, though it can enhance color and stain resistance.",
  },
  {
    q: "Can you match existing pavers on my property?",
    a: "In most cases, yes. We work with all major manufacturers and can source matching or complementary pavers. For older or discontinued styles, we can suggest beautiful alternatives that blend naturally.",
  },
  {
    q: "What about drainage and grading?",
    a: "Proper drainage is built into every project. We engineer the correct slope, install edge restraints, and can incorporate permeable pavers or channel drains where needed.",
  },
]

export default function PavingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/paver-driveway-herringbone-pattern.jpg"
              alt="Professional paver driveway installation in Pittsburgh"
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
                <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
                <span className="text-sm font-medium text-primary">Paving</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Professional Paving in{" "}
                <span className="text-primary">Pittsburgh</span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed mb-8">
                Interlocking pavers, stamped concrete, and natural stone
                installed with precision and artistry. Driveways, patios,
                walkways, and pool decks that elevate your property.
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

        {/* Value Props Bar */}
        <section className="py-6 bg-primary">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center gap-3 text-primary-foreground">
                <Timer className="h-5 w-5 shrink-0" />
                <span className="font-semibold text-sm">25-50 Year Lifespan</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-primary-foreground">
                <ShieldCheck className="h-5 w-5 shrink-0" />
                <span className="font-semibold text-sm">Individual Paver Warranty</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-primary-foreground">
                <Droplets className="h-5 w-5 shrink-0" />
                <span className="font-semibold text-sm">Permeable Options Available</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                What We Install
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Complete Paving Solutions
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                From driveways to pool decks, we install every type of paver surface.
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

        {/* Gallery */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Our Work
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Paving Gallery
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                From intricate patterns to grand driveways — precision in every paver.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {galleryImages.map((img, i) => (
                <div
                  key={img.src}
                  className={`group relative overflow-hidden rounded-2xl ${
                    i === 3 || i === 4 ? "lg:col-span-2 lg:row-span-2" : ""
                  }`}
                >
                  <div className={`relative ${i === 3 || i === 4 ? "aspect-square" : "aspect-[4/3]"}`}>
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

        {/* Mid CTA — Pattern Chooser */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a14] to-[#14664f]" />
          <div className="absolute inset-0 bg-[url('/herringbone-paver-pattern-detail.jpg')] opacity-15 bg-cover bg-center mix-blend-overlay" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Not sure which pattern is right?
              </h2>
              <p className="text-white/70 text-lg">
                Our design team will bring physical paver samples to your property so you can see colors and textures in your actual lighting and landscape.
              </p>
            </div>
            <Link href="/free-estimate" className="shrink-0">
              <Button size="lg" className="bg-white text-[#0a1a14] hover:bg-white/90 font-semibold shadow-xl px-8">
                Book a Free Sample Visit
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Pattern Styles with Images */}
        <section className="py-20 bg-muted/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Popular Paver Patterns
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                The pattern you choose defines the character of your space.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {paverStyles.map((style) => (
                <div
                  key={style.name}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={style.image}
                      alt={style.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {style.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {style.description}
                    </p>
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                      <CheckCircle className="h-3.5 w-3.5" />
                      Best for: {style.best}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Materials & Pricing
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Installed pricing includes materials, base preparation, and professional installation.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {materialPricing.map((mat) => (
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
                Paving FAQs
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

        {/* Trust */}
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
              src="/paver-patio-fire-pit-evening.jpg"
              alt="Beautiful paver patio with fire pit in the evening"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a14]/95 via-[#0a1a14]/80 to-[#0a1a14]/50" />
          </div>
          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Your Driveway Makes the<br />First Impression
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Cracked concrete and worn asphalt lower your home&apos;s value. Pavers add instant curb appeal that lasts a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-estimate">
                <Button
                  size="lg"
                  className="bg-[#4ade80] text-[#0a1a14] hover:bg-[#86efac] shadow-lg font-semibold text-base px-8"
                >
                  Get Your Free Estimate
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

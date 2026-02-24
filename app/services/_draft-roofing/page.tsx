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
  AlertTriangle,
  CloudRain,
  Thermometer,
  Wind,
  ChevronDown,
  Shield,
  DollarSign,
  Home,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Roofing Services Pittsburgh | ABK Unlimited General Contractor",
  description:
    "Expert roofing services in Pittsburgh. Asphalt shingles, metal roofing, flat/TPO, slate & tile. Storm damage repair, inspections & full replacements. Licensed & insured. Call (412) 944-1683.",
}

const features = [
  "Asphalt Shingle Roofing",
  "Metal Roof Installation",
  "Flat & TPO Roofing",
  "Slate & Tile Roofing",
  "Storm Damage Repair",
  "Roof Inspections",
  "Gutter Installation",
  "Insurance Claim Assistance",
]

const roofingTypes = [
  {
    type: "Asphalt Shingles",
    range: "$8,000 - $15,000",
    description:
      "The most popular choice for Pittsburgh homes. Available in architectural and three-tab styles with 25-50 year warranties. Excellent wind and impact resistance for our climate.",
    lifespan: "25-50 years",
  },
  {
    type: "Metal Roofing",
    range: "$15,000 - $30,000",
    description:
      "Standing seam and metal shingle options that excel in Pittsburgh's weather. Exceptional durability, energy efficiency, and a modern aesthetic that lasts decades.",
    lifespan: "40-70 years",
  },
  {
    type: "Flat / TPO Roofing",
    range: "$10,000 - $20,000",
    description:
      "Ideal for flat and low-slope roofs on homes and commercial buildings. TPO and EPDM membranes provide reliable waterproofing and energy-reflective surfaces.",
    lifespan: "20-30 years",
  },
  {
    type: "Slate & Tile",
    range: "$25,000 - $50,000",
    description:
      "The ultimate premium roofing material. Natural slate and clay tile offer unmatched beauty and can last over a century. Perfect for historic homes and luxury properties.",
    lifespan: "75-150+ years",
  },
]

const costFactors = [
  {
    icon: Home,
    title: "Roof Size & Pitch",
    description:
      "Larger roofs and steeper pitches require more materials and labor. Most Pittsburgh homes range from 1,500-3,000 square feet of roof area.",
  },
  {
    icon: Shield,
    title: "Material Selection",
    description:
      "Materials range from budget-friendly 3-tab shingles to premium slate. Your choice dramatically impacts both cost and longevity.",
  },
  {
    icon: DollarSign,
    title: "Tear-Off & Disposal",
    description:
      "Removing old roofing materials adds to the cost. Most municipalities require full tear-off if there are already two layers of shingles.",
  },
  {
    icon: AlertTriangle,
    title: "Structural Repairs",
    description:
      "Damaged decking, rafters, or fascia boards discovered during tear-off will need to be repaired before new roofing can be installed.",
  },
]

const warningSignsList = [
  "Shingles that are curling, cracking, or missing",
  "Granules collecting in your gutters",
  "Daylight visible through roof boards in the attic",
  "Water stains or leaks on interior ceilings",
  "Sagging areas on the roof surface",
  "Your roof is over 20 years old",
  "Moss or algae growth on shingles",
  "Rising energy bills (poor insulation)",
]

const pittsburghClimatePoints = [
  {
    icon: CloudRain,
    title: "Heavy Rain & Snow",
    description:
      "Pittsburgh averages 38 inches of rain and 28 inches of snow annually. Your roof must be engineered to handle heavy precipitation and ice dam formation.",
  },
  {
    icon: Thermometer,
    title: "Freeze-Thaw Cycles",
    description:
      "Our region experiences over 100 freeze-thaw cycles per year, which can crack and deteriorate roofing materials that aren't designed for our climate.",
  },
  {
    icon: Wind,
    title: "Wind & Storm Damage",
    description:
      "Severe thunderstorms and high winds are common in Western PA. We install roofing systems rated for 110+ mph winds with proper flashing and sealing.",
  },
]

const faqs = [
  {
    question: "How long does a roof replacement take?",
    answer:
      "Most residential roof replacements in Pittsburgh are completed in 1-3 days, depending on the size of your home, the roofing material selected, and weather conditions. We work efficiently while never cutting corners on quality.",
  },
  {
    question: "Does ABK Unlimited help with insurance claims?",
    answer:
      "Yes! We have extensive experience working with insurance companies on storm damage claims. We'll document the damage, meet with your adjuster, and ensure you receive fair compensation for necessary repairs or replacement.",
  },
  {
    question: "What is the best roofing material for Pittsburgh weather?",
    answer:
      "For most Pittsburgh homes, we recommend architectural asphalt shingles (like GAF Timberline HDZ) for the best balance of durability, weather resistance, and value. Metal roofing is an excellent premium option that handles our freeze-thaw cycles exceptionally well.",
  },
  {
    question: "How do I know if I need a roof repair or full replacement?",
    answer:
      "If your roof is under 15 years old and the damage is localized (a few missing shingles, a small leak), a repair is usually sufficient. If your roof is over 20 years old, has widespread damage, or you're experiencing multiple leaks, a full replacement is the better investment.",
  },
  {
    question: "Do you offer financing for roof replacement?",
    answer:
      "Yes, we offer flexible financing options to make your roof replacement affordable. We partner with several lenders to provide low-interest and no-interest payment plans. Ask us about current financing promotions during your free estimate.",
  },
  {
    question: "What warranties do you offer on roofing work?",
    answer:
      "We provide a comprehensive workmanship warranty on all our roofing installations, plus the manufacturer's material warranty (which ranges from 25 years to lifetime depending on the product). GAF-certified installations come with enhanced warranty coverage.",
  },
]

export default function RoofingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RoofingContractor",
              name: "ABK Unlimited",
              description:
                "Expert roofing services in Pittsburgh including asphalt shingles, metal roofing, flat/TPO, slate & tile. Storm damage repair, inspections, and full replacements.",
              url: "https://abkunlimited.com/services/roofing",
              telephone: "+1-412-944-1683",
              email: "abk.unlimited@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "138 Balver Ave",
                addressLocality: "Pittsburgh",
                addressRegion: "PA",
                postalCode: "15205",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "40.4406",
                longitude: "-79.9959",
              },
              areaServed: [
                { "@type": "City", name: "Pittsburgh" },
                { "@type": "City", name: "Mount Lebanon" },
                { "@type": "City", name: "Bethel Park" },
                { "@type": "City", name: "Upper Saint Clair" },
                { "@type": "City", name: "Sewickley" },
                { "@type": "City", name: "Moon Township" },
                { "@type": "City", name: "Robinson Township" },
                { "@type": "City", name: "Cranberry Township" },
              ],
              priceRange: "$8,000 - $50,000+",
              openingHours: "Mo-Fr 07:00-18:00, Sa 08:00-14:00",
              hasCredential: {
                "@type": "EducationalOccupationalCredential",
                credentialCategory: "license",
                name: "Pennsylvania Home Improvement Contractor License #PA163301",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                reviewCount: "200",
                bestRating: "5",
              },
              sameAs: [
                "https://www.facebook.com/profile.php?id=100065571905770",
                "https://www.houzz.com/professionals/general-contractors/abk-unlimited-pfvwus-pf~222150373",
              ],
            }),
          }}
        />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-secondary">
          <div className="absolute inset-0">
            <Image
              src="/custom-new-construction-home-exterior.jpg"
              alt="Roofing services Pittsburgh"
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
                Roofing Services in Pittsburgh
              </h1>
              <p className="text-xl text-secondary-foreground/80 mb-8 leading-relaxed">
                Your roof is your home&apos;s first line of defense. From storm
                damage repairs to complete roof replacements, ABK Unlimited
                delivers expert roofing solutions that protect your family and
                your investment for decades.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/free-estimate">
                  <Button size="lg" className="text-lg px-8">
                    Get Free Roof Inspection
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
                <span className="text-2xl font-bold">1,500+ Roofs</span>
                <span className="text-primary-foreground/80 text-sm">
                  Installed & Repaired
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
                Complete Roofing Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We offer a full range of roofing services for residential and
                commercial properties throughout Greater Pittsburgh.
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

        {/* Roofing Types Grid */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Roofing Materials & Pricing
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We install all major roofing systems. Pricing is for a typical
                2,000 sq ft Pittsburgh-area home.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {roofingTypes.map((roof) => (
                <div
                  key={roof.type}
                  className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {roof.type}
                  </h3>
                  <p className="text-2xl font-bold text-primary mb-1">
                    {roof.range}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Lifespan: {roof.lifespan}
                  </p>
                  <p className="text-muted-foreground">{roof.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cost Factors Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                What Affects Roofing Costs?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Several factors influence the total cost of your roof
                replacement. Understanding these helps you plan your budget.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {costFactors.map((factor) => (
                <div
                  key={factor.title}
                  className="flex gap-4 p-6 bg-card border border-border rounded-2xl"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <factor.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {factor.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {factor.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pittsburgh Climate Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Roofing for Pittsburgh&apos;s Climate
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Pittsburgh&apos;s weather puts roofs to the test. We install
                roofing systems specifically engineered for Western
                Pennsylvania&apos;s demanding conditions.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pittsburghClimatePoints.map((point) => (
                <div
                  key={point.title}
                  className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <point.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Warning Signs Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-amber-600" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Warning Signs You Need a New Roof
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Don&apos;t wait until a small problem becomes a costly
                  emergency. Watch for these warning signs.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {warningSignsList.map((sign) => (
                  <div
                    key={sign}
                    className="flex items-center gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200"
                  >
                    <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                    <span className="text-foreground">{sign}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <p className="text-muted-foreground mb-4">
                  If you notice any of these signs, schedule a free roof
                  inspection today.
                </p>
                <Link href="/free-estimate">
                  <Button size="lg" className="text-lg px-8">
                    Schedule Free Inspection
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Answers to the most common roofing questions from Pittsburgh
                homeowners.
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group bg-card border border-border rounded-2xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="text-lg font-semibold text-foreground pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Roofing Projects
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See the quality craftsmanship in our recent roofing
                installations across the Pittsburgh area.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden group">
                <Image
                  src="/custom-new-construction-home-exterior.jpg"
                  alt="New roof installation on custom home"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden group">
                <Image
                  src="/professional-contractor-team-working-on-home-renov.jpg"
                  alt="Professional roofing team at work"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden group">
                <Image
                  src="/construction-team-working-on-residential-project.jpg"
                  alt="Roofing construction team on residential project"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden group">
                <Image
                  src="/home-addition-seamless-architecture.jpg"
                  alt="Completed roof on home addition"
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
              Protect Your Home With a New Roof
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Schedule a free roof inspection and get a detailed estimate.
              Don&apos;t wait for a leak to become a major problem. We offer
              financing options and work with all insurance companies.
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

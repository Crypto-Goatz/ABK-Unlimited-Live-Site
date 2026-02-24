"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/site/Header"
import { Footer } from "@/components/site/Footer"
import { EstimateForm } from "./EstimateForm"
import { Button } from "@/components/ui/button"
import {
  Clock,
  FileText,
  Shield,
  Users,
  Phone,
  CheckCircle,
  Star,
  Award,
  ChevronDown,
  ArrowRight,
  Zap,
  Lock,
  MapPin,
} from "lucide-react"

const stats = [
  { value: "500+", label: "Projects Completed" },
  { value: "5.0", label: "Google Rating", hasStar: true },
  { value: "18+", label: "Years Experience" },
  { value: "98%", label: "Client Satisfaction" },
]

const benefits = [
  {
    icon: Clock,
    title: "Same-Day Response",
    description: "We respond to every estimate request within the same business day.",
  },
  {
    icon: FileText,
    title: "Detailed Written Estimate",
    description: "Receive a comprehensive, itemized estimate — no hidden costs.",
  },
  {
    icon: Shield,
    title: "Zero Obligation",
    description: "Completely free with absolutely zero pressure to commit.",
  },
  {
    icon: Users,
    title: "In-Person Consultation",
    description: "We visit your home to understand your vision firsthand.",
  },
]

const whatToExpect = [
  {
    step: 1,
    title: "Submit Your Request",
    description: "Fill out the form with your project details.",
  },
  {
    step: 2,
    title: "We Review & Call",
    description: "Our team contacts you to schedule a visit.",
  },
  {
    step: 3,
    title: "On-Site Consultation",
    description: "We visit, measure, and discuss your vision.",
  },
  {
    step: 4,
    title: "Receive Your Estimate",
    description: "Detailed, written estimate with timeline.",
  },
]

const testimonials = [
  {
    name: "Sarah M.",
    location: "Mt. Lebanon",
    image: "/woman-homeowner-portrait.jpg",
    quote: "ABK transformed our outdated kitchen into a showpiece. The attention to detail was incredible, and they finished ahead of schedule!",
    project: "Kitchen Remodel",
  },
  {
    name: "David & Sarah K.",
    location: "Moon Township",
    image: "/couple-homeowners-portrait.jpg",
    quote: "After getting burned by another contractor, ABK was completely different — transparent pricing, regular updates, and the result exceeded our expectations.",
    project: "Basement Finishing",
  },
  {
    name: "Greg S.",
    location: "Wexford",
    image: "/man-homeowner-portrait.jpg",
    quote: "After getting multiple quotes, ABK was the most thorough and reasonably priced. Our patio and firepit look fantastic and they cleaned up perfectly.",
    project: "Hardscaping & Firepit",
  },
]

const faqs = [
  {
    q: "How long does it take to get my estimate?",
    a: "We respond to every request within the same business day. After an on-site visit, you'll receive a detailed written estimate within 2-3 business days.",
  },
  {
    q: "Is the estimate really free?",
    a: "Yes, 100% free with zero obligation. We believe in earning your business through quality work and fair pricing, not pressure tactics.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve the entire Greater Pittsburgh area including Mt. Lebanon, Upper St. Clair, Bethel Park, Moon Township, Sewickley, Cranberry, and more.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Absolutely. ABK Unlimited is fully licensed, insured, and bonded in the state of Pennsylvania. We carry comprehensive liability and workers' compensation insurance.",
  },
  {
    q: "Can I get an estimate for multiple projects?",
    a: "Yes! Select all the services you're interested in on the form. Many homeowners bundle projects to save on costs and reduce overall disruption.",
  },
]

export default function FreeEstimatePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [showMobileCTA, setShowMobileCTA] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowMobileCTA(window.scrollY > 600)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToForm = () => {
    document.getElementById("estimate-form")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero — Full-width with background image */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/before-and-after-kitchen-remodel-white-cabinets-qu.jpg"
              alt="Kitchen transformation by ABK Unlimited"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/85 to-secondary/70" />
          </div>
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                {/* Urgency Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full mb-6">
                  <Zap className="h-4 w-4 text-primary animate-pulse" />
                  <span className="text-primary text-sm font-semibold">Spring 2026 Slots Filling Fast</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Get Your <span className="text-primary">Free Estimate</span> Today
                </h1>
                <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-xl">
                  Tell us about your project and receive a detailed, no-obligation estimate within 24 hours. Pittsburgh&apos;s most trusted contractor since 2008.
                </p>

                {/* Quick trust signals */}
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <div className="flex items-center gap-1.5 text-white/70 text-sm">
                    <Shield className="h-4 w-4 text-primary" />
                    Licensed &amp; Insured
                  </div>
                  <div className="flex items-center gap-1.5 text-white/70 text-sm">
                    <Award className="h-4 w-4 text-primary" />
                    A+ BBB Rating
                  </div>
                  <div className="flex items-center gap-1.5 text-white/70 text-sm">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    5.0 Google
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    onClick={scrollToForm}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 shadow-lg shadow-primary/25"
                  >
                    Get Free Estimate
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 bg-transparent text-lg px-8"
                    asChild
                  >
                    <a href="tel:+14129441683">
                      <Phone className="mr-2 h-5 w-5" />
                      (412) 944-1683
                    </a>
                  </Button>
                </div>
              </div>

              {/* Before/After Preview Card */}
              <div className="hidden lg:block">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/60 text-sm font-medium uppercase tracking-wider">Recent Transformation</span>
                    <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full">Before &amp; After</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                      <Image
                        src="/kitchen-remodeling-before-after-transformation.jpg"
                        alt="Kitchen before renovation"
                        fill
                        className="object-cover object-left"
                      />
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 rounded text-white text-xs font-medium">Before</div>
                    </div>
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                      <Image
                        src="/modern-white-kitchen-remodel-quartz-countertops.jpg"
                        alt="Kitchen after renovation by ABK"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-primary/80 rounded text-white text-xs font-medium">After</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <Image
                      src="/couple-homeowners-portrait.jpg"
                      alt="Happy homeowner"
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="text-white text-sm font-medium">&quot;Exceeded our expectations!&quot;</p>
                      <p className="text-white/50 text-xs">— Sarah M., Mt. Lebanon</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-6 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.1)_10px,rgba(255,255,255,0.1)_20px)]" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-2xl md:text-3xl font-bold text-primary-foreground">{stat.value}</span>
                    {stat.hasStar && <Star className="h-5 w-5 text-yellow-300 fill-yellow-300" />}
                  </div>
                  <span className="text-primary-foreground/70 text-sm">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Bar */}
        <section className="py-8 bg-muted/50 border-b border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <benefit.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{benefit.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content — Form + Sidebar */}
        <section id="estimate-form" className="py-16 scroll-mt-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Section heading */}
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Free &amp; No Obligation
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Tell Us About Your Project
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                The more details you provide, the more accurate your estimate will be. We&apos;ll get back to you within 24 hours.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
              {/* Form — Left (spans 2 cols) */}
              <div className="lg:col-span-2">
                <EstimateForm />

                {/* Security assurance below form */}
                <div className="mt-4 flex items-center justify-center gap-6 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5" />
                    SSL Encrypted
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5" />
                    Your info is never shared
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5" />
                    No spam, ever
                  </span>
                </div>
              </div>

              {/* Sidebar — Right */}
              <div className="space-y-6">
                {/* What to Expect */}
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-foreground mb-6">What to Expect</h3>
                  <div className="space-y-5">
                    {whatToExpect.map((item, index) => (
                      <div key={item.step} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                            {item.step}
                          </div>
                          {index < whatToExpect.length - 1 && (
                            <div className="w-0.5 h-full bg-primary/20 mt-1" />
                          )}
                        </div>
                        <div className="pb-2">
                          <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                          <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mini Testimonial */}
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-foreground">5.0</span>
                  </div>
                  <blockquote className="text-sm text-muted-foreground italic leading-relaxed mb-4">
                    &quot;ABK transformed our outdated kitchen into a showpiece. The attention to detail was incredible, and they finished ahead of schedule!&quot;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <Image
                      src="/woman-homeowner-portrait.jpg"
                      alt="Sarah M."
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Sarah M.</p>
                      <p className="text-xs text-muted-foreground">Mt. Lebanon, PA</p>
                    </div>
                  </div>
                </div>

                {/* Guarantees */}
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-foreground mb-4">Our Guarantees</h3>
                  <ul className="space-y-3">
                    {[
                      "No hidden fees or surprise costs",
                      "Price match on comparable quotes",
                      "100% satisfaction commitment",
                      "2-year workmanship warranty",
                      "Licensed, insured & bonded",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Contact */}
                <div className="bg-secondary rounded-2xl p-6 text-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.3),transparent_70%)]" />
                  <div className="relative">
                    <Phone className="h-8 w-8 text-white mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-white mb-2">Prefer to Talk?</h3>
                    <p className="text-white/70 text-sm mb-4">
                      Call us directly for an immediate consultation.
                    </p>
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 w-full shadow-lg"
                      asChild
                    >
                      <a href="tel:+14129441683">
                        <Phone className="mr-2 h-4 w-4" />
                        (412) 944-1683
                      </a>
                    </Button>
                    <p className="text-white/50 text-xs mt-3">
                      Mon-Fri 7am-6pm, Sat 8am-2pm
                    </p>
                  </div>
                </div>

                {/* Service Area */}
                <div className="bg-muted/50 rounded-2xl border border-border p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-foreground text-sm">Service Area</h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Greater Pittsburgh including Mt. Lebanon, Upper St. Clair, Bethel Park, Moon Township, Sewickley, Cranberry Township, Wexford, Robinson &amp; more.
                  </p>
                  <Link href="/service-areas" className="text-xs text-primary hover:underline font-medium mt-2 inline-block">
                    View all service areas →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof — Testimonials */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Trusted by Pittsburgh Homeowners
              </h2>
              <p className="text-muted-foreground text-lg">
                See why hundreds of homeowners choose ABK Unlimited for their projects.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex mb-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground text-sm leading-relaxed mb-6 min-h-[80px]">
                    &quot;{t.quote}&quot;
                  </blockquote>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={44}
                      height={44}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-foreground text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.location} — {t.project}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/testimonials">
                <Button variant="outline" className="bg-transparent">
                  Read More Reviews
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Before/After Showcase */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                See the ABK Difference
              </h2>
              <p className="text-muted-foreground text-lg">
                Real transformations from Pittsburgh homeowners just like you.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  before: "/kitchen-remodeling-before-after-transformation.jpg",
                  after: "/modern-white-kitchen-remodel-quartz-countertops.jpg",
                  title: "Kitchen Transformation",
                  location: "Mt. Lebanon",
                },
                {
                  before: "/basement-transformation-before-after.jpg",
                  after: "/finished-basement-home-theater-with-bar.jpg",
                  title: "Basement Finishing",
                  location: "Bethel Park",
                },
                {
                  before: "/contractor-measuring-and-planning-home-renovation.jpg",
                  after: "/luxury-master-bathroom-renovation-walk-in-shower.jpg",
                  title: "Master Bath Remodel",
                  location: "Upper St. Clair",
                },
              ].map((project) => (
                <div key={project.title} className="group">
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                      <Image src={project.before} alt={`${project.title} before`} fill className="object-cover" />
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded text-white text-xs font-medium">
                        Before
                      </div>
                    </div>
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                      <Image src={project.after} alt={`${project.title} after`} fill className="object-cover" />
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-primary/80 backdrop-blur-sm rounded text-white text-xs font-medium">
                        After
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.location}, PA</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button onClick={scrollToForm} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg text-lg px-8">
                Start Your Transformation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground text-lg">
                Everything you need to know about getting your free estimate.
              </p>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl border border-border overflow-hidden transition-shadow hover:shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-semibold text-foreground pr-4">{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-200 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      openFaq === index ? "max-h-40 pb-5" : "max-h-0"
                    }`}
                  >
                    <p className="px-5 text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/professional-contractor-team-portrait-in-front-of-.jpg"
              alt="ABK Unlimited team"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 to-secondary/80" />
          </div>
          <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Home?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join hundreds of Pittsburgh homeowners who trusted ABK Unlimited to bring their vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={scrollToForm}
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 shadow-lg shadow-primary/25"
              >
                Get Your Free Estimate
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent text-lg px-8"
                asChild
              >
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

      {/* Sticky Mobile CTA */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-transform duration-300 ${
          showMobileCTA ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-card/95 backdrop-blur-md border-t border-border px-4 py-3 flex items-center gap-3 shadow-2xl">
          <Button
            onClick={scrollToForm}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
          >
            Get Free Estimate
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="shrink-0" asChild>
            <a href="tel:+14129441683">
              <Phone className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

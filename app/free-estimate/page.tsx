"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/site/Header"
import { Footer } from "@/components/site/Footer"
import { Button } from "@/components/ui/button"
import {
  Clock,
  FileText,
  Shield,
  Users,
  Phone,
  CheckCircle,
  ArrowRight,
  Loader2,
  Star,
  Award,
  ThumbsUp,
} from "lucide-react"

const benefits = [
  {
    icon: Clock,
    title: "Same-Day Response",
    description: "We respond to every estimate request within the same business day.",
  },
  {
    icon: FileText,
    title: "Detailed Written Estimate",
    description: "Receive a comprehensive, itemized estimate with no hidden costs.",
  },
  {
    icon: Shield,
    title: "No Obligation",
    description: "Our estimates are completely free with zero pressure to commit.",
  },
  {
    icon: Users,
    title: "In-Person Consultation",
    description: "We visit your home to understand your project firsthand.",
  },
]

const whatToExpect = [
  {
    step: 1,
    title: "Submit Your Request",
    description: "Fill out the form with your project details and contact information.",
  },
  {
    step: 2,
    title: "We Review & Call",
    description: "Our team reviews your project and contacts you to schedule a visit.",
  },
  {
    step: 3,
    title: "On-Site Consultation",
    description: "We visit your home, take measurements, and discuss your vision in detail.",
  },
  {
    step: 4,
    title: "Receive Your Estimate",
    description: "Get a detailed, written estimate with timeline and material specifications.",
  },
]

const projectTypes = [
  "Kitchen Remodeling",
  "Bathroom Remodeling",
  "Basement Finishing",
  "Deck Building",
  "Home Addition",
  "Flooring Installation",
  "Roofing",
  "Custom Home",
  "Other",
]

export default function FreeEstimatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("projectType"),
      message: formData.get("message"),
      source: "free-estimate",
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit")
      }

      setIsSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 bg-secondary overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6">
                No Obligation
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-secondary-foreground mb-4">
                Get Your Free Estimate
              </h1>
              <p className="text-xl text-secondary-foreground/80">
                Tell us about your project and we&apos;ll provide a detailed estimate within 24 hours.
                No obligation, no pressure.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Bar */}
        <section className="py-8 bg-muted/50 border-b border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <benefit.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{benefit.title}</h3>
                    <p className="text-xs text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content - 3 Column Layout */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Form Area - Left (spans 2 cols) */}
              <div className="lg:col-span-2">
                {isSuccess ? (
                  <div className="bg-card rounded-2xl border border-border p-8 shadow-sm text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Request Received!</h2>
                    <p className="text-muted-foreground mb-4">
                      Thank you for requesting a free estimate from ABK Unlimited!
                    </p>
                    <p className="text-muted-foreground mb-6">
                      Our team will review your project details and get back to you within 24 hours with next steps.
                    </p>
                    <Link href="/">
                      <Button>Return to Home</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-foreground mb-2">Request Your Estimate</h2>
                    <p className="text-muted-foreground mb-8">
                      Fill out the form below and we&apos;ll get back to you within 24 hours.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                          {error}
                        </div>
                      )}

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium text-foreground">
                            Full Name *
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            placeholder="John Smith"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium text-foreground">
                            Email Address *
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium text-foreground">
                            Phone Number *
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            placeholder="(412) 555-1234"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="projectType" className="text-sm font-medium text-foreground">
                            Project Type *
                          </label>
                          <select
                            id="projectType"
                            name="projectType"
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <option value="">Select a project type...</option>
                            {projectTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-foreground">
                          Project Details
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[120px]"
                          placeholder="Tell us about your project goals, timeline, budget, and any specific requirements..."
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Estimate Request
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  </div>
                )}
              </div>

              {/* Sidebar - Right */}
              <div className="space-y-6">
                {/* What to Expect */}
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-foreground mb-6">What to Expect</h3>
                  <div className="space-y-6">
                    {whatToExpect.map((item) => (
                      <div key={item.step} className="flex gap-4">
                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Guarantees */}
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-foreground mb-4">Our Guarantees</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span className="text-foreground">No hidden fees or surprise costs</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span className="text-foreground">Price match on comparable quotes</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span className="text-foreground">100% satisfaction commitment</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span className="text-foreground">2-year workmanship warranty</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">Best of Houzz 2025</span>
                  </div>
                </div>

                {/* Quick Contact */}
                <div className="bg-primary rounded-2xl p-6 text-center">
                  <Phone className="h-8 w-8 text-primary-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-primary-foreground mb-2">Prefer to Talk?</h3>
                  <p className="text-primary-foreground/80 text-sm mb-4">
                    Call us directly for a quick consultation.
                  </p>
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 w-full"
                    asChild
                  >
                    <a href="tel:+14129441683">
                      <Phone className="mr-2 h-4 w-4" />
                      (412) 944-1683
                    </a>
                  </Button>
                  <p className="text-primary-foreground/60 text-xs mt-3">
                    Mon-Fri 7am-6pm, Sat 8am-2pm
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

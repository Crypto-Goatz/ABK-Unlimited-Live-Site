import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/site/Header"
import { Footer } from "@/components/site/Footer"
import { Button } from "@/components/ui/button"
import {
  DollarSign,
  Percent,
  Calendar,
  CreditCard,
  Shield,
  CheckCircle,
  Clock,
  FileText,
  Hammer,
  Wallet,
  ArrowRight,
  Phone,
  HelpCircle,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Financing Options | ABK Unlimited Pittsburgh",
  description:
    "Flexible financing options for your Pittsburgh home remodeling project. 0% APR available, low monthly payments from $199/mo, and terms from 3-15 years. No money down. Apply today.",
  openGraph: {
    title: "Financing Options | ABK Unlimited Pittsburgh",
    description:
      "Make your dream remodel affordable with our flexible financing. 0% APR for 12 months, payments from $199/mo.",
    url: "https://abkunlimited.com/financing",
  },
}

const financingOptions = [
  {
    icon: Percent,
    title: "0% APR for 12 Months",
    description:
      "Start your project now and pay zero interest for a full year. Perfect for smaller renovations like bathrooms or flooring upgrades.",
    highlight: "0% APR",
    detail: "For 12 months on approved credit",
  },
  {
    icon: CreditCard,
    title: "Low Monthly Payments",
    description:
      "Spread the cost of your remodel into manageable monthly installments. Budget-friendly options that fit your financial plan.",
    highlight: "From $199/mo",
    detail: "Based on project size and term length",
  },
  {
    icon: Calendar,
    title: "Flexible Terms",
    description:
      "Choose a repayment timeline that works for you. Shorter terms mean less interest, while longer terms keep payments low.",
    highlight: "3-15 Years",
    detail: "Multiple term lengths available",
  },
]

const benefits = [
  {
    icon: DollarSign,
    title: "No Money Down",
    description: "Start your project without any upfront payment. Finance 100% of your remodel.",
  },
  {
    icon: Clock,
    title: "Quick Approval",
    description: "Get approved in minutes, not days. Our streamlined application makes it easy.",
  },
  {
    icon: Shield,
    title: "Multiple Lenders",
    description: "We work with several lending partners to find you the best rate available.",
  },
  {
    icon: CheckCircle,
    title: "No Prepayment Penalty",
    description: "Pay off your balance early without any additional fees or penalties.",
  },
]

const steps = [
  {
    number: 1,
    title: "Apply Online",
    description:
      "Fill out a quick application in just a few minutes. We'll need basic information and your desired project scope.",
  },
  {
    number: 2,
    title: "Get Approved",
    description:
      "Receive a decision quickly, often within the same day. Review your rate, terms, and monthly payment.",
  },
  {
    number: 3,
    title: "Start Your Project",
    description:
      "Once approved, we schedule your project and get to work transforming your home right away.",
  },
  {
    number: 4,
    title: "Easy Payments",
    description:
      "Make convenient monthly payments through your lender's portal. Auto-pay options available for extra ease.",
  },
]

const faqs = [
  {
    question: "What credit score do I need to qualify?",
    answer:
      "Most of our lending partners work with scores of 600 and above. However, we have options for a range of credit profiles. The best way to find out is to apply -- it won't affect your credit score.",
  },
  {
    question: "How much can I finance?",
    answer:
      "Financing is available for projects ranging from $5,000 to $250,000+. The exact amount depends on your creditworthiness and the scope of your project.",
  },
  {
    question: "How long does the approval process take?",
    answer:
      "Most applications receive a decision within minutes. In some cases, additional documentation may be needed, which can take 1-2 business days.",
  },
  {
    question: "Can I combine financing with other promotions?",
    answer:
      "Yes! Our financing options can be combined with seasonal promotions and project-specific discounts. Ask your project consultant for details.",
  },
  {
    question: "Is there a penalty for paying off my loan early?",
    answer:
      "No. All of our financing partners offer prepayment without penalties. You can pay off your balance at any time without extra charges.",
  },
  {
    question: "What types of projects can be financed?",
    answer:
      "All of our services are eligible for financing, including kitchen remodeling, bathroom renovations, basement finishing, deck building, home additions, hardscaping, paving, and custom home construction.",
  },
]

const calculatorExamples = [
  { project: "Bathroom Remodel", amount: "$15,000", term: "5 years", monthly: "$283/mo" },
  { project: "Kitchen Remodel", amount: "$35,000", term: "7 years", monthly: "$499/mo" },
  { project: "Basement Finishing", amount: "$25,000", term: "10 years", monthly: "$265/mo" },
  { project: "Deck Build", amount: "$20,000", term: "5 years", monthly: "$377/mo" },
]

export default function FinancingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-secondary overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6">
                Affordable Remodeling
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-secondary-foreground mb-6">
                Flexible Financing for Your Dream Home
              </h1>
              <p className="text-xl text-secondary-foreground/80 mb-8">
                Don&apos;t let budget hold you back. We offer financing options that make your Pittsburgh
                home remodel affordable with payments that fit your lifestyle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/free-estimate">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                    Get Started Today
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

        {/* Financing Options */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
                Financing Options
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that best fits your budget and project timeline.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {financingOptions.map((option) => (
                <div
                  key={option.title}
                  className="relative bg-card rounded-2xl border border-border p-8 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <option.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{option.highlight}</div>
                  <p className="text-sm text-muted-foreground mb-4">{option.detail}</p>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{option.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{option.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Payment Calculator Display */}
        <section className="py-20 bg-muted/50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
                Estimated Monthly Payments
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See sample monthly payments for common projects. Actual rates depend on credit and term length.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {calculatorExamples.map((example) => (
                <div
                  key={example.project}
                  className="bg-card rounded-xl border border-border p-6 text-center shadow-sm"
                >
                  <h3 className="font-semibold text-foreground mb-2">{example.project}</h3>
                  <div className="text-2xl font-bold text-primary mb-1">{example.monthly}</div>
                  <p className="text-sm text-muted-foreground">
                    {example.amount} over {example.term}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-8">
              * Estimates based on 7.99% APR for illustrative purposes. Your actual rate may vary. Subject to credit approval.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
                Why Finance With ABK?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We make financing simple, transparent, and hassle-free.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-muted/50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Getting started with financing is quick and easy.
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((step) => (
                <div key={step.number} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-lg">
                      {step.number}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                  {step.number < 4 && (
                    <div className="hidden md:block absolute top-7 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Common questions about our financing options.
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
            <Wallet className="h-12 w-12 text-primary-foreground/80 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Apply for financing today and take the first step toward your dream home. Quick approval,
              flexible terms, and no obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-estimate">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg px-8">
                  Request a Free Estimate
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

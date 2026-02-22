import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { Header } from "@/components/site/Header"
import { Footer } from "@/components/site/Footer"
import { Button } from "@/components/ui/button"
import {
  Star,
  Shield,
  MessageSquare,
  Award,
  CheckCircle,
  ArrowRight,
  Phone,
  ExternalLink,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Reviews & Testimonials | ABK Unlimited Pittsburgh Contractor",
  description:
    "Read verified reviews from ABK Unlimited clients. 5.0 stars on Google, 5.0 on Houzz, A+ BBB rating. See why Pittsburgh homeowners trust us with their remodeling projects.",
  openGraph: {
    title: "Reviews & Testimonials | ABK Unlimited",
    description:
      "5-star rated Pittsburgh contractor. Read verified reviews from real homeowners. 200+ reviews across Google, Houzz, and BBB.",
    url: "https://abkunlimited.com/testimonials",
    type: "website",
  },
}

const ratings = [
  {
    platform: "Google",
    rating: "5.0",
    icon: Star,
    color: "text-yellow-400",
    fillColor: "fill-yellow-400",
  },
  {
    platform: "Houzz",
    rating: "5.0",
    icon: Star,
    color: "text-yellow-400",
    fillColor: "fill-yellow-400",
  },
]

const trustSignals = [
  { icon: Shield, label: "PA Licensed & Insured" },
  { icon: MessageSquare, label: "200+ Verified Reviews" },
  { icon: Award, label: "Best of Houzz 2025" },
  { icon: CheckCircle, label: "A+ BBB Rating" },
]

const stats = [
  { value: "500+", label: "Projects Completed" },
  { value: "15+", label: "Years in Business" },
  { value: "98%", label: "Referral Rate" },
  { value: "100%", label: "Satisfaction Guarantee" },
]

const reviewPlatforms = [
  {
    name: "Google Reviews",
    url: "https://www.google.com/search?q=ABK+Unlimited+Pittsburgh+reviews",
    description: "Read our Google reviews and leave your own",
    rating: "5.0",
    reviewCount: "100+",
  },
  {
    name: "Houzz",
    url: "https://www.houzz.com/professionals/general-contractors/abk-unlimited-pfvwus-pf~222150373",
    description: "See our Houzz profile, projects, and reviews",
    rating: "5.0",
    reviewCount: "50+",
  },
]

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-secondary overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary/20" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6">
                Reviews
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                What Our Clients Say
              </h1>
              <p className="text-xl text-white/80 leading-relaxed mb-8">
                Don&apos;t just take our word for it. Read verified reviews from
                real Pittsburgh homeowners who trusted ABK Unlimited with their
                projects.
              </p>

              {/* Star Ratings */}
              <div className="flex flex-wrap gap-8">
                {ratings.map((item) => (
                  <div key={item.platform} className="flex items-center gap-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${item.color} ${item.fillColor}`}
                        />
                      ))}
                    </div>
                    <div>
                      <span className="text-white font-bold text-lg">
                        {item.rating}
                      </span>
                      <span className="text-white/60 text-sm ml-2">
                        on {item.platform}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals Bar */}
        <section className="py-6 bg-primary">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trustSignals.map((signal) => (
                <div
                  key={signal.label}
                  className="flex items-center justify-center gap-3 text-primary-foreground"
                >
                  <signal.icon className="h-5 w-5 text-primary-foreground/80" />
                  <span className="text-sm font-medium">{signal.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CRM Reviews Widget */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Verified Client Reviews
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                These reviews are collected and verified through our CRM
                platform. Every review is from a real client.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden">
              <iframe
                className="lc_reviews_widget"
                src="https://reputationhub.site/reputation/widgets/review_widget/497AdD39erWgmOu8JTCw"
                frameBorder={0}
                scrolling="no"
                style={{ minWidth: "100%", width: "100%" }}
                title="ABK Unlimited Customer Reviews"
              />
            </div>
            <Script
              src="https://reputationhub.site/reputation/assets/review-widget.js"
              strategy="lazyOnload"
            />
          </div>
        </section>

        {/* Review Platform Links */}
        <section className="py-20 bg-muted/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Find Us on These Platforms
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Read reviews and see our work on the platforms you trust most.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {reviewPlatforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-xl transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {platform.name}
                    </h3>
                    <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    {platform.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="h-4 w-4 text-yellow-400 fill-yellow-400"
                          />
                        ))}
                      </div>
                      <span className="font-bold text-foreground ml-1">
                        {platform.rating}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {platform.reviewCount} reviews
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-secondary">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-white/70 mt-2 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Join Our Happy Clients?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the ABK Unlimited difference. Get a free, no-obligation
              estimate for your project today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                  className="border-primary text-primary hover:bg-primary/10"
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

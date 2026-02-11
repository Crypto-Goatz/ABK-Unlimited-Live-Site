import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/site/Header"
import { Footer } from "@/components/site/Footer"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Award,
  Users,
  Clock,
  CheckCircle,
  Phone,
  ArrowRight,
  Star,
} from "lucide-react"

export const metadata: Metadata = {
  title: "About ABK Unlimited | Pittsburgh General Contractor Since 2005",
  description:
    "Learn about ABK Unlimited, Pittsburgh's trusted general contractor since 2005. Founded by Anthony B. Kowalski, a third-generation craftsman with 1,200+ completed projects.",
  openGraph: {
    title: "About ABK Unlimited | Pittsburgh General Contractor Since 2005",
    description:
      "Third-generation craftsmanship. 1,200+ projects completed. Licensed, insured, and committed to building Pittsburgh's dreams since 2005.",
    url: "https://abkunlimited.com/about",
    type: "website",
  },
}

const coreValues = [
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We do what we say we'll do. Transparent pricing, honest timelines, and no surprises. Our reputation is built on trust.",
  },
  {
    icon: Award,
    title: "Quality",
    description:
      "Every project meets the highest standards of craftsmanship. We use premium materials and proven techniques passed down three generations.",
  },
  {
    icon: Users,
    title: "Family Values",
    description:
      "As a family-owned business, we treat every client like family. Your home is your most important investment, and we respect that.",
  },
  {
    icon: Clock,
    title: "Reliability",
    description:
      "On-time, on-budget, every time. We show up when we say we will and finish when we promise. That's the ABK guarantee.",
  },
]

const milestones = [
  {
    year: "2005",
    title: "ABK Unlimited Founded",
    description:
      "Anthony B. Kowalski starts ABK Unlimited with a truck, a toolbox, and a vision to bring honest craftsmanship to Pittsburgh homeowners.",
  },
  {
    year: "2010",
    title: "500 Projects Completed",
    description:
      "Reached our 500th project milestone. Expanded our team to 15 full-time craftsmen and moved into our first dedicated office space.",
  },
  {
    year: "2015",
    title: "Commercial Division Launched",
    description:
      "Expanded into commercial construction, taking on office buildouts, retail renovations, and multi-unit residential projects across Greater Pittsburgh.",
  },
  {
    year: "2020",
    title: "1,000 Projects & Growing",
    description:
      "Surpassed 1,000 completed projects. Earned BBB A+ rating and became one of Pittsburgh's most reviewed contractors on Google and Houzz.",
  },
  {
    year: "2024",
    title: "Best of Houzz & AI Innovation",
    description:
      "Won Best of Houzz 2025 award. Launched AI-powered design visualization tools to help homeowners plan their dream renovations.",
  },
]

const credentials = [
  { label: "PA Licensed", detail: "HIC #PA163301" },
  { label: "Fully Insured", detail: "Liability & Workers' Comp" },
  { label: "EPA Lead-Safe", detail: "Certified Renovator" },
  { label: "OSHA Certified", detail: "Safety Trained" },
  { label: "BBB A+ Rated", detail: "Accredited Business" },
  { label: "Angi Certified", detail: "Top Rated Pro" },
]

const stats = [
  { value: "1,200+", label: "Projects Completed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "A+", label: "BBB Rating" },
  { value: "5.0", label: "Google Rating", icon: true },
]

const teamMembers = [
  {
    name: "Anthony Kowalski",
    role: "CEO & Founder",
    image: "/professional-headshot.png",
    bio: "Third-generation craftsman with 20+ years of experience. Anthony founded ABK Unlimited in 2005 with a commitment to honest, quality workmanship that has driven the company's growth ever since.",
  },
  {
    name: "Maria Kowalski",
    role: "Director of Operations",
    image: "/professional-woman-headshot.png",
    bio: "Maria oversees day-to-day operations, client relations, and project scheduling. Her attention to detail and dedication to customer satisfaction keep every project running smoothly.",
  },
  {
    name: "James Mitchell",
    role: "Senior Project Manager",
    image: "/professional-man-headshot.png",
    bio: "With 15 years in construction management, James leads our project teams with precision and expertise. He ensures every build meets our exacting quality standards.",
  },
]

export default function AboutPage() {
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
                About Us
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Building Pittsburgh&apos;s Dreams Since 2005
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                Three generations of craftsmanship. One unwavering commitment to
                quality. Over 1,200 projects completed for families just like
                yours.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  A Legacy of Craftsmanship
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    ABK Unlimited was founded in 2005 by{" "}
                    <strong className="text-foreground">
                      Anthony B. Kowalski
                    </strong>
                    , a third-generation craftsman who grew up learning the
                    trades from his father and grandfather on job sites across
                    Pittsburgh.
                  </p>
                  <p>
                    What started as a one-man operation with a pickup truck and a
                    passion for quality work has grown into one of Pittsburgh's
                    most trusted general contracting firms. Today, ABK Unlimited
                    has completed over{" "}
                    <strong className="text-foreground">
                      1,200 residential and commercial projects
                    </strong>{" "}
                    across Greater Pittsburgh.
                  </p>
                  <p>
                    Our success comes from a simple philosophy: treat every
                    home like it's your own. We combine old-world craftsmanship
                    with modern techniques and materials to deliver results that
                    stand the test of time.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/professional-contractor-team-portrait-in-front-of-.jpg"
                    alt="ABK Unlimited team on a job site"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-xl">
                  <div className="text-3xl font-bold">20+</div>
                  <div className="text-sm text-primary-foreground/80">
                    Years Experience
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-muted/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                Our Values
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What We Stand For
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                These core values guide every decision we make and every nail we
                drive.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value) => (
                <div
                  key={value.title}
                  className="bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                Our Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Milestones Along the Way
              </h2>
            </div>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className="relative flex gap-8 items-start"
                  >
                    {/* Year badge */}
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-sm shadow-lg ${
                          index % 2 === 0
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        {milestone.year}
                      </div>
                    </div>
                    {/* Content */}
                    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Credentials */}
        <section className="py-20 bg-muted/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                Credentials
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Licensed, Insured & Certified
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We maintain the highest professional standards and credentials
                in the industry.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {credentials.map((cred) => (
                <div
                  key={cred.label}
                  className="bg-card rounded-xl p-4 text-center shadow-sm border border-border"
                >
                  <CheckCircle className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="font-semibold text-foreground text-sm">
                    {cred.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {cred.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-primary">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-4xl md:text-5xl font-bold text-primary-foreground">
                      {stat.value}
                    </span>
                    {stat.icon && (
                      <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                    )}
                  </div>
                  <div className="text-primary-foreground/70 mt-2 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                Our Team
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Meet the People Behind ABK
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our leadership team brings decades of combined experience to
                every project.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-72">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium text-sm mb-3">
                      {member.role}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-secondary">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your vision. Get a free, no-obligation estimate
              from Pittsburgh&apos;s most trusted contractor.
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

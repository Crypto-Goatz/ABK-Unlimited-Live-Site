import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Award, Star, CheckCircle } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/modern-luxury-kitchen-remodel-with-white-cabinets-.jpg"
          alt="Modern kitchen remodel in Pittsburgh PA featuring white shaker cabinets, quartz countertops, and stainless steel appliances"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/40" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="max-w-2xl lg:max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 sm:px-4 py-2 mb-6">
            <Award className="h-4 w-4 text-accent" />
            <span className="text-xs sm:text-sm font-medium text-white">Best of Houzz 2025 Winner</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white text-balance leading-tight">
            Transform Your Pittsburgh Home with <span className="text-accent">Award-Winning Craftsmanship</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg leading-relaxed text-white/80 max-w-xl">
            From stunning kitchen renovations to custom deck builds, ABK Unlimited delivers exceptional results that
            exceed expectations. Serving Greater Pittsburgh homeowners with pride.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link href="/free-estimate">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg px-6 sm:px-8 text-base"
              >
                Get Your Free Estimate
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 bg-transparent px-6 sm:px-8 text-base"
              >
                View Our Work
              </Button>
            </Link>
          </div>

          <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8 border-t border-white/20 pt-6 sm:pt-8">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">200+</p>
              <p className="text-xs sm:text-sm text-white/70 mt-1">Projects Completed</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">5.0</p>
              <div className="flex items-center gap-0.5 sm:gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-accent text-accent" />
                ))}
              </div>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">15+</p>
              <p className="text-xs sm:text-sm text-white/70 mt-1">Years Experience</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 bg-background/95 backdrop-blur-sm border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-12">
            {[
              { icon: Shield, label: "PA Licensed #PA163301" },
              { icon: CheckCircle, label: "Fully Insured" },
              { icon: Award, label: "Best of Houzz 2025" },
              { icon: Star, label: "5-Star Rated" },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-1.5 sm:gap-2">
                <badge.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <p className="text-xs sm:text-sm font-medium text-foreground">{badge.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

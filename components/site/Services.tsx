import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const services = [
  {
    title: "Kitchen Remodeling",
    description:
      "Transform your kitchen into the heart of your home. From complete gut renovations to cabinet refacing and countertop upgrades, we create functional, beautiful kitchens.",
    image: "/modern-white-kitchen-renovation-with-island-and-pe.jpg",
    href: "/services/kitchen-remodeling",
  },
  {
    title: "Bathroom Remodeling",
    description:
      "Create your personal retreat with a custom bathroom renovation. We specialize in luxury master baths, accessible aging-in-place designs, and efficient transformations.",
    image: "/luxury-master-bathroom-with-walk-in-shower-and-fre.jpg",
    href: "/services/bathroom-remodeling",
  },
  {
    title: "Basement Finishing",
    description:
      "Unlock your home's hidden potential. Convert your unfinished basement into a family room, home theater, gym, guest suite, or home office.",
    image: "/finished-basement-theater-bar.png",
    href: "/services/basement-finishing",
  },
  {
    title: "Deck Building",
    description:
      "Extend your living space outdoors with a custom deck built for Pittsburgh's seasons. We work with composite, pressure-treated lumber, and premium hardwoods.",
    image: "/custom-composite-deck-with-outdoor-furniture-and-c.jpg",
    href: "/services/deck-building",
  },
  {
    title: "Home Additions",
    description:
      "Need more space? Our design-build team creates seamless additions that look like they were always part of your home\u2014from sunrooms to second-story expansions.",
    image: "/modern-home-addition-sunroom-with-large-windows.jpg",
    href: "/services/home-additions",
  },
  {
    title: "Flooring Installation",
    description:
      "Complete flooring solutions including hardwood, tile, stone, laminate, and luxury vinyl. Professional installation with meticulous attention to detail.",
    image: "/hardwood-floor-installation-in-living-room.jpg",
    href: "/services/flooring-installation",
  },
]

export function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-left sm:text-center mb-12 sm:mb-16">
          <p className="text-sm font-semibold tracking-wider text-primary uppercase mb-4">Our Services</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
            Complete Home Remodeling Services
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl sm:mx-auto">
            From kitchens to basements, we deliver exceptional craftsmanship across every project type.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <Link
              key={service.title}
              href={service.href}
              className={`group relative overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-300 ${
                index === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <div className={`relative ${index === 0 ? "aspect-[16/9] lg:aspect-[4/3]" : "aspect-[4/3]"}`}>
                <Image
                  src={service.image}
                  alt={`${service.title} project in Pittsburgh by ABK Unlimited`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <h3 className={`font-bold text-white ${index === 0 ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"}`}>
                  {service.title}
                </h3>
                <p
                  className={`mt-2 text-white/80 ${index === 0 ? "text-sm sm:text-base" : "text-xs sm:text-sm"} line-clamp-2`}
                >
                  {service.description}
                </p>
                <span className="text-accent hover:text-accent/80 font-semibold mt-3 inline-flex items-center text-sm">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 text-left sm:text-center">
          <Link href="/services">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
            >
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

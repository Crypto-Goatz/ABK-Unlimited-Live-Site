import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const projects = [
  {
    title: "Mt. Lebanon Kitchen Transformation",
    category: "Kitchen Remodeling",
    image: "/before-and-after-kitchen-remodel-white-cabinets-qu.jpg",
  },
  {
    title: "Sewickley Master Bath Suite",
    category: "Bathroom Remodeling",
    image: "/luxury-master-bathroom-renovation-walk-in-shower.jpg",
  },
  {
    title: "Moon Township Entertainment Basement",
    category: "Basement Finishing",
    image: "/finished-basement-home-theater-with-bar.jpg",
  },
  {
    title: "Upper St. Clair Composite Deck",
    category: "Deck Building",
    image: "/modern-composite-deck-outdoor-living-space.jpg",
  },
  {
    title: "Mt. Lebanon Stone Patio & Walkway",
    category: "Hardscaping",
    image: "/flagstone-walkway-stone-path.jpg",
  },
  {
    title: "Bethel Park Paver Fire Pit Patio",
    category: "Outdoor Living",
    image: "/paver-patio-fire-pit-evening.jpg",
  },
]

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 md:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-sm font-semibold tracking-wider text-primary uppercase mb-4">Featured Projects</p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Recent Transformations
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Explore real projects completed for Pittsburgh homeowners just like you.
            </p>
          </div>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 shrink-0 bg-transparent">
            View Full Portfolio
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Masonry-style grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group relative overflow-hidden rounded-xl cursor-pointer ${
                index === 0 || index === 3 ? "lg:row-span-2" : ""
              }`}
            >
              <div className={`relative ${index === 0 || index === 3 ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-accent text-sm font-medium">{project.category}</p>
                <h3 className="text-white font-semibold text-lg mt-1">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

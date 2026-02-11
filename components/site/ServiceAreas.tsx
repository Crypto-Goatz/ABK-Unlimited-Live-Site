import Image from "next/image"
import { MapPin, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const areaGroups = [
  {
    region: "South Hills",
    areas: ["Mt. Lebanon", "Bethel Park", "Upper Saint Clair", "Castle Shannon", "Dormont", "Brentwood"],
  },
  {
    region: "West",
    areas: ["Moon Township", "Robinson", "Sewickley", "Coraopolis", "Carnegie", "Bridgeville"],
  },
  {
    region: "North Hills",
    areas: ["Allison Park", "Glenshaw", "Etna", "Sharpsburg", "Aspinwall", "Fox Chapel"],
  },
  {
    region: "Additional Areas",
    areas: ["Cranberry Township", "Green Tree", "Crafton", "Whitehall", "Bellevue", "West View"],
  },
]

export function ServiceAreas() {
  return (
    <section id="service-areas" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <p className="text-sm font-semibold tracking-wider text-primary uppercase mb-4">Service Coverage</p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              Proudly Serving Greater Pittsburgh
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              ABK Unlimited is honored to serve homeowners throughout Allegheny County and surrounding areas. Our team
              travels across the region to deliver the same exceptional quality to every neighborhood.
            </p>

            <div className="flex items-center gap-3 mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <MapPin className="h-6 w-6 text-primary" />
              <div>
                <p className="font-semibold text-foreground">50+ Communities Served</p>
                <p className="text-sm text-muted-foreground">Across Greater Pittsburgh Area</p>
              </div>
            </div>

            {/* Area groups */}
            <div className="mt-10 space-y-6">
              {areaGroups.map((group) => (
                <div key={group.region}>
                  <h3 className="font-semibold text-foreground mb-3">{group.region}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.areas.map((area) => (
                      <span
                        key={area}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-muted rounded-full text-sm text-foreground"
                      >
                        <CheckCircle className="h-3 w-3 text-primary" />
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-muted-foreground">
              Don&apos;t see your neighborhood?{" "}
              <Button variant="link" className="text-primary p-0 h-auto font-semibold">
                Contact us
              </Button>{" "}
              &ndash; we likely serve your area too!
            </p>
          </div>

          {/* Map Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-xl border border-border">
              <Image
                src="/pittsburgh-pennsylvania-area-map-with-neighborhood.jpg"
                alt="ABK Unlimited service area map covering Greater Pittsburgh PA"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-6 py-3 rounded-xl shadow-lg">
              <p className="font-bold text-lg">Allegheny County</p>
              <p className="text-sm text-primary-foreground/80">& Surrounding Areas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import Image from "next/image"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "ABK Unlimited transformed our outdated 1950s kitchen into a modern showpiece. Their attention to detail was incredible, and they kept us informed throughout the entire process. We've already recommended them to three neighbors!",
    author: "Jennifer M.",
    location: "Mt. Lebanon",
    rating: 5,
    project: "Kitchen Remodel",
    image: "/professional-woman-headshot.png",
  },
  {
    quote:
      "After getting burned by another contractor, we were hesitant to start our basement project. ABK restored our faith in contractors. They showed up when they said they would, stayed on budget, and the quality speaks for itself.",
    author: "David & Sarah K.",
    location: "Moon Township",
    rating: 5,
    project: "Basement Finishing",
    image: "/couple-headshot-smiling.jpg",
  },
  {
    quote:
      "Our deck was falling apart and we needed it replaced before summer. ABK's team built us a beautiful composite deck in just two weeks. Professional, clean, and the results are stunning.",
    author: "Michael R.",
    location: "Sewickley",
    rating: 5,
    project: "Deck Building",
    image: "/professional-man-headshot.png",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-wider text-accent uppercase mb-4">Client Reviews</p>
          <h2 className="text-3xl font-bold tracking-tight text-secondary-foreground sm:text-4xl lg:text-5xl text-balance">
            What Pittsburgh Homeowners Say
          </h2>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-secondary-foreground/80 font-medium">5.0 Average Rating</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.author} className="bg-card p-8 rounded-2xl border border-border shadow-sm relative">
              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/10" />

              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>

              <blockquote className="text-foreground leading-relaxed mb-8">&ldquo;{testimonial.quote}&rdquo;</blockquote>

              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  <p className="text-xs text-primary font-medium mt-1">{testimonial.project}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

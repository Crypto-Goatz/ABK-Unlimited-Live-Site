import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Mail, Clock } from "lucide-react"

export function CtaSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/custom-new-construction-home-exterior.jpg"
          alt="Beautiful Pittsburgh home exterior"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/85" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl text-balance">
              Ready to Transform Your Pittsburgh Home?
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/90 leading-relaxed">
              Schedule your free, no-obligation consultation today. We&apos;ll visit your home, discuss your vision, and
              provide expert guidance on bringing your project to life.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg px-8">
                Get Your Free Estimate
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent px-8"
                asChild
              >
                <a href="tel:+14129441683">
                  <Phone className="mr-2 h-5 w-5" />
                  (412) 944-1683
                </a>
              </Button>
            </div>

            <p className="mt-6 text-sm text-primary-foreground/80">
              No hidden costs &bull; Transparent pricing &bull; Licensed & Insured
            </p>
          </div>

          {/* Contact Info Card */}
          <div className="bg-card p-8 rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold text-foreground mb-6">Contact Information</h3>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Phone</p>
                  <a href="tel:+14129441683" className="text-primary hover:underline">
                    (412) 944-1683
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <a href="mailto:abk.unlimited@gmail.com" className="text-primary hover:underline">
                    abk.unlimited@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Business Hours</p>
                  <p className="text-muted-foreground text-sm">Mon - Fri: 7:00 AM - 6:00 PM</p>
                  <p className="text-muted-foreground text-sm">Sat: 8:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Serving Pittsburgh, PA 15205 and all of Greater Pittsburgh
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

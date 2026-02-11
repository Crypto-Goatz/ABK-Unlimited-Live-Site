import { Header } from "@/components/site/Header"
import { Hero } from "@/components/site/Hero"
import { WhyUs } from "@/components/site/WhyUs"
import { Services } from "@/components/site/Services"
import { Portfolio } from "@/components/site/Portfolio"
import { Process } from "@/components/site/Process"
import { Testimonials } from "@/components/site/Testimonials"
import { ServiceAreas } from "@/components/site/ServiceAreas"
import { CtaSection } from "@/components/site/CtaSection"
import { Footer } from "@/components/site/Footer"
import { CRMChatWidget } from "@/components/site/CRMChatWidget"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <WhyUs />
        <Services />
        <Portfolio />
        <Process />
        <Testimonials />
        <ServiceAreas />
        <CtaSection />
      </main>
      <Footer />
      <CRMChatWidget />
    </div>
  )
}

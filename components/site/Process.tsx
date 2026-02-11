import { CheckCircle } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Free Consultation",
    description:
      "We start with a no-obligation visit to your home. We'll listen to your vision, assess the space, discuss possibilities, and provide honest guidance on scope, timeline, and budget.",
  },
  {
    number: "02",
    title: "Detailed Proposal",
    description:
      "You'll receive a comprehensive written proposal with itemized costs, material specifications, and a realistic timeline. No vague estimates\u2014just transparent, detailed planning.",
  },
  {
    number: "03",
    title: "Expert Execution",
    description:
      "Our skilled crews bring your vision to life with precision. You'll have a dedicated project manager keeping you informed every step of the way with regular updates.",
  },
  {
    number: "04",
    title: "Final Walkthrough",
    description:
      "Before we consider any project complete, we conduct a thorough walkthrough with you. Every detail must meet our standards\u2014and more importantly, exceed your expectations.",
  },
]

export function Process() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-wider text-primary uppercase mb-4">Our Process</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            The ABK Difference
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A proven 4-step process that ensures exceptional results every time.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-border" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                {/* Step indicator */}
                <div className="relative z-10 mb-6">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg mx-auto lg:mx-0">
                    {step.number}
                  </div>
                  {/* Checkmark for completed feel */}
                  <div className="absolute -top-1 -right-1 lg:right-auto lg:-top-1 lg:-left-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-accent-foreground" />
                  </div>
                </div>

                <div className="text-center lg:text-left">
                  <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

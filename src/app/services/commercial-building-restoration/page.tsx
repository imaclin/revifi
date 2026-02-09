import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = {
  title: "Commercial Building Restoration in Cleveland | REVIFI",
  description:
    "Expert commercial building restoration services in Cleveland, Ohio. Historic preservation, structural repair, adaptive reuse, and code compliance. Transform your building with REVIFI.",
  keywords: [
    "commercial building restoration Cleveland",
    "historic building restoration Ohio",
    "building rehabilitation Cleveland",
    "adaptive reuse Cleveland",
    "commercial renovation Cleveland OH",
    "historic preservation contractor",
    "building restoration company near me",
    "commercial property restoration",
  ],
  openGraph: {
    title: "Commercial Building Restoration in Cleveland | REVIFI",
    description:
      "Expert commercial building restoration services in Cleveland, Ohio. Historic preservation, structural repair, and adaptive reuse.",
    url: "https://revifi.com/services/commercial-building-restoration",
  },
  alternates: {
    canonical: "https://revifi.com/services/commercial-building-restoration",
  },
}

const benefits = [
  {
    title: "Historic Preservation Expertise",
    description:
      "Our team understands the delicate balance between preserving historical integrity and incorporating modern functionality. We work with local preservation boards to ensure compliance.",
  },
  {
    title: "Structural Assessment & Repair",
    description:
      "Comprehensive structural evaluations identify issues before they become problems. Our engineers develop targeted repair strategies that extend your building's lifespan.",
  },
  {
    title: "Code Compliance & Permitting",
    description:
      "Navigate Cleveland's building codes and permitting process with confidence. We handle all regulatory requirements to keep your project moving forward.",
  },
  {
    title: "Sustainable Restoration Practices",
    description:
      "We incorporate energy-efficient systems and sustainable materials that reduce operating costs while maintaining the character of your building.",
  },
  {
    title: "Adaptive Reuse Solutions",
    description:
      "Transform underutilized commercial spaces into thriving destinations. From warehouses to event venues, we reimagine buildings for modern use.",
  },
  {
    title: "Project Management",
    description:
      "End-to-end project management ensures your restoration stays on time and on budget. One point of contact from start to finish.",
  },
]

const faqs = [
  {
    question: "How long does a typical commercial building restoration take?",
    answer:
      "Timeline varies based on scope, but most commercial restorations take 6-18 months. We provide detailed timelines during our initial consultation and keep you updated throughout the process.",
  },
  {
    question: "Do you handle historic tax credit applications?",
    answer:
      "Yes, we have extensive experience with federal and state historic tax credit programs. We guide you through the application process and ensure your project meets all qualifying criteria.",
  },
  {
    question: "What types of commercial buildings do you restore?",
    answer:
      "We work with a wide range of commercial properties including office buildings, retail spaces, warehouses, event venues, restaurants, and mixed-use developments throughout Cleveland and Northeast Ohio.",
  },
  {
    question: "Can you work on occupied buildings?",
    answer:
      "Absolutely. We develop phased restoration plans that minimize disruption to existing tenants and business operations. Safety and accessibility are always our top priorities.",
  },
]

export default function CommercialRestorationPage() {
  return (
    <div className="flex flex-col">
      <ServiceJsonLd
        name="Commercial Building Restoration in Cleveland"
        description="Expert commercial building restoration services in Cleveland, Ohio. Historic preservation, structural repair, adaptive reuse, and code compliance."
        url="https://revifi.com/services/commercial-building-restoration"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://revifi.com" },
          { name: "Services", url: "https://revifi.com/services" },
          {
            name: "Commercial Building Restoration",
            url: "https://revifi.com/services/commercial-building-restoration",
          },
        ]}
      />

      {/* Back Navigation */}
      <div className="bg-background">
        <div className="container mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/services">
            <Button variant="ghost" className="gap-2 pl-0">
              <ArrowLeft className="h-4 w-4" />
              All Services
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-background pb-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Our Services
            </p>
            <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
              Commercial Building Restoration
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Cleveland&apos;s historic commercial buildings deserve expert care. At REVIFI, we
              specialize in transforming aging commercial properties into vibrant, functional
              spaces that honor their architectural heritage while meeting modern standards.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  Get a Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button size="lg" variant="outline">
                  View Past Projects
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="border-t border-border bg-muted/30 py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            What We Deliver
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <Card key={benefit.title}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600" />
                    <div>
                      <h3 className="font-serif text-lg font-semibold">
                        {benefit.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-border bg-background py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {faqs.map((faq) => (
              <Card key={faq.question}>
                <CardContent className="p-6">
                  <h3 className="font-serif text-lg font-semibold">{faq.question}</h3>
                  <p className="mt-3 text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted py-24 text-foreground">
        <div className="container mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Restore Your Building?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Contact us for a free consultation. We&apos;ll assess your property and
            develop a restoration plan tailored to your goals and budget.
          </p>
          <div className="mt-8">
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Start Your Project
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

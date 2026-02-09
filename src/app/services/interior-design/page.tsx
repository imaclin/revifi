import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = {
  title: "Interior Design Services in Cleveland | REVIFI",
  description:
    "Premium interior design services in Cleveland, Ohio. Space planning, custom furniture, material selection, lighting design, and art curation by REVIFI's expert designers.",
  keywords: [
    "interior design Cleveland",
    "interior designer Cleveland Ohio",
    "commercial interior design Cleveland",
    "residential interior design Cleveland",
    "space planning Cleveland",
    "custom interior design",
    "luxury interior design Ohio",
    "modern interior design Cleveland",
  ],
  openGraph: {
    title: "Interior Design Services in Cleveland | REVIFI",
    description:
      "Premium interior design services in Cleveland, Ohio. Space planning, custom furniture, material selection, and lighting design.",
    url: "https://revifi.com/services/interior-design",
  },
  alternates: {
    canonical: "https://revifi.com/services/interior-design",
  },
}

const benefits = [
  {
    title: "Space Planning & Layout",
    description:
      "Strategic space planning that maximizes functionality and flow. We analyze how you use your space and design layouts that enhance daily life and work.",
  },
  {
    title: "Custom Furniture Design",
    description:
      "One-of-a-kind furniture pieces designed specifically for your space. From built-in cabinetry to statement pieces, every item is crafted to perfection.",
  },
  {
    title: "Material & Finish Selection",
    description:
      "Curated material palettes that balance beauty, durability, and budget. We source premium materials from trusted suppliers worldwide.",
  },
  {
    title: "Lighting Design",
    description:
      "Thoughtful lighting design that sets the mood and highlights architectural features. We layer ambient, task, and accent lighting for maximum impact.",
  },
  {
    title: "Art & Accessory Curation",
    description:
      "Complete styling with art, accessories, and soft furnishings that bring your space to life. Every detail is intentionally selected to tell your story.",
  },
  {
    title: "3D Visualization",
    description:
      "See your space before it's built with photorealistic 3D renderings. Make confident decisions with a clear vision of the final result.",
  },
]

const faqs = [
  {
    question: "What is your interior design process?",
    answer:
      "Our process begins with a discovery consultation to understand your vision, followed by concept development, design presentations, material selection, procurement, and installation. We handle every detail from start to finish.",
  },
  {
    question: "Do you work with both residential and commercial spaces?",
    answer:
      "Yes, we design for both residential and commercial clients throughout Cleveland. Our portfolio includes private homes, offices, restaurants, event spaces, and retail environments.",
  },
  {
    question: "How much does interior design cost?",
    answer:
      "Our fees vary based on project scope and complexity. We offer transparent pricing and work within a range of budgets. Contact us for a complimentary initial consultation and project estimate.",
  },
  {
    question: "Can you work with my existing furniture?",
    answer:
      "Absolutely. We can incorporate existing pieces you love into a fresh design scheme. We'll help you identify what stays, what goes, and what new pieces will complete the look.",
  },
]

export default function InteriorDesignPage() {
  return (
    <div className="flex flex-col">
      <ServiceJsonLd
        name="Interior Design Services in Cleveland"
        description="Premium interior design services in Cleveland, Ohio. Space planning, custom furniture, material selection, lighting design, and art curation."
        url="https://revifi.com/services/interior-design"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://revifi.com" },
          { name: "Services", url: "https://revifi.com/services" },
          {
            name: "Interior Design",
            url: "https://revifi.com/services/interior-design",
          },
        ]}
      />

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

      <section className="bg-background pb-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Our Services
            </p>
            <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
              Interior Design Mastery
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Our interior design services blend aesthetics with functionality, creating
              spaces that inspire and delight. We curate every element to reflect your
              unique vision and lifestyle, delivering interiors that are both beautiful and
              livable.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  Book a Consultation
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button size="lg" variant="outline">
                  View Our Portfolio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Our Design Services
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

      <section className="bg-muted py-24 text-foreground">
        <div className="container mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s Design Your Space
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Every great space starts with a conversation. Tell us about your vision and
            let&apos;s create something extraordinary together.
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

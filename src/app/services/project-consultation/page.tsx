import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = {
  title: "Project Consultation Services in Cleveland | REVIFI",
  description:
    "Expert project consultation services in Cleveland, Ohio. Feasibility studies, budget planning, timeline development, vendor coordination, and full project management by REVIFI.",
  keywords: [
    "project consultation Cleveland",
    "construction consulting Cleveland Ohio",
    "project management Cleveland",
    "building consultation services",
    "renovation consultant Cleveland",
    "construction project planning",
    "feasibility study Cleveland",
    "development consulting Ohio",
  ],
  openGraph: {
    title: "Project Consultation Services in Cleveland | REVIFI",
    description:
      "Expert project consultation services in Cleveland, Ohio. Feasibility studies, budget planning, and full project management.",
    url: "https://revifi.com/services/project-consultation",
  },
  alternates: {
    canonical: "https://revifi.com/services/project-consultation",
  },
}

const benefits = [
  {
    title: "Feasibility Studies",
    description:
      "Comprehensive analysis of your project's viability including site assessment, zoning review, cost projections, and return on investment calculations.",
  },
  {
    title: "Budget Planning",
    description:
      "Detailed budgeting that accounts for every phase of your project. We identify cost-saving opportunities without compromising quality.",
  },
  {
    title: "Timeline Development",
    description:
      "Realistic project timelines with built-in contingencies. We coordinate all trades and deliveries to keep your project on schedule.",
  },
  {
    title: "Vendor Coordination",
    description:
      "Access to our vetted network of contractors, suppliers, and specialists. We manage all vendor relationships so you don't have to.",
  },
  {
    title: "Project Management",
    description:
      "Full-service project management from concept through completion. Regular updates, quality inspections, and proactive problem-solving.",
  },
  {
    title: "Regulatory Navigation",
    description:
      "Expert guidance through Cleveland's permitting, zoning, and regulatory requirements. We handle the paperwork so you can focus on your vision.",
  },
]

const faqs = [
  {
    question: "What does a project consultation include?",
    answer:
      "Our initial consultation includes a site visit, discussion of your goals and budget, preliminary feasibility assessment, and a roadmap for next steps. It's complimentary and comes with no obligations.",
  },
  {
    question: "How early should I start the consultation process?",
    answer:
      "The earlier the better. Engaging us during the planning phase helps avoid costly mistakes and ensures all decisions are informed. We recommend reaching out as soon as you're considering a project.",
  },
  {
    question: "Do you offer consultation without full project management?",
    answer:
      "Yes, we offer standalone consultation services. Whether you need a feasibility study, a second opinion on plans, or help with a specific challenge, we're happy to help at any scale.",
  },
  {
    question: "What types of projects do you consult on?",
    answer:
      "We consult on commercial renovations, historic restorations, adaptive reuse projects, new construction, and residential renovations throughout Cleveland and Northeast Ohio.",
  },
]

export default function ProjectConsultationPage() {
  return (
    <div className="flex flex-col">
      <ServiceJsonLd
        name="Project Consultation Services in Cleveland"
        description="Expert project consultation services in Cleveland, Ohio. Feasibility studies, budget planning, timeline development, and full project management."
        url="https://revifi.com/services/project-consultation"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://revifi.com" },
          { name: "Services", url: "https://revifi.com/services" },
          {
            name: "Project Consultation",
            url: "https://revifi.com/services/project-consultation",
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
              Project Consultation
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Our expert consultants guide you through every phase of your project, from
              initial concept to final delivery. We provide strategic insights and practical
              solutions tailored to your unique needs, ensuring your project succeeds.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  Schedule a Consultation
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

      <section className="border-t border-border bg-muted/30 py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            How We Help
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
            Let&apos;s Talk About Your Project
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Every successful project starts with the right plan. Reach out for a
            complimentary consultation.
          </p>
          <div className="mt-8">
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

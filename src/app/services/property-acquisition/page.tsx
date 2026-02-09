import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = {
  title: "Property Acquisition Services in Cleveland | REVIFI",
  description:
    "Streamlined property acquisition services in Cleveland, Ohio. Market analysis, property identification, due diligence, negotiation, and closing coordination by REVIFI.",
  keywords: [
    "property acquisition Cleveland",
    "commercial property buying Cleveland Ohio",
    "real estate acquisition Cleveland",
    "investment property Cleveland",
    "property development Cleveland",
    "real estate investment Ohio",
    "commercial real estate Cleveland",
    "property acquisition services",
  ],
  openGraph: {
    title: "Property Acquisition Services in Cleveland | REVIFI",
    description:
      "Streamlined property acquisition services in Cleveland, Ohio. Market analysis, due diligence, and closing coordination.",
    url: "https://revifi.com/services/property-acquisition",
  },
  alternates: {
    canonical: "https://revifi.com/services/property-acquisition",
  },
}

const benefits = [
  {
    title: "Market Analysis",
    description:
      "In-depth analysis of Cleveland's real estate market to identify emerging opportunities, undervalued properties, and high-potential neighborhoods.",
  },
  {
    title: "Property Identification",
    description:
      "We leverage our extensive network and market knowledge to find properties that align with your investment criteria and development goals.",
  },
  {
    title: "Due Diligence Support",
    description:
      "Comprehensive property evaluations including structural assessments, environmental reviews, title searches, and financial analysis.",
  },
  {
    title: "Negotiation Assistance",
    description:
      "Experienced negotiators who advocate for your interests, securing favorable terms and pricing that maximize your investment potential.",
  },
  {
    title: "Closing Coordination",
    description:
      "Seamless closing management coordinating all parties—attorneys, lenders, inspectors, and title companies—to ensure a smooth transaction.",
  },
  {
    title: "Post-Acquisition Planning",
    description:
      "After acquisition, we help develop renovation and development plans that maximize property value and return on investment.",
  },
]

const faqs = [
  {
    question: "What types of properties do you help acquire?",
    answer:
      "We specialize in commercial properties, mixed-use buildings, multi-family residential, and development sites throughout Cleveland and Northeast Ohio. Our focus is on properties with strong renovation or adaptive reuse potential.",
  },
  {
    question: "Do you invest in properties yourselves?",
    answer:
      "Yes, REVIFI actively invests in and develops properties in Cleveland. This gives us firsthand market knowledge and a deep understanding of what makes a successful acquisition.",
  },
  {
    question: "How do you identify good investment properties?",
    answer:
      "We analyze location fundamentals, building condition, zoning potential, market trends, comparable sales, and neighborhood trajectory. Our experience in restoration gives us unique insight into a property's true potential.",
  },
  {
    question: "Can you help with financing?",
    answer:
      "While we don't provide financing directly, we have strong relationships with lenders who specialize in commercial and renovation loans. We can connect you with the right financing partners for your project.",
  },
]

export default function PropertyAcquisitionPage() {
  return (
    <div className="flex flex-col">
      <ServiceJsonLd
        name="Property Acquisition Services in Cleveland"
        description="Streamlined property acquisition services in Cleveland, Ohio. Market analysis, property identification, due diligence, negotiation, and closing coordination."
        url="https://revifi.com/services/property-acquisition"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://revifi.com" },
          { name: "Services", url: "https://revifi.com/services" },
          {
            name: "Property Acquisition",
            url: "https://revifi.com/services/property-acquisition",
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
              Effortless Acquisition
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              We streamline the property acquisition process, helping you identify and secure
              the perfect property for your investment or development goals. Our deep
              knowledge of Cleveland&apos;s real estate market gives you a competitive edge.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  Discuss Your Investment
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button size="lg" variant="outline">
                  See Our Developments
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Our Acquisition Process
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
            Ready to Invest in Cleveland?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Let&apos;s find the perfect property for your next investment or development
            project.
          </p>
          <div className="mt-8">
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Start Your Search
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

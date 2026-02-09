import { Metadata } from "next"
import Link from "next/link"
import { Building2, Paintbrush, Lightbulb, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/animations/scroll-animations"

export const metadata: Metadata = {
  title: "Services | Building Restoration & Interior Design in Cleveland",
  description: "Explore REVIFI's suite of services - commercial building restoration, interior design, project consultation, and property acquisition in Cleveland, Ohio. Expert contractors for historic renovation.",
  keywords: [
    "building restoration services Cleveland",
    "interior design Cleveland Ohio",
    "commercial renovation Cleveland",
    "property acquisition Cleveland",
    "construction management Cleveland",
    "historic renovation contractor",
  ],
  openGraph: {
    title: "Services | Building Restoration & Interior Design in Cleveland",
    description: "Explore REVIFI's suite of services - commercial building restoration, interior design, project consultation, and property acquisition in Cleveland, Ohio.",
    url: "https://revifi.com/services",
  },
  alternates: {
    canonical: "https://revifi.com/services",
  },
}

const services = [
  {
    number: "01",
    title: "Commercial Building Restoration",
    description: "Transform your vision into reality with our expert restoration services. From concept to construction, we specialize in crafting innovative and functional spaces that honor the past while embracing the future.",
    features: [
      "Historic preservation expertise",
      "Structural assessment and repair",
      "Code compliance and permitting",
      "Sustainable restoration practices",
      "Adaptive reuse solutions",
    ],
    icon: Building2,
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop",
    href: "/services/commercial-building-restoration",
  },
  {
    number: "02",
    title: "Interior Design Mastery",
    description: "Our interior design services blend aesthetics with functionality, creating spaces that inspire and delight. We curate every element to reflect your unique vision and lifestyle.",
    features: [
      "Space planning and layout",
      "Custom furniture design",
      "Material and finish selection",
      "Lighting design",
      "Art and accessory curation",
    ],
    icon: Paintbrush,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
    href: "/services/interior-design",
  },
  {
    number: "03",
    title: "Project Consultation",
    description: "Our expert consultants guide you through every phase of your project, from initial concept to final delivery. We provide strategic insights and practical solutions tailored to your needs.",
    features: [
      "Feasibility studies",
      "Budget planning",
      "Timeline development",
      "Vendor coordination",
      "Project management",
    ],
    icon: Lightbulb,
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop",
    href: "/services/project-consultation",
  },
  {
    number: "04",
    title: "Effortless Acquisition",
    description: "We streamline the property acquisition process, helping you identify and secure the perfect property for your investment or development goals.",
    features: [
      "Market analysis",
      "Property identification",
      "Due diligence support",
      "Negotiation assistance",
      "Closing coordination",
    ],
    icon: Users,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
    href: "/services/property-acquisition",
  },
]

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-background py-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            Our Services
          </h1>
        </div>
      </section>

      {/* Services List */}
      <section className="bg-background pt-4 pb-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16">
            {services.map((service, index) => (
              <ScrollAnimation key={service.title} variant={index % 2 === 0 ? "slideInLeft" : "slideInRight"}>
              <Card className="group overflow-hidden">
                <div className={`grid lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                  <div className={`relative aspect-[4/3] overflow-hidden bg-muted lg:aspect-auto lg:min-h-[400px] ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <CardContent className="flex flex-col justify-center p-8 lg:p-12">
                    <p className="text-sm font-medium text-goldenrod dark:text-[#fbbf24]">
                      {service.number}
                    </p>
                    <h2 className="mt-2 font-serif text-3xl font-bold">{service.title}</h2>
                    <p className="mt-4 text-muted-foreground">{service.description}</p>
                    <ul className="mt-6 space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <span className="text-navy dark:text-[#3b82f6]">→</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <Link href={service.href}>
                        <Button variant="outline" className="gap-2">
                          Learn More
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </div>
              </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Process CTA */}
      <section className="border-t border-border bg-background py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollAnimation className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              Our Process
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every project begins with understanding your vision. Learn more about our 
              comprehensive approach to transforming spaces.
            </p>
            <div className="mt-8">
              <Link href="/about">
                <Button className="gap-2">
                  Learn About Our Process
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-24 text-foreground">
        <ScrollAnimation className="container mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Start Your Project?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Let&apos;s discuss how we can bring your vision to life.
          </p>
          <div className="mt-8">
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </ScrollAnimation>
      </section>
    </div>
  )
}

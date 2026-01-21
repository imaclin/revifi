import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Search, Lightbulb, PenTool, Hammer, Sparkles, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "About",
  description: "Learn about REVIFI - designers and contractors specializing in the revitalization of old properties in Cleveland, Ohio.",
}

const process = [
  {
    step: "01",
    title: "Discovery and Acquisition",
    description: "Begin your design journey with an in-depth consultation. We explore your aspirations, preferences, and lifestyle, ensuring that every detail aligns with your unique vision.",
    icon: Search,
  },
  {
    step: "02",
    title: "Conceptualization and Ideation",
    description: "Our creative team develops innovative concepts that capture the essence of your vision while pushing the boundaries of design excellence.",
    icon: Lightbulb,
  },
  {
    step: "03",
    title: "Design Development",
    description: "We refine and develop the chosen concept into detailed plans, selecting materials, finishes, and fixtures that bring your vision to life.",
    icon: PenTool,
  },
  {
    step: "04",
    title: "Implementation and Construction",
    description: "Our skilled craftsmen execute the design with precision and care, ensuring every detail meets our exacting standards.",
    icon: Hammer,
  },
  {
    step: "05",
    title: "Finishing Touches",
    description: "We add the final details that transform a space from complete to extraordinary, curating every element for maximum impact.",
    icon: Sparkles,
  },
  {
    step: "06",
    title: "Presentation and Delivery",
    description: "Your transformed space is revealed, ready to inspire and delight for years to come.",
    icon: Gift,
  },
]

const team = [
  {
    name: "KC Stitak",
    role: "Architect & Construction Management",
    bio: "With extensive experience in architectural design and construction management, KC brings a unique perspective to every project, ensuring structural integrity meets aesthetic excellence.",
  },
  {
    name: "Kyle Lawrence",
    role: "Designer & Client Relations",
    bio: "Kyle's eye for design and dedication to client satisfaction ensures that every project reflects the unique vision and personality of its owners.",
  },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-background py-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
              About Us
            </h1>
            <Link href="/projects">
              <Button className="gap-2">
                View Our Projects
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="border-b border-border bg-background pt-4 pb-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-lg text-muted-foreground">
              At REVIFI, we don&apos;t just design spaces; we tell stories. Our journey is rooted 
              in a passion for architectural innovation and interior design mastery. With a 
              commitment to excellence, we transform your dreams into sophisticated, functional, 
              and timeless realities.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Our comprehensive start-to-finish approach sets us apart from many other 
              investment companies and design firms, ensuring unparalleled dedication to every project.
            </p>
            <h2 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl mt-8">
              Our Process
            </h2>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {process.map((item) => (
              <Card key={item.step} className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-goldenrod dark:text-[#fbbf24]">
                    {item.step}
                  </p>
                  <h3 className="mt-2 font-serif text-xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="border-b border-border bg-background py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              You&apos;re in Good Hands
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              Passionate Expertise, Collaborative Brilliance
            </h2>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {team.map((member) => (
              <Card key={member.name} className="overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="aspect-square bg-muted" />
                  <CardContent className="flex flex-col justify-center p-6">
                    <h3 className="font-serif text-2xl font-semibold">{member.name}</h3>
                    <p className="mt-1 text-sm font-medium text-navy dark:text-[#3b82f6]">
                      {member.role}
                    </p>
                    <p className="mt-4 text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-24 text-foreground">
        <div className="container mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s Get in Touch
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Ready to transform your space? Contact us to discuss your next project.
          </p>
          <div className="mt-8">
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
              >
                Build With Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

import Link from "next/link"
import { ArrowRight, Building2, Paintbrush, Users, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HeroCarousel } from "@/components/hero-carousel"
import { createClient } from "@/lib/supabase/server"
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/animations/scroll-animations"
import { BeforeAfterSlider } from "@/components/before-after-slider"

const services = [
  {
    title: "Commercial Building Restoration",
    description: "Transform your vision into reality with our expert restoration services.",
    icon: Building2,
  },
  {
    title: "Interior Design Mastery",
    description: "Curated interiors that blend elegance with functionality.",
    icon: Paintbrush,
  },
  {
    title: "Project Consultation",
    description: "Expert guidance from concept to completion.",
    icon: Lightbulb,
  },
  {
    title: "Effortless Acquisition",
    description: "Seamless property acquisition and development services.",
    icon: Users,
  },
]

const testimonials = [
  {
    content: "REVIFI transformed our house into a contemporary haven. The attention to detail, from sleek architectural lines to curated interiors, exceeded our expectations.",
    author: "Sarah J.",
    role: "Modern Residence Owner",
  },
  {
    content: "REVIFI seamlessly blended elegance and functionality in designing our office. Their innovative approach created an environment that not only impresses clients but also fosters a productive work atmosphere.",
    author: "Robert M.",
    role: "Commercial Space Owner",
  },
  {
    content: "Preserving the charm of our heritage home was a delicate task, and REVIFI handled it with finesse. They masterfully combined modern amenities while respecting the historical elements.",
    author: "Alex & Mia",
    role: "Heritage Home Restorers",
  },
]

export default async function Home() {
  const supabase = await createClient()
  
  // Fetch featured projects for the hero carousel
  const { data: heroProjects } = await supabase
    .from("projects")
    .select("id, title, subtitle, slug, featured_image_url, location")
    .neq("status", "draft")
    .eq("featured", true)
    .order("sort_order", { ascending: true })
    .limit(5)

  // Fetch before/after slider images
  const { data: sliderSettings } = await supabase
    .from("site_settings")
    .select("key, value")
    .in("key", ["before_after_before_image", "before_after_after_image"])

  const beforeImage = sliderSettings?.find(s => s.key === "before_after_before_image")?.value
    || "https://a0.muscache.com/im/pictures/miso/Hosting-1216698124792854681/original/9f4b5397-d9d4-46d0-ba4f-d760fe35e922.jpeg?im_w=1200"
  const afterImage = sliderSettings?.find(s => s.key === "before_after_after_image")?.value
    || "https://a0.muscache.com/im/pictures/miso/Hosting-1216698124792854681/original/52034d96-99fc-4a0f-9bff-90c6f573573b.jpeg?im_w=1200"

  // Fallback to any published projects if no featured ones
  let projects = heroProjects || []
  if (projects.length === 0) {
    const { data: fallbackProjects } = await supabase
      .from("projects")
      .select("id, title, subtitle, slug, featured_image_url, location")
      .neq("status", "draft")
      .order("sort_order", { ascending: true })
      .limit(5)
    projects = fallbackProjects || []
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroCarousel projects={projects} />

      {/* About Preview Section */}
      <section className="border-t border-border bg-background py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <ScrollAnimation variant="slideInLeft" className="flex flex-col justify-center">
              <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                About Us
              </p>
              <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
                Timeless Transformations
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                At Revifi, we believe that every space has a story to tell – a narrative 
                that unfolds with every architectural curve and interior flourish. We take 
                what was once good, and re-imagine it to be great through our dedicated 
                and specialized team and skill set.
              </p>
              <div className="mt-8">
                <Link href="/about">
                  <Button variant="outline" className="gap-2">
                    Discover Our Process
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </ScrollAnimation>
            <ScrollAnimation variant="slideInRight">
              <BeforeAfterSlider
                beforeImage={beforeImage}
                afterImage={afterImage}
                beforeLabel="Before"
                afterLabel="After"
                className="aspect-[4/3]"
              />
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="border-t border-border bg-muted/30 py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollAnimation className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Our Projects
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              Some of Our Favorites
            </h2>
          </ScrollAnimation>
          <StaggerContainer className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.15}>
            {projects.slice(0, 3).map((project, index) => (
              <StaggerItem key={project.slug}>
              <Link href={`/projects/${project.slug}`}>
                <Card className="group h-full overflow-hidden transition-all hover:shadow-lg p-0">
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    {project.featured_image_url ? (
                      <img
                        src={project.featured_image_url}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        <Building2 className="h-16 w-16 opacity-20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <CardContent className="p-6">
                    <p className="text-sm font-medium text-muted-foreground">
                      0{index + 1}
                    </p>
                    <h3 className="mt-1 font-serif text-xl font-semibold">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {project.subtitle || project.location || "View Project"}
                    </p>
                  </CardContent>
                </Card>
              </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <ScrollAnimation className="mt-12 text-center" delay={0.3}>
            <Link href="/projects">
              <Button variant="outline" size="lg" className="gap-2">
                View All Projects
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </ScrollAnimation>
        </div>
      </section>

      {/* Services Section */}
      <section className="border-t border-border bg-background py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollAnimation className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Our Services
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              Unleashing the Artistry of REVIFI&apos;s Services
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Explore REVIFI&apos;s suite of services, delivering architectural innovation, 
              interior design mastery, sustainable solutions, and personalized consultations.
            </p>
          </ScrollAnimation>
          <StaggerContainer className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
            {services.map((service, index) => (
              <StaggerItem key={service.title}>
              <Card className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-goldenrod dark:text-[#fbbf24]">
                    0{index + 1}
                  </p>
                  <h3 className="mt-2 font-serif text-lg font-semibold">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="border-t border-border bg-muted/30 py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollAnimation className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Testimonials
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              What Our Clients Say
            </h2>
          </ScrollAnimation>
          <StaggerContainer className="mt-12 grid gap-8 md:grid-cols-3" staggerDelay={0.15}>
            {testimonials.map((testimonial) => (
              <StaggerItem key={testimonial.author}>
              <Card className="h-full">
                <CardContent className="flex h-full flex-col p-6">
                  <blockquote className="flex-1 text-muted-foreground">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>
                  <div className="mt-6 border-t border-border pt-6">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-muted py-24 text-foreground">
        <ScrollAnimation className="container mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
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
        </ScrollAnimation>
      </section>
    </div>
  )
}

import { Metadata } from "next"
import Link from "next/link"
import { Building2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore REVIFI's transformative design projects - from historic restorations to modern event spaces in Cleveland, Ohio.",
}

export default async function ProjectsPage() {
  const supabase = await createClient()
  
  // Fetch published projects (not drafts) ordered by sort_order
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .neq("status", "draft")
    .order("sort_order", { ascending: true })

  console.log("Projects data:", projects)
  console.log("Projects error:", error)
  console.log("Projects count:", projects?.length)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-background py-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            Our Work
          </h1>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="bg-background pt-4 pb-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {!projects || projects.length === 0 ? (
            <div className="py-12 text-center">
              <Building2 className="mx-auto h-16 w-16 text-muted-foreground/50" />
              <h3 className="mt-4 text-xl font-semibold">No projects found</h3>
              <p className="mt-2 text-muted-foreground">
                Check back soon for our latest work.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Link key={project.slug} href={`/projects/${project.slug}`}>
                  <Card className="group overflow-hidden transition-all hover:shadow-lg p-0">
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      {project.featured_image_url ? (
                        <img
                          src={project.featured_image_url}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                          <Building2 className="h-24 w-24 opacity-20" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    
                    {/* Content */}
                    <CardContent className="p-6">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="capitalize">
                          {project.category}
                        </Badge>
                        <Badge variant="secondary" className="capitalize">
                          {project.status}
                        </Badge>
                      </div>
                      <h2 className="font-serif text-2xl font-bold">{project.title}</h2>
                      <p className="mt-1 text-sm font-medium text-navy dark:text-[#3b82f6]">
                        {project.subtitle}
                      </p>
                      <p className="mt-4 text-sm font-medium text-foreground underline-offset-4 group-hover:underline">
                        View Project →
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-muted py-24 text-foreground">
        <div className="container mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Have a Project in Mind?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            We&apos;d love to hear about your vision. Let&apos;s create something extraordinary together.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-transparent px-8 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderKanban, Image, Users, Eye } from "lucide-react"
import { AdminLink } from "@/components/admin/admin-link"

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  // Fetch counts (these will return 0 if tables don't exist yet)
  const [projectsResult, mediaResult, teamResult] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("media").select("id", { count: "exact", head: true }),
    supabase.from("team_members").select("id", { count: "exact", head: true }),
  ])

  const stats = [
    {
      title: "Total Projects",
      value: projectsResult.count ?? 0,
      icon: FolderKanban,
      description: "Published projects",
    },
    {
      title: "Media Files",
      value: mediaResult.count ?? 0,
      icon: Image,
      description: "Images and videos",
    },
    {
      title: "Team Members",
      value: teamResult.count ?? 0,
      icon: Users,
      description: "Active members",
    },
    {
      title: "Site Views",
      value: "—",
      icon: Eye,
      description: "This month",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Welcome to the REVIFI admin panel. Manage your projects, media, and content.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <AdminLink
              href="/admin/projects/new"
              className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted"
            >
              <FolderKanban className="h-5 w-5" />
              <div>
                <p className="font-medium">Create New Project</p>
                <p className="text-sm text-muted-foreground">
                  Add a new project to your portfolio
                </p>
              </div>
            </AdminLink>
            <AdminLink
              href="/admin/media"
              className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted"
            >
              <Image className="h-5 w-5" />
              <div>
                <p className="font-medium">Upload Media</p>
                <p className="text-sm text-muted-foreground">
                  Add images and videos to your library
                </p>
              </div>
            </AdminLink>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Welcome to your new REVIFI admin panel! Here&apos;s how to get started:
            </p>
            <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
              <li>Set up your Supabase database with the provided schema</li>
              <li>Add your environment variables to connect to Supabase</li>
              <li>Create your first project with images and details</li>
              <li>Add team members and testimonials</li>
              <li>Customize your site settings</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

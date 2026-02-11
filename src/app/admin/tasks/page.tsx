"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Building2, Search, CheckCircle2, Clock, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAdminPath } from "@/hooks/use-admin-path"
import { cn } from "@/lib/utils"

interface Project {
  id: string
  title: string
  subtitle: string | null
  slug: string
  location: string | null
  featured_image_url: string | null
  status: string
}

interface TaskSummary {
  project_id: string
  total: number
  completed: number
  overdue: number
}

export default function TasksPage() {
  const router = useRouter()
  const adminPath = useAdminPath()
  const [projects, setProjects] = useState<Project[]>([])
  const [taskSummaries, setTaskSummaries] = useState<Record<string, TaskSummary>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  const fetchData = useCallback(async () => {
    const supabase = createClient()

    const { data: projectsData } = await supabase
      .from("projects")
      .select("id, title, subtitle, slug, location, featured_image_url, status")
      .order("sort_order", { ascending: true })

    if (projectsData) {
      setProjects(projectsData)

      // Fetch task counts per project
      const { data: tasksData } = await supabase
        .from("tasks")
        .select("id, project_id, status, due_date")

      if (tasksData) {
        const summaries: Record<string, TaskSummary> = {}
        const today = new Date().toISOString().split("T")[0]

        for (const task of tasksData) {
          if (!summaries[task.project_id]) {
            summaries[task.project_id] = { project_id: task.project_id, total: 0, completed: 0, overdue: 0 }
          }
          summaries[task.project_id].total++
          if (task.status === "completed") {
            summaries[task.project_id].completed++
          }
          if (task.due_date && task.due_date < today && task.status !== "completed") {
            summaries[task.project_id].overdue++
          }
        }
        setTaskSummaries(summaries)
      }
    }

    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const filteredProjects = projects.filter(
    (p) =>
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleClick = (projectId: string) => {
    router.push(adminPath(`/admin/tasks/${projectId}`))
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold">Tasks</h1>
        <p className="mt-2 text-muted-foreground">
          Manage tasks for each property
        </p>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-muted-foreground">Loading...</div>
      ) : projects.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Building2 className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 font-serif text-lg font-semibold">No properties yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Create a project first to start managing tasks.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Property Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              const summary = taskSummaries[project.id]
              const total = summary?.total || 0
              const completed = summary?.completed || 0
              const overdue = summary?.overdue || 0
              const progress = total > 0 ? Math.round((completed / total) * 100) : 0

              return (
                <Card
                  key={project.id}
                  className="group cursor-pointer overflow-hidden transition-all hover:shadow-md hover:border-foreground/20"
                  onClick={() => handleClick(project.id)}
                >
                  {/* Property Image */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                    {project.featured_image_url ? (
                      <img
                        src={project.featured_image_url}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Building2 className="h-10 w-10 text-muted-foreground/30" />
                      </div>
                    )}
                    {overdue > 0 && (
                      <Badge variant="destructive" className="absolute right-2 top-2 gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        {overdue} overdue
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold leading-tight">{project.title}</h3>
                    {project.location && (
                      <p className="mt-0.5 text-xs text-muted-foreground">{project.location}</p>
                    )}

                    {/* Progress */}
                    <div className="mt-3 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <CheckCircle2 className="h-3 w-3" />
                          {completed}/{total} tasks
                        </span>
                        {total > 0 && (
                          <span className={cn(
                            "font-medium",
                            progress === 100 ? "text-green-600 dark:text-green-400" : "text-muted-foreground"
                          )}>
                            {progress}%
                          </span>
                        )}
                      </div>
                      {total > 0 && (
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all duration-500",
                              progress === 100
                                ? "bg-green-500 dark:bg-green-400"
                                : progress > 0
                                ? "bg-blue-500 dark:bg-blue-400"
                                : "bg-muted-foreground/20"
                            )}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      )}
                      {total === 0 && (
                        <p className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          No tasks yet
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

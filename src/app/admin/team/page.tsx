"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Pencil, Trash2, Users } from "lucide-react"
import { toast } from "sonner"

export default function TeamPage() {
  const [team, setTeam] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    email: "",
  })

  const fetchTeam = useCallback(async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("sort_order", { ascending: true })

    if (!error && data) {
      setTeam(data)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchTeam()
  }, [fetchTeam])

  const resetForm = () => {
    setFormData({ name: "", role: "", bio: "", email: "" })
    setEditingMember(null)
  }

  const openDialog = (member?: any) => {
    if (member) {
      setEditingMember(member)
      setFormData({
        name: member.name || "",
        role: member.role || "",
        bio: member.bio || "",
        email: member.email || "",
      })
    } else {
      resetForm()
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()

    if (editingMember) {
      const { error } = await supabase
        .from("team_members")
        .update(formData)
        .eq("id", editingMember.id)

      if (error) {
        toast.error("Failed to update team member")
        return
      }
      toast.success("Team member updated")
    } else {
      const { error } = await supabase.from("team_members").insert({
        ...formData,
        sort_order: team.length,
      })

      if (error) {
        toast.error("Failed to add team member")
        return
      }
      toast.success("Team member added")
    }

    setIsDialogOpen(false)
    resetForm()
    fetchTeam()
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return

    const supabase = createClient()
    const { error } = await supabase.from("team_members").delete().eq("id", id)

    if (error) {
      toast.error("Failed to delete team member")
      return
    }

    toast.success("Team member deleted")
    setTeam(team.filter((m) => m.id !== id))
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold">Team Members</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your team profiles
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={() => openDialog()}>
              <Plus className="h-4 w-4" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingMember ? "Edit Team Member" : "Add Team Member"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Input
                  id="role"
                  required
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  placeholder="Architect & Designer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="john@revifi.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  rows={3}
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  placeholder="A brief bio..."
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingMember ? "Save Changes" : "Add Member"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-muted-foreground">Loading...</div>
      ) : team.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Users className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 font-semibold">No team members yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Add your first team member to get started
            </p>
            <Button className="mt-4" onClick={() => openDialog()}>
              Add Team Member
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {team.map((member) => (
            <Card key={member.id}>
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Users className="h-8 w-8 text-muted-foreground/50" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-navy dark:text-[#3b82f6]">{member.role}</p>
                  {member.email && (
                    <p className="mt-1 text-sm text-muted-foreground">{member.email}</p>
                  )}
                  {member.bio && (
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {member.bio}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => openDialog(member)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-destructive"
                    onClick={() => handleDelete(member.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

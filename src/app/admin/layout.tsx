import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminSidebar } from "@/components/admin/sidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar user={user} />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto max-w-7xl p-8">
          {children}
        </div>
      </div>
    </div>
  )
}

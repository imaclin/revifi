"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Save } from "lucide-react"
import { toast } from "sonner"

export default function SettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [siteSettings, setSiteSettings] = useState({
    siteName: "REVIFI",
    siteDescription: "Revitalizing the great buildings of yesterday for a better tomorrow",
    contactEmail: "info@revifi.com",
    contactPhone: "(216) 302-7741",
    address: "5900 Detroit Ave.\nCleveland, Ohio 44102",
    instagram: "https://www.instagram.com/revifiproperties",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast.success("Settings saved successfully")
    setIsSubmitting(false)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold">Settings</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your site settings and configuration
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Basic information about your site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={siteSettings.siteName}
                    onChange={(e) =>
                      setSiteSettings({ ...siteSettings, siteName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={siteSettings.contactEmail}
                    onChange={(e) =>
                      setSiteSettings({ ...siteSettings, contactEmail: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  rows={2}
                  value={siteSettings.siteDescription}
                  onChange={(e) =>
                    setSiteSettings({ ...siteSettings, siteDescription: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                How visitors can reach you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Phone Number</Label>
                  <Input
                    id="contactPhone"
                    value={siteSettings.contactPhone}
                    onChange={(e) =>
                      setSiteSettings({ ...siteSettings, contactPhone: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram URL</Label>
                  <Input
                    id="instagram"
                    value={siteSettings.instagram}
                    onChange={(e) =>
                      setSiteSettings({ ...siteSettings, instagram: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  rows={2}
                  value={siteSettings.address}
                  onChange={(e) =>
                    setSiteSettings({ ...siteSettings, address: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Database Setup</CardTitle>
              <CardDescription>
                Instructions for setting up your Supabase database
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                To complete the setup, you need to run the database migration in your 
                Supabase project. Copy the SQL from the migration file and run it in 
                the Supabase SQL editor.
              </p>
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm font-medium">Migration file location:</p>
                <code className="text-sm text-muted-foreground">
                  /supabase/migrations/001_initial_schema.sql
                </code>
              </div>
              <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
                <li>Go to your Supabase project dashboard</li>
                <li>Navigate to the SQL Editor</li>
                <li>Copy and paste the migration SQL</li>
                <li>Run the query to create all tables</li>
                <li>Create a storage bucket named &quot;media&quot;</li>
                <li>Set up Row Level Security policies as needed</li>
              </ol>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" className="gap-2" disabled={isSubmitting}>
              <Save className="h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

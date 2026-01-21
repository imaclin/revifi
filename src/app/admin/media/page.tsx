"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Image as ImageIcon, Trash2, X } from "lucide-react"
import { toast } from "sonner"

export default function MediaPage() {
  const [media, setMedia] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const fetchMedia = useCallback(async () => {
    const supabase = createClient()
    
    // First try simple fetch without join
    const { data, error } = await supabase
      .from("media")
      .select("*")
      .order("created_at", { ascending: false })

    console.log("Simple fetch result:", { data, error })

    if (error) {
      console.error("Error fetching media:", error)
      toast.error("Failed to fetch media", {
        description: error.message,
      })
      setIsLoading(false)
      return
    }
    
    if (data) {
      console.log("Fetched media:", data)
      setMedia(data)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchMedia()
  }, [fetchMedia])

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    await handleUpload(files)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    await handleUpload(files)
  }

  const handleUpload = async (files: File[]) => {
    if (files.length === 0) return

    setIsUploading(true)
    const supabase = createClient()

    for (const file of files) {
      const fileExt = file.name.split(".").pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `uploads/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file)

      if (uploadError) {
        toast.error(`Failed to upload ${file.name}`, {
          description: uploadError.message,
        })
        continue
      }

      const { data: { publicUrl } } = supabase.storage
        .from("media")
        .getPublicUrl(filePath)

      const { error: dbError } = await supabase.from("media").insert({
        type: file.type.startsWith("video/") ? "video" : "image",
        url: publicUrl,
        alt_text: file.name,
        file_size: file.size,
      })

      if (dbError) {
        console.error("Database insert error:", dbError)
        toast.error(`Failed to save ${file.name}`, {
          description: dbError.message,
        })
      } else {
        console.log("Successfully saved to database:", { type: file.type.startsWith("video/") ? "video" : "image", url: publicUrl, alt_text: file.name })
      }
    }

    toast.success(`Uploaded ${files.length} file(s)`)
    fetchMedia()
    setIsUploading(false)
  }

  const handleDelete = async (id: string, url: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return

    const supabase = createClient()
    
    // Extract file path from URL
    const urlParts = url.split("/")
    const filePath = urlParts.slice(-2).join("/")

    // Delete from storage
    await supabase.storage.from("media").remove([filePath])

    // Delete from database
    const { error } = await supabase.from("media").delete().eq("id", id)

    if (error) {
      toast.error("Failed to delete file")
      return
    }

    toast.success("File deleted")
    setMedia(media.filter((m) => m.id !== id))
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold">Media Library</h1>
        <p className="mt-2 text-muted-foreground">
          Upload and manage images and videos for your projects
        </p>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Upload Media</CardTitle>
            <Button variant="outline" size="sm" onClick={fetchMedia}>
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className={`relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
              dragActive
                ? "border-navy bg-navy/5 dark:border-[#3b82f6] dark:bg-[#3b82f6]/5"
                : "border-border hover:border-muted-foreground/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="absolute inset-0 cursor-pointer opacity-0"
              disabled={isUploading}
            />
            <Upload className="h-10 w-10 text-muted-foreground" />
            <p className="mt-4 text-sm font-medium">
              {isUploading ? "Uploading..." : "Drag and drop files here, or click to browse"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Supports images and videos up to 50MB
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Media Grid */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">All Media</h2>
        {isLoading ? (
          <div className="py-12 text-center text-muted-foreground">Loading...</div>
        ) : media.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 font-semibold">No media files</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Upload your first file to get started
              </p>
            </CardContent>
          </Card>
        ) : (
          <div>
            <p className="mb-2 text-sm text-muted-foreground">Debug: Rendering {media.length} media items</p>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {media.map((item) => (
              <Card key={item.id} className="group relative overflow-hidden">
                <div className="aspect-square bg-muted">
                  {item.type === "image" ? (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">URL: {item.url.substring(0, 50)}...</p>
                      <img
                        src={item.url}
                        alt={item.alt_text || ""}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          console.error("Image failed to load:", item.url)
                          e.currentTarget.style.display = 'none'
                        }}
                        onLoad={() => {
                          console.log("Image loaded successfully:", item.url)
                        }}
                      />
                    </div>
                  ) : (
                    <video
                      src={item.url}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(item.id, item.url)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-3">
                  <p className="truncate text-sm font-medium">{item.alt_text}</p>
                  {item.projects?.title && (
                    <p className="truncate text-xs text-muted-foreground">
                      {item.projects.title}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

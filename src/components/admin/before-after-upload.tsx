"use client"

import { useState, useEffect, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, ImageIcon, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { BeforeAfterSlider } from "@/components/before-after-slider"

export function BeforeAfterUpload() {
  const [beforeImage, setBeforeImage] = useState<string | null>(null)
  const [afterImage, setAfterImage] = useState<string | null>(null)
  const [isLoadingBefore, setIsLoadingBefore] = useState(false)
  const [isLoadingAfter, setIsLoadingAfter] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const beforeInputRef = useRef<HTMLInputElement>(null)
  const afterInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value")
      .in("key", ["before_after_before_image", "before_after_after_image"])

    if (error) {
      console.error("Error fetching settings:", error)
      setIsFetching(false)
      return
    }

    if (data) {
      for (const row of data) {
        if (row.key === "before_after_before_image") setBeforeImage(row.value)
        if (row.key === "before_after_after_image") setAfterImage(row.value)
      }
    }
    setIsFetching(false)
  }

  const handleUpload = async (file: File, type: "before" | "after") => {
    const setLoading = type === "before" ? setIsLoadingBefore : setIsLoadingAfter
    const setImage = type === "before" ? setBeforeImage : setAfterImage
    const settingKey = type === "before" ? "before_after_before_image" : "before_after_after_image"

    setLoading(true)
    const supabase = createClient()

    const fileExt = file.name.split(".").pop()
    const fileName = `before-after/${type}-${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(fileName, file, { upsert: true })

    if (uploadError) {
      toast.error(`Failed to upload ${type} image`, { description: uploadError.message })
      setLoading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage
      .from("media")
      .getPublicUrl(fileName)

    // Upsert into site_settings
    const { error: dbError } = await supabase
      .from("site_settings")
      .upsert({ key: settingKey, value: publicUrl, updated_at: new Date().toISOString() }, { onConflict: "key" })

    if (dbError) {
      toast.error(`Failed to save setting`, { description: dbError.message })
      setLoading(false)
      return
    }

    setImage(publicUrl)
    toast.success(`${type === "before" ? "Before" : "After"} image updated`)
    setLoading(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "before" | "after") => {
    const file = e.target.files?.[0]
    if (file) handleUpload(file, type)
    e.target.value = ""
  }

  if (isFetching) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Before & After Slider</CardTitle>
        <p className="text-sm text-muted-foreground">
          Upload photos for the before/after comparison on the homepage
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Preview */}
        {beforeImage && afterImage && (
          <div className="overflow-hidden rounded-lg">
            <BeforeAfterSlider
              beforeImage={beforeImage}
              afterImage={afterImage}
              beforeLabel="Before"
              afterLabel="After"
              className="aspect-[4/3]"
            />
          </div>
        )}

        {/* Upload buttons */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Before image */}
          <div className="space-y-3">
            <p className="text-sm font-medium">Before Image</p>
            <div
              className="relative flex aspect-video cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-border transition-colors hover:border-muted-foreground/50"
              onClick={() => beforeInputRef.current?.click()}
            >
              {beforeImage ? (
                <img src={beforeImage} alt="Before" className="h-full w-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2 p-4">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Click to upload</p>
                </div>
              )}
              {isLoadingBefore && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              )}
            </div>
            <input
              ref={beforeInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e, "before")}
            />
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2"
              onClick={() => beforeInputRef.current?.click()}
              disabled={isLoadingBefore}
            >
              <Upload className="h-4 w-4" />
              {beforeImage ? "Replace Before" : "Upload Before"}
            </Button>
          </div>

          {/* After image */}
          <div className="space-y-3">
            <p className="text-sm font-medium">After Image</p>
            <div
              className="relative flex aspect-video cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-border transition-colors hover:border-muted-foreground/50"
              onClick={() => afterInputRef.current?.click()}
            >
              {afterImage ? (
                <img src={afterImage} alt="After" className="h-full w-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2 p-4">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Click to upload</p>
                </div>
              )}
              {isLoadingAfter && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              )}
            </div>
            <input
              ref={afterInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e, "after")}
            />
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2"
              onClick={() => afterInputRef.current?.click()}
              disabled={isLoadingAfter}
            >
              <Upload className="h-4 w-4" />
              {afterImage ? "Replace After" : "Upload After"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

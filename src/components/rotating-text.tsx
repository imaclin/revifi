"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const phrases = [
  "community-centric",
  "design-driven",
  "historically inspired",
  "detail-oriented",
  "quality-focused",
]

export function RotatingText({ className }: { className?: string }) {
  const [index, setIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % phrases.length)
        setIsAnimating(false)
      }, 400)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span className={cn("relative inline-block", className)}>
      {/* Invisible sizer: renders the widest phrase to hold width */}
      <span className="invisible" aria-hidden="true">
        {phrases.reduce((a, b) => (a.length > b.length ? a : b))}
      </span>
      {/* Visible animated phrase */}
      <span
        className={cn(
          "absolute left-0 top-0 transition-opacity duration-500 ease-in-out",
          isAnimating ? "opacity-0" : "opacity-100"
        )}
      >
        {phrases[index]}
      </span>
    </span>
  )
}

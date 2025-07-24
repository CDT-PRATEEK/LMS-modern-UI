"use client"

import Image from "next/image"
import { useState } from "react"

interface CourseImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

export function CourseImage({ src, alt, width, height, className, priority = false }: CourseImageProps) {
  const [imageError, setImageError] = useState(false)

  // Fallback image based on course category or title
  const getFallbackImage = (alt: string) => {
    const lowerAlt = alt.toLowerCase()

    if (lowerAlt.includes("web development") || lowerAlt.includes("html") || lowerAlt.includes("css")) {
      return `/placeholder.svg?height=${height}&width=${width}&query=web+development+coding+computer+screen`
    } else if (
      lowerAlt.includes("data science") ||
      lowerAlt.includes("python") ||
      lowerAlt.includes("machine learning")
    ) {
      return `/placeholder.svg?height=${height}&width=${width}&query=data+science+analytics+charts+python`
    } else if (lowerAlt.includes("design") || lowerAlt.includes("ui") || lowerAlt.includes("ux")) {
      return `/placeholder.svg?height=${height}&width=${width}&query=ui+ux+design+wireframes+creative`
    } else if (lowerAlt.includes("marketing") || lowerAlt.includes("seo")) {
      return `/placeholder.svg?height=${height}&width=${width}&query=digital+marketing+strategy+analytics`
    } else if (lowerAlt.includes("mobile") || lowerAlt.includes("app")) {
      return `/placeholder.svg?height=${height}&width=${width}&query=mobile+app+development+smartphone`
    } else if (lowerAlt.includes("security") || lowerAlt.includes("cyber")) {
      return `/placeholder.svg?height=${height}&width=${width}&query=cybersecurity+protection+shield+network`
    } else if (lowerAlt.includes("cloud") || lowerAlt.includes("aws")) {
      return `/placeholder.svg?height=${height}&width=${width}&query=cloud+computing+servers+infrastructure`
    } else if (lowerAlt.includes("blockchain") || lowerAlt.includes("crypto")) {
      return `/placeholder.svg?height=${height}&width=${width}&query=blockchain+cryptocurrency+digital+currency`
    } else if (lowerAlt.includes("photography")) {
      return `/placeholder.svg?height=${height}&width=${width}&query=photography+camera+professional+lighting`
    } else if (lowerAlt.includes("3d") || lowerAlt.includes("blender")) {
      return `/placeholder.svg?height=${height}&width=${width}&query=3d+modeling+animation+rendering+design`
    }

    // Default fallback
    return `/placeholder.svg?height=${height}&width=${width}&query=online+learning+education+course`
  }

  return (
    <Image
      src={imageError ? getFallbackImage(alt) : src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={() => setImageError(true)}
    />
  )
}

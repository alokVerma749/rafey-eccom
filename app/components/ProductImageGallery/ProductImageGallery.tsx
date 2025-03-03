"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProductImageGalleryProps {
  images: string[]
  productName: string
  defaultImage: string
}

export function ProductImageGallery({ images, productName, defaultImage }: ProductImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const imageList = images?.length > 0 ? images : [defaultImage]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageList.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageList.length) % imageList.length)
  }

  return (
    <div className="relative flex-shrink-0 sm:w-[50%] w-full">
      {/* Main Image */}
      <div className="relative w-full h-96 overflow-hidden">
        <Image
          alt={`${productName} thumbnail`}
          className="object-contain object-top h-full w-full"
          src={imageList[currentImageIndex] || "/placeholder.svg"}
          fill
          priority
        />
        {imageList.length > 1 && (
          <div className="hidden md:absolute top-1/2 left-0 right-0 md:flex justify-between items-center -translate-y-1/2 px-4">
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/80 hover:bg-white/90"
              onClick={previousImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/80 hover:bg-white/90"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {imageList.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto p-2 hide-scrollbar">
          {imageList.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={cn(
                "relative w-20 h-20 flex-shrink-0 rounded overflow-hidden p-1",
                currentImageIndex === index && "ring-[2px] ring-green-500",
              )}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover p-[2px] rounded"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

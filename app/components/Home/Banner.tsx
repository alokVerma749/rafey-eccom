"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { MoveRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import homeImage from "@/public/asset/homeImage1.png"
import Link from "next/link"
import { cn } from "@/lib/utils"

type BannerData = {
  imageUrl: string
  title: string
  description: string
}

function Banner() {
  const [banner, setBanner] = useState<BannerData>({
    imageUrl: homeImage.src,
    title: "WONDER TOPESTRY",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, et.",
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await fetch("/api/settings")
        if (!response.ok) throw new Error("Failed to fetch banner")

        const data = await response.json()

        setBanner({
          imageUrl: data.settings.homepageSettings.bannerImage || homeImage.src,
          title: data.settings.homepageSettings.bannerTitle || "WONDER TOPESTRY",
          description:
            data.settings.homepageSettings.bannerText ||
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, et.",
        })
      } catch (error) {
        console.error("Error fetching banner:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBanner()
  }, [])

  return (
    <div className="relative w-full h-[35vh] md:h-[80vh] group">
      {/* Background Image */}
      <Image
        src={banner.imageUrl || "/placeholder.svg"}
        alt="Banner Image"
        fill
        priority
        sizes="100vw"
        className={cn("transition-opacity duration-300 absolute inset-0 object-contain md:object-cover", isLoading ? "opacity-0" : "opacity-100")}
        onLoadingComplete={() => setIsLoading(false)}
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/30 md:bg-black/0 md:group-hover:bg-black/60 transition-all duration-500" />

      {/* Content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-white 
        md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide">{banner.title}</h1>
        <p className="mt-2 max-w-xs sm:max-w-sm md:max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
          {banner.description}
        </p>
        <Link href="/shop" className="mt-4 md:mt-6">
          <Button
            className="bg-white text-black hover:text-white px-4 md:px-6 py-2 text-sm md:text-base
              hover:scale-105 transform transition-transform duration-300 
              flex items-center gap-2"
            size="lg"
          >
            Explore more <MoveRight className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </Link>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-pulse w-8 h-8 rounded-full bg-gray-300" />
        </div>
      )}
    </div>
  )
}

export default Banner


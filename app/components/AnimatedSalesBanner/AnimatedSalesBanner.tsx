"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { PartyPopper } from "lucide-react"

export default function AnimatedSalesBanner() {
  const [isSwinging, setIsSwinging] = useState(true)

  useEffect(() => {
    // Add a small delay before starting the animation
    const timer = setTimeout(() => {
      setIsSwinging(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative border border-transparent">
      {/* String/Ribbon */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-12 bg-gradient-to-b from-[#D5992E] to-[#F5C56C]"></div>

      {/* Sale Banner */}
      <div className={`relative mt-12 bg-gradient-to-r from-[#D5992E] to-[#F5C56C] rounded-lg shadow-lg p-3 sm:p-4 overflow-hidden transform origin-top ${isSwinging ? "animate-swing" : ""}`} >
        {/* Sparkle effects */}
        <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full animate-ping"></div>
        <div className="absolute bottom-2 left-3 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <PartyPopper className="h-5 w-5 text-white animate-bounce" />
            <span className="font-bold text-white text-sm sm:text-base uppercase tracking-wider animate-pulse">
              Sale is LIVE
            </span>
            <PartyPopper className="h-5 w-5 text-white animate-bounce" />
          </div>

          <Link
            href="/sales"
            className="bg-white text-[#D5992E] px-3 py-1 rounded-md text-xs sm:text-sm font-medium hover:bg-opacity-90 transition-all duration-300 hover:scale-105 shadow-md"
          >
            Shop Sale
          </Link>
        </div>
      </div>
    </div>
  )
}

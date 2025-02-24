'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import homeImage from "@/public/asset/homeImage1.png";
import Link from "next/link";

type BannerData = {
  imageUrl: string;
  title: string;
  description: string;
};

function Banner() {
  const [banner, setBanner] = useState<BannerData>({
    imageUrl: homeImage.src,
    title: "WONDER TOPESTRY",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, et.",
  });

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await fetch("/api/settings");
        if (!response.ok) throw new Error("Failed to fetch banner");

        const data = await response.json();

        setBanner({
          imageUrl: data.settings.homepageSettings.bannerImage || homeImage.src,
          title: data.settings.homepageSettings.bannerTitle || "WONDER TOPESTRY",
          description: data.settings.homepageSettings.bannerText || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, et.",
        });
      } catch (error) {
        console.error("Error fetching banner:", error);
      }
    };

    fetchBanner();
  }, []);

  return (
    <div className="relative w-full h-[80vh] group">
      {/* Background Image */}
      <Image
        src={banner.imageUrl}
        alt="Banner Image"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0"
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-500"></div>

      {/* Hidden Text (Shows on Hover) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-white 
        opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <h1 className="text-2xl lg:text-4xl font-bold">{banner.title}</h1>
        <p className="mt-2 max-w-2xl mx-auto text-lg">{banner.description}</p>
        <Button className="mt-6 bg-white text-black hover:text-white px-6 py-2 hover:scale-105 transform transition-transform duration-300">
          <Link href={'/shop'}  className="flex items-center gap-2">
            Explore more <MoveRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default Banner;

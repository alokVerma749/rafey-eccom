import { Card } from "@/components/ui/card"
import Image from "next/image"

import image1 from "@/public/asset/image41.png"
import image2 from "@/public/asset/image42.png"
import image4 from "@/public/asset/image43.png"

const cardDetails = [
  {
    name: "Express Delivery",
    description:
      "Get your favorite handmade candles, ceramic, and resin art delivered quickly to your doorstep. We ensure fast and safe shipping!",
    image: image1,
  },
  {
    name: "Handcrafted with Love",
    description:
      "Each piece is carefully handcrafted by skilled artisans, making every candle, ceramic, and resin artwork truly one-of-a-kind.",
    image: image2,
  },
  {
    name: "Eco-Friendly Materials",
    description:
      "We use sustainable, eco-friendly, and non-toxic materials in all our products, ensuring a guilt-free and environmentally responsible purchase.",
    image: image2,
  },
  {
    name: "Custom Orders Available",
    description:
      "Looking for something unique? We offer custom designs for candles, ceramics, and resin art to match your personal style or special occasions.",
    image: image4,
  },
]

function Section4() {
  return (
    <div className="grid-cols-1 md:grid-cols-2 gap-6 p-4 mt-8 max-w-7xl mx-auto hidden md:grid">
      {cardDetails.map((card, index) => (
        <Card key={index} className="relative overflow-hidden rounded-2xl bg-[#E7DDD7] border-none">
          <div className="p-6 md:p-8 flex flex-col h-[400px] md:h-[300px] justify-between">
            <div className="md:max-w-[60%]">
              <h2 className="font-serif text-xl md:text-2xl mb-2 md:mb-4">{card.name}</h2>
              <p className="text-sm tracking-wide">{card.description}</p>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-full md:w-[40%] h-1/2 md:h-full">
            <Image
              src={card.image || "/placeholder.svg"}
              alt={card.name}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 40vw"
              quality={100}
              priority
            />
          </div>
        </Card>
      ))}
    </div>
  )
}

export default Section4

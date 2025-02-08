import Image from "next/image"
import { MoveRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import homeImage from "@/public/asset/homeImage1.png"

function Banner() {
  return (
    <div className="flex mx-auto shadow-lg flex-col md:flex-row relative bg-[#03081F] mt-10 font-arial">
      <div className="flex-1 pl-2 lg:pl-16 rounded-lg lg:rounded-r-none text-white flex flex-col justify-between">
        <div className="py-10 px-2 md:px-0">
          <h1 className="text-xl lg:text-2xl py-4">WONDER TOPESTRY</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, et.</p>
          <p>Lorem ipsum dolor sit amet consectetur</p>
        </div>
        <Button className="w-fit bg-transparent mb-10 hover:scale-105 hover:bg-transparent px-2 md:px-0">Explore more <MoveRight /></Button>
      </div>
      <div className="flex-1 lg:max-w-md flex items-center justify-center px-0 md:pr-0">
        <Image
          width={400}
          height={400}
          src={homeImage.src}
          alt="McDonald's Food"
          className="h-[50vh] w-full object-cover"
        />
      </div>
    </div>
  )
}

export default Banner
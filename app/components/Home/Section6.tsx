import image1 from "@/public/asset/image51.png";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import Image from "next/image";

function Section6() {
  return (
    <div className="p-10">
      <Image height={200} width={200} src={image1.src} alt="" className="h-[60vh]" />
      <form>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Name of your project" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default Section6

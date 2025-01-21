import image1 from "@/public/asset/image51.png";
import { Input } from "@/components/ui/input";
import Image from "next/image";

function Section6() {
  return (
    <div className="hidden md:flex justify-between items-center gap-4 relative p-10 text-white">
      <Image height={200} width={200} src={image1.src} alt="" className="h-[70vh] w-[60vw]" />
      <form className="absolute h-[50vh] right-10 top-20 md:w-5/12 shadow-2xl p-4 border-2 bg-[#f7f4ef] rounded">
        <div className="flex flex-col items-start w-full gap-4">
          <div className="flex flex-col justify-start items-between gap-4 space-y-1.5 w-full">
            <Input id="name" placeholder="Name" className="w-full bg-[#fafafa] text-black" />
            <Input id="email" placeholder="Email" className="w-full" />
            <textarea
              id="message"
              placeholder="Message"
              className="w-full h-[120px] text-start bg-[#fafafa] text-black p-2 rounded"
            ></textarea>
          </div>
          <button className="bg-[#28166f] w-fit p-2 rounded">Send Message</button>
        </div>
      </form>
    </div>
  );
}

export default Section6;

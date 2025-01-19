import Link from 'next/link';
import { formatCategory } from '@/utils/format_string';
import { PrimaryHeader } from '../PrimaryHeader/PrimaryHeader';
import homeImage1 from '@/public/asset/homeImage1.png';
import {ShoppingBag} from 'lucide-react';

function Hero() {
  const navLinks: any = ['Candles', 'Ceramic Art', 'Resin Art'];

  return (
    <div
      className="bg-cover bg-center h-screen w-full relative"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.1) 60%, rgba(0, 0, 0, 0.6) 100%), url(${homeImage1.src})`,
      }}
    >
      <PrimaryHeader />

      <nav className="flex justify-center space-x-4 pt-4">
        {navLinks.map((link: any) => (
          <Link
            key={link}
            href={`/shop/${formatCategory(link)}`}
            className="text-white text-xl hover:cursor-pointer"
          >
            {link}
          </Link>
        ))}

        <Link href="/shop" className="bg-gradient-to-r from-[#D5992E] to-[#F5C56C] px-2 py-1 shadow rounded-md uppercase text-sm text-center hover:cursor-pointer flex justify-start item-center gap-x-2">
          <ShoppingBag size={16}/><span> Shop Now </span>
         </Link>
      </nav>

      <div className="absolute bottom-20 left-0 px-10 py-4">
        <h1 className="text-white text-2xl md:text-4xl md:font-semibold">Lorem ipsum dolor sit amet.</h1>
        <p className="text-white">Lorem ipsum, dolor sit amet <br /> consectetur adipisicing elit. Ad, iste!</p>
      </div>
    </div>
  );
}

export default Hero;

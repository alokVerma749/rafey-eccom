import Link from 'next/link';
import { formatCategory } from '@/utils/format_string';
import { PrimaryHeader } from '../PrimaryHeader/PrimaryHeader';
import homeImage1 from '@/public/asset/homeImage1.png';
import { ShoppingBag } from 'lucide-react';

function Hero() {
  const navLinks = ['Candles', 'Ceramic Art', 'Resin Art'];

  return (
    <div
      className="bg-cover bg-center h-[75vh] md:h-screen w-full relative"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.1) 60%, rgba(0, 0, 0, 0.6) 100%), url(${homeImage1.src})`,
      }}
    >
      <PrimaryHeader />

      {/* Navigation Links */}
      <div className="hidden md:flex flex-row gap-x-10 py-2 items-start md:justify-center gap-y-4 px-10">
        {navLinks.map((link) => (
          <Link
            key={link}
            href={`/shop/${formatCategory(link)}`}
            className="relative text-white text-base md:text-lg group transition-all duration-300"
          >
            {link}
            <span className="absolute left-0 -bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}


        <Link
          href="/shop"
          className="bg-gradient-to-r from-[#D5992E] to-[#F5C56C] px-4 py-2 shadow-md rounded-md uppercase text-sm flex items-center gap-x-2 text-black hover:bg-opacity-90"
        >
          <ShoppingBag size={16} />
          <span>Shop Now</span>
        </Link>
      </div>

      {/* Mobile View */}
      <div className='absolute bottom-0 left-0 mt-auto md:hidden'>

        <div className="flex mx-auto w-screen flex-col items-center gap-y-1 md:gap-y-4 px-6 py-8">
          <p className="text-white text-sm text-center">Handcrafted Elegance. Made With Love.</p>
          <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-medium text-center">Resin, Ceramic Arts, Candles</h1>

          <Link
            href="/shop"
            className="bg-gradient-to-r from-[#D5992E] to-[#F5C56C] px-4 py-2 shadow-md rounded-md uppercase text-sm flex items-center gap-x-2 text-black hover:bg-opacity-90"
          >
            <ShoppingBag size={16} />
            <span>Shop Now</span>
          </Link>
        </div>
      </div>

      {/* Hero Text */}
      <div className="hidden md:block absolute bottom-16 left-0 px-6 md:px-10">
        <h1 className="text-white text-xl md:text-4xl font-medium">
          Handmade Elegance. Made With Love.
        </h1>
        <p className="text-white text-sm md:text-base mt-2">
          Resin, Ceramic Arts, Candles
        </p>
      </div>
    </div>
  );
}

export default Hero;

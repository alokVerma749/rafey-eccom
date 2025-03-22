import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const links = [
    {
      title: "ABOUT US",
      items: [
        { label: "Mission", href: "/about/mission" },
        { label: "Terms And Conditions", href: "/terms-and-conditions" },
        { label: "Privacy policy", href: "/privacy-policy" },
      ],
    },
    {
      title: "SERVICES",
      items: [
        { label: "Candles", href: "/shop/candles" },
        { label: "Ceramic Arts", href: "/shop/ceramic_art" },
        { label: "Resin Arts", href: "/shop/resin_art" },
      ],
    },
  ];

  return (
    <footer className="bg-[#Bfaf9e] text-white p-4 md:px-20">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-center items-center sm:justify-start sm:items-start gap-x-10 md:mx-10 lg:mx-40">
          <div className="flex flex-col items-center sm:items-start mb-6 sm:mb-0">
            <Link href="/">
              <Image
                alt="wonders tapestry"
                className="rounded-full"
                src="/asset/logo.png"
                height={250}
                width={300}
              />
            </Link>
          </div>

          <div className="flex gap-6 items-center mx-auto md:items-start sm:flex-row justify-center sm:justify-center sm:gap-x-20 text-center sm:text-left w-2/3 sm:border-l-2">
            {links.map((section, index) => (
              <div key={index} className="flex flex-col items-start py-6">
                <h4 className="font-medium text-lg md:my-0 pb-2">{section.title}</h4>
                <ul className="space-y-2">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex flex-col items-start">
                      <Link href={item.href} className="text-sm gap-y-4">{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t-2 border-gray-300 mt-4"></div>

        <div className="text-center text-sm text-gray-600 pt-4 md:mx-10 lg:mx-40">
          <p>
            Copyright © {new Date().getFullYear()} Wonders Tapestry | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

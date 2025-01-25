import Image from "next/image";
import Link from "next/link";
import logo from "@/public/asset/logo.png"
export function Footer() {
  const links = [
    {
      title: "ABOUT US",
      items: [
        { label: "Mission", href: "/about/mission" },
        { label: "Testimonials", href: "/about/testimonials" },
        { label: "Privacy policy", href: "/about/privacy-policy" },
      ],
    },
    {
      title: "SERVICES",
      items: [
        { label: "Candles", href: "/services/candles" },
        { label: "Ceramic Arts", href: "/services/ceramic-arts" },
        { label: "Resin Arts", href: "/services/resin-arts" },
      ],
    },
  ];

  return (
    <footer className="bg-[#B2C4B3] text-white py-6 px-4 md:px-20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-start items-center md:justify-start md:items-start gap-x-10">
          <Image src={logo} alt="Wonders Tapestry Logo" height={200} width={200} className="w-[100px] md:w-[200px] p-0" />

          <div className="flex flex-col items-center md:flex-row justify-center md:justify-center md:gap-x-20 text-center sm:text-left w-full md:border-l-2 md:pl-10">
            {links.map((section, index) => (
              <div key={index} className="flex flex-col items-start">
                <div className="my-4">
                  <h4 className="font-base md:my-0">{section.title}</h4>
                  <div className="w-full h-[2px] bg-white mb-1"></div>
                </div>
                <ul className="space-y-2">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex flex-col items-start">
                      <Link href={item.href} className="text-sm">{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-300"></div>

        <div className="text-center text-sm text-gray-600 pt-4">
          <p>
            Copyright © 2025 Wonders Tapestry | All Rights Reserved |{" "}
            <Link href="/terms-and-conditions">
              Terms and Conditions
            </Link>{" "}
            |{" "}
            <Link href="/privacy-policy">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

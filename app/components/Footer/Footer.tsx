// import Image from "next/image";
import Link from "next/link";
// import logo from "@/public/asset/logo.png"
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
    <footer className="bg-[#Bfaf9e] text-white p-4 md:px-20">
      <div className="container">
        <div className="flex flex-col sm:flex-row justify-center items-start sm:justify-center sm:items-start gap-x-10 md:mx-10 lg:mx-40">
          {/* <Image src={logo} alt="Wonders Tapestry Logo" height={200} width={200} className="w-[100px] md:w-[200px] p-0" /> */}
          <Link href="/" className="text-2xl font-bellefair my-auto text-[#523012] font-semibold sm:py-2">Wonders Tapestry</Link>
          <div className="flex flex-col items-start sm:flex-row justify-center sm:justify-center sm:gap-x-20 text-center sm:text-left w-2/3 sm:border-l-2">
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

        <div className="border-t border-gray-300 md:mx-10 lg:mx-40 mr-4 sm:mr-0"></div>

        <div className="text-center text-sm text-gray-600 pt-4 md:mx-10 lg:mx-40 mr-6 sm:mr-4">
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

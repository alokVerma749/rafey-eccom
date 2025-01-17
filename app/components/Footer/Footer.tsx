import Image from "next/image";
import Link from "next/link";
import logo from "@/public/asset/logo.png"
export function Footer() {
  // Data for the links
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
    {
      title: "PORTFOLIO",
      items: [
        { label: "Corporate websites", href: "/portfolio/corporate-websites" },
        { label: "E-commerce", href: "/portfolio/e-commerce" },
        { label: "Mobile apps", href: "/portfolio/mobile-apps" },
        { label: "Landing pages", href: "/portfolio/landing-pages" },
        { label: "UI/UX projects", href: "/portfolio/ui-ux-projects" },
      ],
    },
  ];

  return (
    <footer className="bg-[#B2C4B3] text-white py-6 px-20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:justify-start md:items-start gap-10">
          <div className="flex flex-col items-center md:flex-row md:items-start pl-20">
              <Image src={logo} alt="Wonders Tapestry Logo" height={200} width={200} className="w-[200px] p-0"/>
          </div>

          <div className="flex justify-center gap-x-40 text-center sm:text-left w-full border-l-2">
            {links.map((section, index) => (
              <div key={index}>
                <h4 className="font-base mb-3">{section.title}</h4>
                <ul className="space-y-2">
                  {section.items.map((item, idx) => (
                    <li key={idx}>
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


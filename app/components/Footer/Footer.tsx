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
        { label: "Candles", href: "/services/candles" },
        { label: "Ceramic Arts", href: "/services/ceramic-arts" },
        { label: "Resin Arts", href: "/services/resin-arts" },
      ],
    },
  ];

  return (
    <footer className="bg-[#Bfaf9e] text-white p-4 md:px-20">
      <div>
        <div className="flex flex-col sm:flex-row justify-center items-start sm:justify-center sm:items-start gap-x-10 md:mx-10 lg:mx-40">
          <Link href="/" className="text-2xl font-bellefair my-auto mx-auto text-[#523012] font-semibold sm:py-2">Wonders Tapestry</Link>

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

        <div className="border-t-2 border-gray-300"></div>

        <div className="text-center text-sm text-gray-600 pt-4 md:mx-10 lg:mx-40 mr-6 sm:mr-4">
          <p>
            Copyright © {new Date().getFullYear()} Wonders Tapestry | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

import getAdminSettingsAction from "@/actions/adminSettings/get-admin-settings";
import { Footer } from "./components/Footer";
import Banner from "./components/Home/Banner";
import Hero from "./components/Home/Section1";
import Section2 from "./components/Home/Section2";
import Section3 from "./components/Home/Section3";
import Section4 from "./components/Home/Section4";
import Section5 from "./components/Home/Section5";
import Section6 from "./components/Home/Section6";
import Section7 from "./components/Home/Section7";
import { Marquee } from "./components/Marquee";

export default async function Home() {
  const response = await getAdminSettingsAction();
  const settings = response ? JSON.parse(response as string) : [];
  const marqueeTexts = settings[0].homepageSettings.marqueeText

  return (
    <div className="font-bellefair">
      <Marquee messages={["Welcome! to Wonders Tapestry", ...marqueeTexts]} />
      <Hero />
      <div className="w-[95%] mx-auto">
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
      </div>
      <Banner />
      <div className="w-[95%] mx-auto">
        <Section6 />
        <Section7 />
      </div>
      <div className="h-[25dvh] bg-background">
        <Footer />
      </div>
    </div>
  );
}

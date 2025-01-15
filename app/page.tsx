import Section1 from "./components/Home/Section1";
import Section2 from "./components/Home/Section2";
import Section3 from "./components/Home/Section3";
import Section4 from "./components/Home/Section4";
import Section5 from "./components/Home/Section5";
import Section6 from "./components/Home/Section6";
import Section7 from "./components/Home/Section7";

export default function Home() {
  return (
    <div>
      <div className="font-bellefair"><Section1/></div>
      <div className="font-poppins"><Section2/></div>
      <div className="font-arial"><Section3/></div>
      <div className="font-bellefair"><Section4/></div>
      <div className="font-arial"><Section5/></div>
      <div className="font-arial"><Section6/></div>
      <div className="font-arial"><Section7/></div>
    </div>
  );
}

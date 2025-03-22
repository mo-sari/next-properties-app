import Hero from "@/components/Hero";
import HomeProperties from "@/components/HomeProperty";
import InfoBoxes from "@/components/InfoBoxes";
import { cookies } from "next/headers";

const HomePage = () => {
  console.log(cookies().get("token").value);
  return (
    <div className="text-2xl">
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </div>
  );
};

export default HomePage;

import Hero from "@/components/Hero";
import HomeProperties from "@/components/HomeProperty";
import InfoBoxes from "@/components/InfoBoxes";
const HomePage = () => {
  return (
    <div className="text-2xl">
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </div>
  );
};

export default HomePage;

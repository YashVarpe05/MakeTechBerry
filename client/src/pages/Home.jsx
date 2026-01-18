import { Outlet } from "react-router-dom";
import Hero from "../components/hero";
import ServicesSection from "../components/ServicesSection";
import TrainingSection from "../components/TrainingSection";

const Home = () => {
  return (
    <div className="pt-28 bg-[#E7DEFE] min-h-screen">
      <Hero />
      <ServicesSection />
      <TrainingSection/>
    </div>
  );
};

export default Home;

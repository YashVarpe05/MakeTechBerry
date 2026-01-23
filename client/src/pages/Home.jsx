import { Outlet } from "react-router-dom";
import Hero from "../components/hero";
import ServicesSection from "../components/ServicesSection";
import TrainingSection from "../components/TrainingSection";
import { Bentogrid } from "../components/Bentogrid";
// import { Accordion } from "../components/accordion-05";
import { WhyChooseUsAccordion } from "@/Why-choose-us";

const Home = () => {
	return (
		<div className=" bg-[#E7DEFE] min-h-screen">
			<Hero />
			{/* <Bentogrid /> */}
			<ServicesSection />
			<TrainingSection />
			{/* <Accordion /> */}
			<WhyChooseUsAccordion />
		</div>
	);
};

export default Home;

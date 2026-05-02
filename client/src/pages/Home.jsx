import { Outlet } from "react-router-dom";
import SEO from "../components/common/SEO";
import Hero from "../components/common/hero";
import StatsSection from "../components/StatsSection";
import ServicesSection from "../components/ServicesSection";
import TrainingSection from "../components/TrainingSection";
import TestimonialsSection from "../components/TestimonialsSection";
import { Bentogrid } from "../components/Bentogrid";
// import { Accordion } from "../components/accordion-05";
import { WhyChooseUsAccordion } from "@/Why-choose-us";

const Home = () => {
	return (
		<div className="bg-[#E7DEFE] dark:bg-slate-950 min-h-screen transition-colors duration-300">
			<SEO 
				title="Innovating Learning" 
				description="MakeTechBerry provides comprehensive training, internships, and project development in App Dev, Web Dev, Gen-AI, and Python Full Stack."
			/>
			<Hero />
			<StatsSection />
			{/* <Bentogrid /> */}
			<ServicesSection />
			<TrainingSection />
			<TestimonialsSection />
			{/* <Accordion /> */}
			<WhyChooseUsAccordion />
		</div>
	);
};

export default Home;

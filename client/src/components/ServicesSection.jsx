import React from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";

const ServiceSection = () => {
	const services = [
		{
			tag: "Research",
			title: "Research & Innovation",
			description:
				"We strongly believe in research-driven development. Our team actively works on:",
			items: [
				"Research Paper Writing & Drafting",
				"Patent Drafting & Documentation",
				"Technical Documentation",
				"Proof of Concept (PoC) Development",
				"Copyright working",
			],
			footer:
				"We support both academic and industrial research, ensuring originality and proper formatting.",
			color: "purple",
		},
		{
			tag: "Development",
			title: "Project Development",
			description: "Real projects with clean implementation & timely delivery.",
			items: [
				"Industrial Projects",
				"Student Academic Projects",
				"Capstone & Final-Year Projects",
				"Custom Software Solutions",
			],
			footer:
				"Our focus is on real-world usability, clean implementation, and complete documentation.",
			color: "indigo",
		},
	];

	return (
		<section className="py-7 px-6 bg-gradient-to-b from-white to-purple-50">
			<div className="max-w-5xl mx-auto">
				{/* Our Services Heading - Size Increased */}
				<div className="text-center mb-14 mt-4">
					<h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
						Our <span className="text-purple-500">Services</span>
					</h2>
					<p className="text-lg text-gray-600 max-w-xl mx-auto font-medium">
						We help students and learners build better outcomes.
					</p>
				</div>

				{/* Compact Cards Grid */}
				<div className="grid md:grid-cols-2 gap-8">
					{services.map((service, index) => (
						<div
							key={index}
							className="group bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden flex flex-col"
						>
							<div className="relative z-10 flex flex-col flex-1">
								<span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 bg-purple-100 text-purple-700">
									{service.tag}
								</span>

								<h3 className="text-xl font-bold text-gray-800 mb-2">
									{service.title}
								</h3>
								<p className="text-sm text-gray-500 mb-6 leading-relaxed">
									{service.description}
								</p>

								<ul className="space-y-3 mb-6">
									{service.items.map((item, i) => (
										<li key={i} className="flex items-center text-gray-700">
											<div className="mr-2 p-1 rounded-full bg-purple-50 text-purple-600">
												<ShieldCheck size={14} />
											</div>

											<span className="text-xs md:text-sm">{item}</span>
										</li>
									))}
								</ul>

								<div className="mt-auto">
									<div className="p-3 bg-gray-50 rounded-xl mb-4 italic text-[12px] text-gray-600 border-l-4 border-purple-400">
										"{service.footer}"
									</div>

									<button className="flex items-center text-sm font-semibold text-purple-600 group-hover:text-purple-700 transition-colors">
										Learn more
										<ArrowRight
											className="ml-1 group-hover:translate-x-1 transition-transform"
											size={16}
										/>
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ServiceSection;

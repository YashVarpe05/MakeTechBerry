import React from "react";

import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";
import {
	Briefcase,
	Globe,
	Microscope,
	BookOpen,
	Users,
	Clock,
	Zap,
} from "lucide-react";

const whyChooseUsData = [
	{
		id: "industry-experience",
		title: "Industry-relevant project experience",
		description:
			"Hands-on experience with real-world projects that prepare you for professional environments and industry demands.",
		icon: <Briefcase className="w-5 h-5" />,
	},
	{
		id: "multi-domain",
		title: "Multi-domain expertise",
		description:
			"Knowledge spanning multiple domains and technologies to provide comprehensive understanding of diverse solutions.",
		icon: <Globe className="w-5 h-5" />,
	},
	{
		id: "research-focused",
		title: "Research-focused approach",
		description:
			"We emphasize deep research and problem-solving methodologies that develop critical thinking and innovation skills.",
		icon: <Microscope className="w-5 h-5" />,
	},
	{
		id: "student-friendly",
		title: "Student-friendly solutions",
		description:
			"Tailored learning approaches that consider different learning styles and pace, ensuring accessibility for all students.",
		icon: <BookOpen className="w-5 h-5" />,
	},
	{
		id: "mentorship",
		title: "Strong mentorship culture",
		description:
			"Dedicated mentors who provide guidance, support, and career development throughout your learning journey.",
		icon: <Users className="w-5 h-5" />,
	},
	{
		id: "deadlines",
		title: "Commitment to deadlines",
		description:
			"Professional practices that ensure timely delivery and teach project management skills essential in any industry.",
		icon: <Clock className="w-5 h-5" />,
	},
	{
		id: "quality-first",
		title: "Quality-first development mindset",
		description:
			"Emphasis on writing clean, maintainable code and following best practices for sustainable development excellence.",
		icon: <Zap className="w-5 h-5" />,
	},
];

export function WhyChooseUsAccordion() {
	return (
		<section className="w-full py-12 px-4 md:py-16 lg:py-20 bg-white">
			<div className="mx-auto max-w-3xl">
				<div className="mb-8 text-center">
					<h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
						Why Choose <span className="text-purple-600">Us</span>
					</h2>
					<p className="mt-4 text-base text-slate-600">
						Discover what makes our approach unique and why students trust us
					</p>
				</div>

				<Accordion type="single" collapsible className="w-full space-y-3">
					{whyChooseUsData.map((item) => (
						<AccordionItem
							key={item.id}
							value={item.id}
							className="border border-slate-200 rounded-lg px-6 py-0 transition-all hover:border-purple-300 hover:bg-purple-50"
						>
							<AccordionTrigger className="text-left hover:no-underline py-4">
								<div className="flex items-start gap-4 w-full">
									<div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
										{item.icon}
									</div>
									<div className="flex-grow text-left">
										<h3 className="text-base font-semibold text-slate-900">
											{item.title}
										</h3>
									</div>
								</div>
							</AccordionTrigger>
							<AccordionContent className="pb-4 pt-0">
								<div className="ml-14 text-slate-600 text-sm leading-relaxed">
									{item.description}
								</div>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
	{
		id: 1,
		name: "Sarah Jenkins",
		role: "Web Dev Intern",
		content:
			"The web development internship at MakeTechBerry was incredible. The mentors guided me through real-world projects that completely changed my career trajectory.",
		avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
	},
	{
		id: 2,
		name: "Rahul Sharma",
		role: "CS Student",
		content:
			"Their research paper assistance was a lifesaver. The team helped me structure and format my work perfectly for my final year submission.",
		avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
	},
	{
		id: 3,
		name: "Emily Chen",
		role: "App Developer",
		content:
			"I attended the Gen-AI workshop and was blown away by the practical approach. I am now implementing these concepts in my own startup.",
		avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
	},
	{
		id: 4,
		name: "Michael Torres",
		role: "Freelance Engineer",
		content:
			"The industrial project development service provided exactly what my client needed. Clean code, timely delivery, and excellent communication.",
		avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
	},
	{
		id: 5,
		name: "Priya Patel",
		role: "Data Science Intern",
		content:
			"MakeTechBerry's Python Full Stack training is top-notch. They go beyond the basics and dive deep into production-ready architectures.",
		avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
	},
];

const TestimonialCard = ({ testimonial }) => {
	return (
		<div className="flex-shrink-0 w-[350px] md:w-[400px] bg-white rounded-2xl p-6 shadow-sm border border-purple-100 mx-4 flex flex-col hover:shadow-lg transition-shadow duration-300">
			<div className="flex items-center gap-1 mb-4 text-yellow-400">
				{[...Array(5)].map((_, i) => (
					<Star key={i} size={16} fill="currentColor" />
				))}
			</div>
			<p className="text-gray-600 text-sm md:text-base mb-6 flex-grow leading-relaxed italic">
				"{testimonial.content}"
			</p>
			<div className="flex items-center gap-4 mt-auto">
				<img
					src={testimonial.avatar}
					alt={testimonial.name}
					className="w-12 h-12 rounded-full border-2 border-purple-100 object-cover"
				/>
				<div>
					<h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
					<p className="text-xs text-purple-600 font-medium">{testimonial.role}</p>
				</div>
			</div>
		</div>
	);
};

const TestimonialsSection = () => {
	// Duplicate the array to create a seamless infinite loop
	const marqueeItems = [...testimonials, ...testimonials];

	return (
		<section className="py-20 px-0 bg-[#E7DEFE] overflow-hidden relative">
			<div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-50" />
			
			<div className="max-w-7xl mx-auto px-6 mb-12 text-center">
				<span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 bg-purple-100 text-purple-700">
					Success Stories
				</span>
				<h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
					Loved by <span className="text-[#9062FF]">Students</span> & <span className="text-[#9062FF]">Clients</span>
				</h2>
				<p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
					Don't just take our word for it. Here's what people who have worked with us have to say.
				</p>
			</div>

			<div className="relative w-full flex overflow-hidden">
				{/* Left and right fade gradients for a sleek look */}
				<div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#E7DEFE] to-transparent z-10 pointer-events-none" />
				<div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#E7DEFE] to-transparent z-10 pointer-events-none" />
				
				<motion.div
					className="flex py-4"
					animate={{
						x: ["0%", "-50%"],
					}}
					transition={{
						ease: "linear",
						duration: 30,
						repeat: Infinity,
					}}
				>
					{marqueeItems.map((testimonial, idx) => (
						<TestimonialCard key={`${testimonial.id}-${idx}`} testimonial={testimonial} />
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default TestimonialsSection;

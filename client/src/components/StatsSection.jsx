import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Users, BookOpen, Code2, Award } from "lucide-react";

const Counter = ({ value, duration = 2 }) => {
	const [count, setCount] = useState(0);
	const nodeRef = useRef(null);
	const inView = useInView(nodeRef, { once: true, margin: "-100px" });

	useEffect(() => {
		if (inView) {
			let startTime = null;
			let animationFrame;

			const animate = (currentTime) => {
				if (!startTime) startTime = currentTime;
				const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
				
				// Ease out cubic function
				const easeOut = 1 - Math.pow(1 - progress, 3);
				
				setCount(Math.floor(easeOut * value));

				if (progress < 1) {
					animationFrame = requestAnimationFrame(animate);
				} else {
					setCount(value);
				}
			};

			animationFrame = requestAnimationFrame(animate);
			return () => cancelAnimationFrame(animationFrame);
		}
	}, [inView, value, duration]);

	return <span ref={nodeRef}>{count}</span>;
};

const StatsSection = () => {
	const stats = [
		{ id: 1, name: "Projects Delivered", value: 150, icon: Code2, suffix: "+" },
		{ id: 2, name: "Interns Trained", value: 500, icon: Users, suffix: "+" },
		{ id: 3, name: "Workshops Hosted", value: 45, icon: BookOpen, suffix: "+" },
		{ id: 4, name: "Success Rate", value: 99, icon: Award, suffix: "%" },
	];

	return (
		<section className="py-20 bg-white relative overflow-hidden">
			{/* Background decorative elements */}
			<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
				<div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-50" />
				<div className="absolute top-1/2 -right-24 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50" />
			</div>

			<div className="max-w-7xl mx-auto px-6 relative z-10">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
					{stats.map((stat, index) => {
						const Icon = stat.icon;
						return (
							<motion.div
								key={stat.id}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-50px" }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className="flex flex-col items-center text-center group"
							>
								<div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-purple-100 group-hover:shadow-md">
									<Icon className="w-8 h-8 text-[#9062FF]" />
								</div>
								<div className="flex items-baseline justify-center gap-1">
									<h3 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
										<Counter value={stat.value} />
									</h3>
									<span className="text-2xl md:text-3xl font-bold text-[#9062FF]">{stat.suffix}</span>
								</div>
								<p className="mt-2 text-sm md:text-base font-semibold text-gray-500 uppercase tracking-wide">
									{stat.name}
								</p>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default StatsSection;

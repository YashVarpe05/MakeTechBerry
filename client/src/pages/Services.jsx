import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import AnimatedBackground from "../components/AnimatedBackground";
import {
	Smartphone,
	Globe,
	Code2,
	Brain,
	Cpu,
	Building2,
	Cog,
	Gauge,
	Settings2,
	CircuitBoard,
} from "lucide-react";

const ServiceIcon = ({ icon: Icon, gradient }) => (
	<div
		className="w-full h-full rounded-[24px] flex items-center justify-center"
		style={{ background: gradient }}
	>
		<div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
			<Icon className="w-12 h-12 text-white drop-shadow-lg" strokeWidth={1.5} />
		</div>
	</div>
);

const servicesContent = [
	{
		title: "Mobile Application Development",
		description:
			"We build native and cross-platform mobile applications that deliver exceptional user experiences. From iOS to Android, our apps are designed for performance, security, and scalability.",
		content: (
			<ServiceIcon
				icon={Smartphone}
				gradient="linear-gradient(to bottom right, #8b5cf6, #ec4899)"
			/>
		),
	},
	{
		title: "Web Application Development",
		description:
			"Modern, responsive web applications built with cutting-edge technologies. We create fast, accessible, and SEO-friendly websites that drive business growth.",
		content: (
			<ServiceIcon
				icon={Globe}
				gradient="linear-gradient(to bottom right, #7c3aed, #3b82f6)"
			/>
		),
	},
	{
		title: "Full Stack Development (Python-based)",
		description:
			"End-to-end Python development with Django, Flask, and FastAPI. We handle everything from database design to API development and frontend integration.",
		content: (
			<ServiceIcon
				icon={Code2}
				gradient="linear-gradient(to bottom right, #22c55e, #10b981)"
			/>
		),
	},
	{
		title: "Artificial Intelligence Solutions",
		description:
			"Custom AI solutions including natural language processing, computer vision, and predictive analytics. We transform your data into actionable intelligence.",
		content: (
			<ServiceIcon
				icon={Brain}
				gradient="linear-gradient(to bottom right, #f97316, #ef4444)"
			/>
		),
	},
	{
		title: "Machine Learning Applications",
		description:
			"From model development to deployment, we build ML systems that learn, adapt, and improve. Our solutions include recommendation engines, fraud detection, and automated decision systems.",
		content: (
			<ServiceIcon
				icon={Cpu}
				gradient="linear-gradient(to bottom right, #a855f7, #6366f1)"
			/>
		),
	},
	{
		title: "Civil Engineering Projects",
		description:
			"Innovative solutions for structural analysis, construction management, and infrastructure development. We combine engineering expertise with modern technology.",
		content: (
			<ServiceIcon
				icon={Building2}
				gradient="linear-gradient(to bottom right, #64748b, #475569)"
			/>
		),
	},
	{
		title: "Mechanical Engineering Projects",
		description:
			"CAD/CAM solutions, thermal analysis, and mechanical system design. We bring precision engineering to manufacturing and product development.",
		content: (
			<ServiceIcon
				icon={Cog}
				gradient="linear-gradient(to bottom right, #71717a, #52525b)"
			/>
		),
	},
	{
		title: "Instrumentation Engineering Projects",
		description:
			"Process control, sensor integration, and automation systems. We design and implement measurement and control solutions for industrial applications.",
		content: (
			<ServiceIcon
				icon={Gauge}
				gradient="linear-gradient(to bottom right, #0ea5e9, #0284c7)"
			/>
		),
	},
	{
		title: "Mechatronics Engineering Projects",
		description:
			"Integration of mechanical, electrical, and software systems. We create smart machines and automated systems that push the boundaries of innovation.",
		content: (
			<ServiceIcon
				icon={Settings2}
				gradient="linear-gradient(to bottom right, #14b8a6, #0d9488)"
			/>
		),
	},
	{
		title: "Embedded Systems & Electronics (EMB)",
		description:
			"Custom embedded solutions, PCB design, and IoT development. We build the intelligent hardware that powers the connected world.",
		content: (
			<ServiceIcon
				icon={CircuitBoard}
				gradient="linear-gradient(to bottom right, #f59e0b, #d97706)"
			/>
		),
	},
];

const Services = () => {
	return (
		<AnimatedBackground>
			<div className="min-h-screen relative">
				{/* Purple Blur Effect - Top */}
				<div
					aria-hidden="true"
					className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
				>
					<div
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
						className="relative left-[calc(50%-11rem)] aspect-1155/678 w-36.125 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-72.1875"
					/>
				</div>

				{/* Purple Blur Effect - Bottom */}
				<div
					aria-hidden="true"
					className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
				>
					<div
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
						className="relative left-[calc(50%+3rem)] aspect-1155/678 w-36.125 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-72.1875"
					/>
				</div>

				{/* Hero Section */}
				<section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative isolate">
					<div className="max-w-7xl mx-auto text-center">
						<p className="text-[#DF6951] font-bold text-lg uppercase tracking-widest mb-4">
							Our Services
						</p>
						<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
							What We Do
						</h1>
						<p className="text-lg sm:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
							We specialize in building modern, scalable, and intelligent
							solutions across multiple domains. Our expertise spans from
							cutting-edge software development to innovative engineering
							projects.
						</p>
					</div>
				</section>

				{/* Sticky Scroll Services Section */}
				<section className="px-4 sm:px-6 lg:px-8 pb-20">
					<div className="max-w-7xl mx-auto">
						{/* Development Services Header */}
						<div className="mb-8">
							<div className="flex items-center gap-3 mb-2">
								<div className="h-1 w-12 bg-[#7C3AED] rounded-full" />
								<span className="text-[#7C3AED] font-semibold uppercase tracking-wider text-sm">
									Development Services
								</span>
							</div>
							<p className="text-[#5E6282] max-w-2xl text-sm">
								From mobile apps to AI solutions, we deliver end-to-end
								development services.
							</p>
						</div>

						{/* Sticky Scroll Component */}
						<StickyScroll
							content={servicesContent}
							contentClassName="rounded-[24px] shadow-2xl"
						/>

						{/* Engineering Section Note */}
						<div className="mt-12 bg-white/60 backdrop-blur-sm rounded-[24px] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-purple-100">
							<div className="flex items-center gap-3 mb-4">
								<div className="h-1 w-12 bg-[#DF6951] rounded-full" />
								<span className="text-[#DF6951] font-semibold uppercase tracking-wider text-sm">
									Engineering Excellence
								</span>
							</div>
							<p className="text-[#5E6282] max-w-2xl">
								Beyond software, we bring technical expertise to complex
								engineering challenges across Civil, Mechanical,
								Instrumentation, Mechatronics, and Embedded Systems.
							</p>
						</div>
					</div>
				</section>

				{/* Why Choose Us Section */}
				<section className="py-20 px-4 sm:px-6 lg:px-8">
					<div className="max-w-7xl mx-auto">
						<div className="text-center mb-16">
							<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
								Why Choose Our Services?
							</h2>
							<p className="text-gray-500 max-w-xl mx-auto">
								What makes our approach different
							</p>
						</div>

						<div className="grid md:grid-cols-3 gap-8">
							{/* Card 1 - Hands-on Approach */}
							<div className="group bg-white rounded-[24px] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-purple-50 hover:shadow-[0_20px_50px_rgba(124,58,237,0.15)] transition-all duration-500 hover:-translate-y-2">
								<div className="mx-auto mb-6 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-200">
									<svg
										className="w-7 h-7 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
										/>
									</svg>
								</div>
								<h3 className="text-xl font-bold text-gray-900 text-center mb-3">
									Hands-on Approach
								</h3>
								<p className="text-gray-500 text-center text-sm leading-relaxed">
									We build real solutions with real impact. Every project is
									crafted with precision and delivered with excellence.
								</p>
							</div>

							{/* Card 2 - Industry Expertise */}
							<div className="group bg-white rounded-[24px] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-purple-50 hover:shadow-[0_20px_50px_rgba(124,58,237,0.15)] transition-all duration-500 hover:-translate-y-2">
								<div className="mx-auto mb-6 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg shadow-purple-200">
									<svg
										className="w-7 h-7 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
										/>
									</svg>
								</div>
								<h3 className="text-xl font-bold text-gray-900 text-center mb-3">
									Industry Expertise
								</h3>
								<p className="text-gray-500 text-center text-sm leading-relaxed">
									Get guidance from experienced professionals who understand
									current industry requirements and best practices.
								</p>
							</div>

							{/* Card 3 - End-to-End Support */}
							<div className="group bg-white rounded-[24px] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-purple-50 hover:shadow-[0_20px_50px_rgba(124,58,237,0.15)] transition-all duration-500 hover:-translate-y-2">
								<div className="mx-auto mb-6 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg shadow-pink-200">
									<svg
										className="w-7 h-7 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M13 7l5 5m0 0l-5 5m5-5H6"
										/>
									</svg>
								</div>
								<h3 className="text-xl font-bold text-gray-900 text-center mb-3">
									End-to-End Support
								</h3>
								<p className="text-gray-500 text-center text-sm leading-relaxed">
									Comprehensive support from ideation to deployment, including
									maintenance and continuous improvement.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Get Service Information Form */}
				<section className="py-16 px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto">
						<div className="bg-white rounded-[32px] p-8 md:p-12 shadow-[0_20px_50px_rgba(124,58,237,0.08)] border border-purple-100">
							<div className="text-center mb-10">
								<p className="text-[#DF6951] font-bold text-sm uppercase tracking-widest mb-3">
									Get In Touch
								</p>
								<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
									Get Service Information
								</h2>
								<p className="text-gray-500">
									Interested in our services? Get in touch for detailed
									information
								</p>
							</div>

							<form className="space-y-6">
								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Full Name *
										</label>
										<input
											type="text"
											className="w-full px-4 py-3 bg-[#f8f5ff] border border-purple-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
											placeholder="Your name"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Email Address *
										</label>
										<input
											type="email"
											className="w-full px-4 py-3 bg-[#f8f5ff] border border-purple-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
											placeholder="your@email.com"
										/>
									</div>
								</div>

								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Phone Number *
										</label>
										<input
											type="tel"
											className="w-full px-4 py-3 bg-[#f8f5ff] border border-purple-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
											placeholder="+91 XXXXX XXXXX"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Service Type *
										</label>
										<select className="w-full px-4 py-3 bg-[#f8f5ff] border border-purple-100 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
											<option value="">Select a service</option>
											<option value="mobile">Mobile App Development</option>
											<option value="web">Web Development</option>
											<option value="fullstack">Full Stack Development</option>
											<option value="ai">AI Solutions</option>
											<option value="ml">Machine Learning</option>
											<option value="engineering">Engineering Projects</option>
										</select>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Message
									</label>
									<textarea
										rows={4}
										className="w-full px-4 py-3 bg-[#f8f5ff] border border-purple-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
										placeholder="Tell us about your project requirements..."
									/>
								</div>

								<button
									type="submit"
									className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-500 transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2"
								>
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
										/>
									</svg>
									Get Service Information
								</button>
							</form>
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="py-16 px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto">
						<div className="bg-gradient-to-br from-[#7C3AED] to-[#a855f7] rounded-[32px] p-12 text-center shadow-[0_20px_50px_rgba(124,58,237,0.3)]">
							<h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
								Ready to Build Something Amazing?
							</h2>
							<p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
								Let's discuss how our expertise can help bring your vision to
								life.
							</p>
							<a
								href="/contact"
								className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#7C3AED] font-semibold rounded-full hover:bg-purple-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
							>
								Get Started
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17 8l4 4m0 0l-4 4m4-4H3"
									/>
								</svg>
							</a>
						</div>
					</div>
				</section>
			</div>
		</AnimatedBackground>
	);
};

export default Services;

import React, { useState, useEffect } from "react";
import { Instagram, Github, Mail, Disc, Twitter } from "lucide-react";

/**
 * SocialIcon Component
 * A reusable wrapper for the footer's colorful social links.
 */
const SocialIcon = ({ href, bgColor, children, ariaLabel }) => (
	<a
		href={href}
		aria-label={ariaLabel}
		className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 shadow-sm hover:shadow-lg`}
	>
		{children}
	</a>
);

/**
 * Footer Component (Vite + React Compatible)
 * - Synchronized with Global Theme: Watches for the '.dark' class on the html element.
 * - Optimized for full-width layouts with minimal side padding.
 */
export default function App() {
	const [isDarkMode, setIsDarkMode] = useState(false);

	// In a local Vite environment, this would be imported.
	// For the preview, we use the path directly to avoid build errors.
	const logoPath = "logo-no_bg-removebg-preview.png";

	// Sync with the Navbar's theme logic (Vite/Tailwind dark mode standard)
	useEffect(() => {
		const checkTheme = () => {
			setIsDarkMode(document.documentElement.classList.contains("dark"));
		};

		// Initial check
		checkTheme();

		// Observe changes to the <html> class list
		const observer = new MutationObserver(checkTheme);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => observer.disconnect();
	}, []);

	// Theme-aware styles
	const themeClasses = {
		wrapper: isDarkMode ? "bg-[#111827]" : "bg-[#FCF8F1]",
		footer: isDarkMode
			? "bg-[#111827] border-gray-800"
			: "bg-[#FCF8F1] border-gray-200",
		headline: isDarkMode ? "text-white" : "text-gray-900",
		linkHeader: isDarkMode ? "text-gray-400" : "text-gray-500",
		link: isDarkMode
			? "text-gray-300 hover:text-indigo-400"
			: "text-gray-600 hover:text-indigo-600",
		divider: isDarkMode ? "border-gray-800" : "border-gray-200",
		bottomText: isDarkMode ? "text-gray-400" : "text-gray-500",
		brandLogoText: isDarkMode ? "text-indigo-400" : "text-indigo-600",
	};

	return (
		<div
			className={`min-h-[400px] flex flex-col justify-end transition-colors duration-500 m-0 p-0 `}
		>
			{/* Spacer / Content Area */}

			<footer
				className={`py-12 px-4 sm:px-8 border-t transition-colors duration-500 w-full  bg-white`}
			>
				<div className="w-full px-6 sm:px-12 lg:px-28">
					{/* Main Footer Layout */}
					<div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-12">
						{/* Left Column: Headline & Socials */}
						<div className="max-w-lg w-full flex-shrink-0">
							<h2
								className={`text-3xl sm:text-5xl font-bold mb-8 leading-tight transition-colors duration-500 ${themeClasses.headline}`}
							>
								We love <span className="text-indigo-900">software</span>
								<br />
								and the <span className="text-indigo-900">people</span> who
								<br />
								build it.
							</h2>

							<div className="flex gap-3 flex-wrap">
								<SocialIcon href="/" bgColor="bg-blue-400" ariaLabel="Email">
									<Mail size={18} />
								</SocialIcon>

								<SocialIcon href="/" bgColor="bg-black" ariaLabel="X">
									<Twitter size={18} fill="currentColor" />
								</SocialIcon>

								<SocialIcon href="/" bgColor="bg-[#5865F2]" ariaLabel="Discord">
									<Disc size={18} />
								</SocialIcon>

								<SocialIcon
									href="/"
									bgColor="bg-pink-500"
									ariaLabel="Instagram"
								>
									<Instagram size={18} />
								</SocialIcon>

								<SocialIcon href="/" bgColor="bg-gray-800" ariaLabel="GitHub">
									<Github size={18} />
								</SocialIcon>
							</div>
						</div>

						{/* Right Columns: Navigation Grid */}
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-y-10 gap-x-12 sm:gap-x-20 lg:gap-x-32">
							{/* Column 1 */}
							<div className="min-w-[120px]">
								<h3
									className={`uppercase tracking-widest text-1xl font-bold mb-5 ${themeClasses.linkHeader}`}
								>
									Quick Links
								</h3>
								<ul className="space-y-3">
									{[
										"Home",
										"About Us",
										"Services",
										"Training",
										"Contact",
										"Testimonials",
									].map((item) => (
										<li key={item}>
											<a
												href="/"
												className={`transition-colors duration-300 font-medium text-base ${themeClasses.link}`}
											>
												{item}
											</a>
										</li>
									))}
								</ul>
							</div>

							{/* Column 2 */}
							<div className="min-w-[120px]">
								<h3
									className={`uppercase tracking-widest text-1xl font-bold mb-5 ${themeClasses.linkHeader}`}
								>
									Programs
								</h3>
								<ul className="space-y-3">
									{[
										"App Development",
										"Web Development",
										"Gen-AI Solutions",
										"Python Full Stack",
										"Internship",
									].map((item) => (
										<li key={item}>
											<a
												href="/"
												className={`transition-colors duration-300 font-medium text-base ${themeClasses.link}`}
											>
												{item}
											</a>
										</li>
									))}
								</ul>
							</div>

							{/* Column 3 */}
							<div className="col-span-2 sm:col-span-1 min-w-[120px]">
								<h3
									className={`uppercase tracking-widest text-1xl font-bold mb-5 ${themeClasses.linkHeader}`}
								>
									Support
								</h3>
								<ul className="space-y-3">
									{["Guide", "Status", "Contact us"].map((item) => (
										<li key={item}>
											<a
												href="/"
												className={`transition-colors duration-300 font-medium text-base ${themeClasses.link}`}
											>
												{item}
											</a>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>

					<div
						className={`border-t my-8 transition-colors duration-500 ${themeClasses.divider}`}
					></div>

					{/* Bottom Branding Bar */}
					<div className="flex flex-col md:flex-row justify-between items-center gap-6">
						<div className="flex items-center">
							<a
								href="/"
								className={`flex items-center gap-3 text-2xl font-black transition-colors duration-500 text-indigo-900 ${themeClasses.brandLogoText}`}
							>
								<img
									src="/images/logo.png"
									alt="MakeTechBerry Logo"
									className="h-10 w-auto"
								/>
								MakeTechBerry
							</a>
						</div>

						<div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left ">
							<p
								className={`text-1xl font-medium transition-colors duration-500 ${themeClasses.bottomText}`}
							>
								© {new Date().getFullYear()}, MakeTechBerry LLP. All rights
								reserved.
							</p>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

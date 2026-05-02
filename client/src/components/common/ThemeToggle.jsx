import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		// Initialize from localStorage or system preference
		const savedTheme = localStorage.getItem("theme");
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		
		if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
			setIsDark(true);
			document.documentElement.classList.add("dark");
		}
	}, []);

	const toggleTheme = () => {
		setIsDark((prev) => {
			const newTheme = !prev;
			if (newTheme) {
				document.documentElement.classList.add("dark");
				localStorage.setItem("theme", "dark");
			} else {
				document.documentElement.classList.remove("dark");
				localStorage.setItem("theme", "light");
			}
			return newTheme;
		});
	};

	return (
		<button
			onClick={toggleTheme}
			className="relative p-2 rounded-full overflow-hidden text-slate-700 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-[#9062FF]/50"
			aria-label="Toggle Dark Mode"
			title="Toggle Theme"
		>
			<motion.div
				initial={false}
				animate={{
					rotate: isDark ? 180 : 0,
					scale: isDark ? 0 : 1,
					opacity: isDark ? 0 : 1,
				}}
				transition={{ duration: 0.3, ease: "easeInOut" }}
				className="absolute inset-0 flex items-center justify-center"
			>
				<Sun size={20} />
			</motion.div>
			
			<motion.div
				initial={false}
				animate={{
					rotate: isDark ? 0 : -180,
					scale: isDark ? 1 : 0,
					opacity: isDark ? 1 : 0,
				}}
				transition={{ duration: 0.3, ease: "easeInOut" }}
				className="flex items-center justify-center"
			>
				<Moon size={20} />
			</motion.div>
		</button>
	);
};

export default ThemeToggle;

"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({ content, contentClassName }) => {
	const [activeCard, setActiveCard] = React.useState(0);
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		container: ref,
		offset: ["start start", "end start"],
	});
	const cardLength = content.length;

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		const cardsBreakpoints = content.map((_, index) => index / cardLength);
		const closestBreakpointIndex = cardsBreakpoints.reduce(
			(acc, breakpoint, index) => {
				const distance = Math.abs(latest - breakpoint);
				if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
					return index;
				}
				return acc;
			},
			0,
		);
		setActiveCard(closestBreakpointIndex);
	});

	// MakeTechBerry theme colors
	const backgroundColors = [
		"#f5f0ff", // light lavender
		"#ede4ff", // softer lavender
		"#e7defe", // main theme color
	];

	const linearGradients = [
		"linear-gradient(to bottom right, #8b5cf6, #a78bfa)", // purple gradient
		"linear-gradient(to bottom right, #7c3aed, #a855f7)", // violet gradient
		"linear-gradient(to bottom right, #6366f1, #8b5cf6)", // indigo to purple
	];

	const [backgroundGradient, setBackgroundGradient] = useState(
		linearGradients[0],
	);

	useEffect(() => {
		setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
	}, [activeCard]);

	return (
		<motion.div
			animate={{
				backgroundColor: backgroundColors[activeCard % backgroundColors.length],
			}}
			className="relative flex h-[32rem] justify-between gap-10 overflow-y-auto rounded-[32px] p-10 shadow-[0_20px_50px_rgba(124,58,237,0.1)] border border-purple-100"
			ref={ref}
		>
			<div className="div relative flex items-start px-4">
				<div className="max-w-2xl">
					{content.map((item, index) => (
						<div key={item.title + index} className="my-16 first:mt-10">
							<motion.h2
								initial={{
									opacity: 0,
								}}
								animate={{
									opacity: activeCard === index ? 1 : 0.3,
								}}
								className="text-2xl font-bold text-gray-900 tracking-tight"
							>
								{item.title}
							</motion.h2>
							<motion.p
								initial={{
									opacity: 0,
								}}
								animate={{
									opacity: activeCard === index ? 1 : 0.3,
								}}
								className="text-base mt-6 max-w-sm text-gray-500 leading-relaxed"
							>
								{item.description}
							</motion.p>
						</div>
					))}
					<div className="h-40" />
				</div>
			</div>
			<div
				style={{ background: backgroundGradient }}
				className={cn(
					"sticky top-10 hidden h-64 w-80 overflow-hidden rounded-[24px] bg-white lg:flex items-center justify-center shadow-xl shadow-purple-200/50",
					contentClassName,
				)}
			>
				{content[activeCard].content ?? null}
			</div>
		</motion.div>
	);
};

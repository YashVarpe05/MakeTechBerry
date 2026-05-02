import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
	const location = useLocation();
	const currentPath = location.pathname;
	const [hoveredButton, setHoveredButton] = useState(null);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const navItems = [
		{ name: "Home", path: "/" },
		{ name: "About", path: "/about" },
		{ name: "Services", path: "/services" },
		{ name: "Projects", path: "/projects" },
		{ name: "Contact", path: "/contact" },
		{ name: "Register", path: "/register" },
		{ name: "WorkShop", path: "/workshop" },
	];

	return (
		<header className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md shadow-none animate-in fade-in slide-in-from-top-2 duration-500">
			<nav className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-4 flex items-center justify-between relative">
				<Link
					to="/"
					className="flex items-center gap-2 sm:gap-3 text-xl font-semibold text-slate-900 dark:text-white hover:opacity-80 transition-opacity z-50"
				>
					<img
						src="/images/logo.png"
						className="w-10 h-10 sm:w-14 sm:h-14 object-contain drop-shadow-md"
						alt="MakeTechBerry Logo"
						onError={(e) => {
							e.target.src = "/images/logo-no_bg.png";
						}}
					/>
					<span className="text-lg sm:text-2xl font-bold text-[#373771] dark:text-purple-300 tracking-tight">
						MakeTechBerry
					</span>
				</Link>

				{/* Center Pill Navigation - Desktop */}
				<div className="hidden lg:flex items-center gap-1 bg-white/40 dark:bg-black/40 backdrop-blur-md px-3 py-2 rounded-full border border-white/30 dark:border-white/10 absolute left-1/2 -translate-x-1/2 transition-all duration-300 ease-out hover:scale-105 overflow-hidden">
					{navItems.map((item) => {
						const isActive =
							currentPath === item.path ||
							(item.path === "/" && currentPath === "/");
						const isHovered = hoveredButton === item.name;
						const shouldShowBg =
							isHovered || (isActive && hoveredButton === null);

						return (
							<Link
								key={item.name}
								to={item.path}
								onMouseEnter={() => setHoveredButton(item.name)}
								onMouseLeave={() => setHoveredButton(null)}
								className={`px-3 xl:px-4 py-1.5 text-xs xl:text-sm font-medium rounded-full 
                           transition-all duration-300 ease-out
                           ${
															shouldShowBg
																? "bg-[#9062FF] text-white"
																: "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
														}`}
							>
								{item.name}
							</Link>
						);
					})}
				</div>

				{/* Right Side - Desktop Admin Login & Mobile Menu Button */}
				<div className="flex items-center gap-2 sm:gap-4 ml-auto">
					<ThemeToggle />
					<Link
						to="/admin/login"
						className="hidden sm:block px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-full border-2 border-[#9062FF]
                       text-[#9062FF] dark:text-purple-300 dark:border-purple-400 transition-all duration-300 ease-out
                       hover:bg-[#9062FF] hover:text-white dark:hover:bg-purple-500 hover:scale-105"
					>
						Admin Login
					</Link>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-gray-100 transition-colors z-50"
						aria-label="Toggle menu"
					>
						{mobileMenuOpen ? (
							<X className="w-6 h-6" />
						) : (
							<Menu className="w-6 h-6" />
						)}
					</button>
				</div>

				{/* Mobile Menu */}
				{mobileMenuOpen && (
					<div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-t border-white/30 py-4 animate-in slide-in-from-top-2 duration-200">
						<div className="flex flex-col space-y-2 px-4">
							{navItems.map((item) => {
								const isActive =
									currentPath === item.path ||
									(item.path === "/" && currentPath === "/");
								return (
									<Link
										key={item.name}
										to={item.path}
										onClick={() => setMobileMenuOpen(false)}
										className={`px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
											isActive
												? "bg-[#9062FF] text-white"
												: "text-slate-700 hover:bg-gray-100"
										}`}
									>
										{item.name}
									</Link>
								);
							})}
							<Link
								to="/admin/login"
								onClick={() => setMobileMenuOpen(false)}
								className="px-4 py-3 rounded-lg text-base font-semibold border-2 border-[#9062FF] text-[#9062FF] hover:bg-[#9062FF] hover:text-white transition-all duration-200 text-center"
							>
								Admin Login
							</Link>
						</div>
					</div>
				)}
			</nav>
		</header>
	);
};

export default Navbar;

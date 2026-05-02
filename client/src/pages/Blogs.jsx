import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Loader2 } from "lucide-react";
import api from "../services/api";
import SEO from "../components/common/SEO";

const Blogs = () => {
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				const response = await api.get(`/blogs`);
				setBlogs(response.data.data);
			} catch (error) {
				console.error("Error fetching blogs:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchBlogs();
	}, []);

	return (
		<div className="min-h-screen pt-24 pb-12 bg-[#E7DEFE] dark:bg-slate-950 transition-colors duration-300">
			<SEO 
				title="Blog & Case Studies" 
				description="Read our latest insights, case studies, and updates from MakeTechBerry."
			/>
			<div className="max-w-7xl mx-auto px-6">
				<div className="text-center mb-16">
					<span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 bg-[#9062FF]/10 text-[#9062FF]">
						Our Insights
					</span>
					<h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
						Blog & <span className="text-[#9062FF]">Case Studies</span>
					</h1>
					<p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						Discover the latest trends in technology, read our success stories, and stay updated with MakeTechBerry.
					</p>
				</div>

				{loading ? (
					<div className="flex justify-center items-center py-20">
						<Loader2 className="w-10 h-10 animate-spin text-[#9062FF]" />
					</div>
				) : blogs.length === 0 ? (
					<div className="text-center py-20 bg-white/50 dark:bg-slate-900/50 rounded-3xl backdrop-blur-sm border border-purple-100 dark:border-slate-800">
						<p className="text-xl text-gray-500 dark:text-gray-400 font-medium">No posts available yet. Check back soon!</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{blogs.map((blog) => (
							<Link
								key={blog._id}
								to={`/blogs/${blog.slug}`}
								className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-800 flex flex-col hover:-translate-y-2"
							>
								<div className="relative h-48 overflow-hidden">
									<img
										src={blog.coverImage || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"}
										alt={blog.title}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
									/>
									<div className="absolute top-4 left-4 flex flex-wrap gap-2">
										{blog.tags?.slice(0, 2).map((tag, i) => (
											<span key={i} className="px-3 py-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-full text-xs font-bold text-[#9062FF]">
												{tag}
											</span>
										))}
									</div>
								</div>
								
								<div className="p-6 flex flex-col flex-grow">
									<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-[#9062FF] transition-colors">
										{blog.title}
									</h3>
									<p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3">
										{blog.summary}
									</p>
									
									<div className="mt-auto pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
										<div className="flex items-center gap-1.5">
											<User size={14} />
											<span className="font-medium">{blog.author}</span>
										</div>
										<div className="flex items-center gap-1.5">
											<Calendar size={14} />
											<span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Blogs;

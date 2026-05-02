import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, User, ArrowLeft, Loader2, Tag } from "lucide-react";
import api from "../services/api";
import SEO from "../components/common/SEO";

const BlogDetail = () => {
	const { slug } = useParams();
	const [blog, setBlog] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchBlog = async () => {
			try {
				const response = await api.get(`/blogs/${slug}`);
				setBlog(response.data.data);
			} catch (err) {
				console.error("Error fetching blog:", err);
				setError("Blog not found.");
			} finally {
				setLoading(false);
			}
		};
		fetchBlog();
	}, [slug]);

	if (loading) {
		return (
			<div className="min-h-screen pt-32 flex justify-center bg-[#E7DEFE] dark:bg-slate-950">
				<Loader2 className="w-10 h-10 animate-spin text-[#9062FF]" />
			</div>
		);
	}

	if (error || !blog) {
		return (
			<div className="min-h-screen pt-32 text-center bg-[#E7DEFE] dark:bg-slate-950 px-6">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Oops! Post not found.</h1>
				<Link to="/blogs" className="inline-flex items-center text-[#9062FF] font-semibold hover:underline">
					<ArrowLeft className="w-4 h-4 mr-2" /> Back to all posts
				</Link>
			</div>
		);
	}

	return (
		<div className="min-h-screen pt-24 pb-20 bg-white dark:bg-slate-950 transition-colors duration-300">
			<SEO 
				title={blog.title} 
				description={blog.summary}
				type="article"
			/>
			
			<div className="max-w-4xl mx-auto px-6">
				<Link to="/blogs" className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-[#9062FF] mb-8 font-medium transition-colors">
					<ArrowLeft className="w-4 h-4 mr-2" /> Back to all posts
				</Link>

				<div className="mb-10 text-center">
					<div className="flex flex-wrap justify-center gap-2 mb-6">
						{blog.tags?.map((tag, i) => (
							<span key={i} className="px-3 py-1 bg-purple-50 dark:bg-slate-900 rounded-full text-xs font-bold text-[#9062FF] border border-purple-100 dark:border-slate-800">
								{tag}
							</span>
						))}
					</div>
					<h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
						{blog.title}
					</h1>
					<div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
						<div className="flex items-center gap-2">
							<div className="w-8 h-8 rounded-full bg-[#E7DEFE] flex items-center justify-center text-[#9062FF] font-bold">
								{blog.author.charAt(0)}
							</div>
							<span className="font-semibold text-gray-700 dark:text-gray-300">{blog.author}</span>
						</div>
						<div className="flex items-center gap-1.5">
							<Calendar size={16} />
							<span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-5xl mx-auto px-6 mb-12">
				<div className="aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-2xl">
					<img 
						src={blog.coverImage || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"} 
						alt={blog.title}
						className="w-full h-full object-cover"
					/>
				</div>
			</div>

			<div className="max-w-3xl mx-auto px-6">
				{/* Simple Markdown/HTML rendering simulation for now - in prod use a proper markdown parser or dangerouslySetInnerHTML if trusted */}
				<div 
					className="prose prose-lg dark:prose-invert prose-purple max-w-none 
						prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
						prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed
						prose-a:text-[#9062FF] hover:prose-a:text-purple-500"
					dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br/>') }}
				/>
			</div>
		</div>
	);
};

export default BlogDetail;

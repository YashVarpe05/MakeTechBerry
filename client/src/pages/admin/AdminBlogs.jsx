import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Loader2, Image as ImageIcon, Eye, EyeOff } from "lucide-react";
import api from "../../services/api";
import toast from "react-hot-toast";

const AdminBlogs = () => {
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [editingId, setEditingId] = useState(null);

	const [formData, setFormData] = useState({
		title: "",
		summary: "",
		content: "",
		coverImage: "",
		tags: "",
		author: "MakeTechBerry Team",
		isPublished: true,
	});

	const fetchBlogs = async () => {
		try {
			setLoading(true);
			const response = await api.get(`/blogs?all=true`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
				},
			});
			setBlogs(response.data.data);
		} catch (error) {
			console.error("Error fetching blogs:", error);
			toast.error("Failed to load blogs");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchBlogs();
	}, []);

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		
		try {
			const token = localStorage.getItem("adminToken");
			const config = { headers: { Authorization: `Bearer ${token}` } };
			
			// Format tags from comma-separated string to array
			const payload = {
				...formData,
				tags: typeof formData.tags === 'string' ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : formData.tags
			};

			if (editingId) {
				await api.put(`/blogs/${editingId}`, payload, config);
				toast.success("Blog updated successfully");
			} else {
				await api.post(`/blogs`, payload, config);
				toast.success("Blog created successfully");
			}
			
			closeModal();
			fetchBlogs();
		} catch (error) {
			console.error("Error saving blog:", error);
			toast.error(error.response?.data?.message || "Failed to save blog");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDelete = async (id) => {
		if (window.confirm("Are you sure you want to delete this blog post?")) {
			try {
				const token = localStorage.getItem("adminToken");
				await api.delete(`/blogs/${id}`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				toast.success("Blog deleted successfully");
				fetchBlogs();
			} catch (error) {
				console.error("Error deleting blog:", error);
				toast.error("Failed to delete blog");
			}
		}
	};

	const openModalForEdit = (blog) => {
		setEditingId(blog._id);
		setFormData({
			title: blog.title,
			summary: blog.summary,
			content: blog.content,
			coverImage: blog.coverImage || "",
			tags: blog.tags ? blog.tags.join(", ") : "",
			author: blog.author || "MakeTechBerry Team",
			isPublished: blog.isPublished,
		});
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setEditingId(null);
		setFormData({
			title: "",
			summary: "",
			content: "",
			coverImage: "",
			tags: "",
			author: "MakeTechBerry Team",
			isPublished: true,
		});
	};

	return (
		<div className="p-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-2xl font-bold text-gray-900 dark:text-white">Blogs & Case Studies</h1>
				<button
					onClick={() => setIsModalOpen(true)}
					className="flex items-center gap-2 px-4 py-2 bg-[#9062FF] text-white rounded-lg hover:bg-purple-700 transition-colors"
				>
					<Plus size={20} />
					<span>Add New Post</span>
				</button>
			</div>

			{loading ? (
				<div className="flex justify-center items-center py-20">
					<Loader2 className="w-10 h-10 animate-spin text-[#9062FF]" />
				</div>
			) : (
				<div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
					<div className="overflow-x-auto">
						<table className="w-full text-left">
							<thead className="bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 text-sm border-b border-gray-100 dark:border-slate-700">
								<tr>
									<th className="p-4 font-semibold">Title</th>
									<th className="p-4 font-semibold">Author</th>
									<th className="p-4 font-semibold">Status</th>
									<th className="p-4 font-semibold">Date</th>
									<th className="p-4 font-semibold text-right">Actions</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-100 dark:divide-slate-800">
								{blogs.length === 0 ? (
									<tr>
										<td colSpan="5" className="p-8 text-center text-gray-500">
											No blogs found. Create your first post!
										</td>
									</tr>
								) : (
									blogs.map((blog) => (
										<tr key={blog._id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
											<td className="p-4">
												<div className="flex items-center gap-3">
													<div className="w-10 h-10 rounded overflow-hidden bg-gray-100 shrink-0">
														{blog.coverImage ? (
															<img src={blog.coverImage} alt="" className="w-full h-full object-cover" />
														) : (
															<div className="w-full h-full flex items-center justify-center text-gray-400">
																<ImageIcon size={16} />
															</div>
														)}
													</div>
													<div>
														<p className="font-medium text-gray-900 dark:text-white line-clamp-1">{blog.title}</p>
														<p className="text-xs text-gray-500 line-clamp-1">{blog.slug}</p>
													</div>
												</div>
											</td>
											<td className="p-4 text-sm text-gray-600 dark:text-gray-300">{blog.author}</td>
											<td className="p-4">
												<span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
													blog.isPublished 
														? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
														: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
												}`}>
													{blog.isPublished ? <><Eye size={12}/> Published</> : <><EyeOff size={12}/> Draft</>}
												</span>
											</td>
											<td className="p-4 text-sm text-gray-500">
												{new Date(blog.createdAt).toLocaleDateString()}
											</td>
											<td className="p-4 text-right">
												<div className="flex items-center justify-end gap-2">
													<button
														onClick={() => openModalForEdit(blog)}
														className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
														title="Edit"
													>
														<Edit2 size={16} />
													</button>
													<button
														onClick={() => handleDelete(blog._id)}
														className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
														title="Delete"
													>
														<Trash2 size={16} />
													</button>
												</div>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>
			)}

			{/* Create/Edit Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
					<div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
						<div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-slate-800">
							<h2 className="text-xl font-bold text-gray-900 dark:text-white">
								{editingId ? "Edit Blog Post" : "Create New Blog Post"}
							</h2>
							<button onClick={closeModal} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
								<X size={24} />
							</button>
						</div>

						<div className="p-6 overflow-y-auto custom-scrollbar">
							<form id="blogForm" onSubmit={handleSubmit} className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-1 md:col-span-2">
										<label className="text-sm font-medium text-gray-700 dark:text-gray-300">Title <span className="text-red-500">*</span></label>
										<input
											type="text"
											name="title"
											required
											value={formData.title}
											onChange={handleInputChange}
											className="w-full px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-[#9062FF] focus:border-transparent dark:bg-slate-800 dark:text-white"
											placeholder="e.g. 10 Web Design Trends for 2026"
										/>
									</div>

									<div className="space-y-1 md:col-span-2">
										<label className="text-sm font-medium text-gray-700 dark:text-gray-300">Summary <span className="text-red-500">*</span></label>
										<textarea
											name="summary"
											required
											value={formData.summary}
											onChange={handleInputChange}
											rows={2}
											className="w-full px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-[#9062FF] focus:border-transparent dark:bg-slate-800 dark:text-white resize-none"
											placeholder="A brief 1-2 sentence description..."
										/>
									</div>

									<div className="space-y-1">
										<label className="text-sm font-medium text-gray-700 dark:text-gray-300">Author</label>
										<input
											type="text"
											name="author"
											value={formData.author}
											onChange={handleInputChange}
											className="w-full px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-[#9062FF] focus:border-transparent dark:bg-slate-800 dark:text-white"
										/>
									</div>

									<div className="space-y-1">
										<label className="text-sm font-medium text-gray-700 dark:text-gray-300">Cover Image URL</label>
										<input
											type="url"
											name="coverImage"
											value={formData.coverImage}
											onChange={handleInputChange}
											className="w-full px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-[#9062FF] focus:border-transparent dark:bg-slate-800 dark:text-white"
											placeholder="https://..."
										/>
									</div>

									<div className="space-y-1 md:col-span-2">
										<label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tags (comma separated)</label>
										<input
											type="text"
											name="tags"
											value={formData.tags}
											onChange={handleInputChange}
											className="w-full px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-[#9062FF] focus:border-transparent dark:bg-slate-800 dark:text-white"
											placeholder="React, Design, Tech"
										/>
									</div>

									<div className="space-y-1 md:col-span-2">
										<label className="text-sm font-medium text-gray-700 dark:text-gray-300">Content <span className="text-red-500">*</span> (Supports Markdown/HTML formatting)</label>
										<textarea
											name="content"
											required
											value={formData.content}
											onChange={handleInputChange}
											rows={10}
											className="w-full px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-[#9062FF] focus:border-transparent dark:bg-slate-800 dark:text-white font-mono text-sm"
											placeholder="Write your article here..."
										/>
									</div>

									<div className="md:col-span-2 pt-2">
										<label className="flex items-center gap-3 cursor-pointer">
											<div className="relative">
												<input
													type="checkbox"
													name="isPublished"
													checked={formData.isPublished}
													onChange={handleInputChange}
													className="sr-only peer"
												/>
												<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#9062FF]"></div>
											</div>
											<span className="text-sm font-medium text-gray-900 dark:text-gray-300">Publish Post Immediately</span>
										</label>
									</div>
								</div>
							</form>
						</div>

						<div className="p-6 border-t border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/50 flex justify-end gap-3">
							<button
								type="button"
								onClick={closeModal}
								className="px-5 py-2 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
							>
								Cancel
							</button>
							<button
								type="submit"
								form="blogForm"
								disabled={isSubmitting}
								className="flex items-center gap-2 px-5 py-2 bg-[#9062FF] text-white font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-70"
							>
								{isSubmitting && <Loader2 size={16} className="animate-spin" />}
								<span>{editingId ? "Update Post" : "Create Post"}</span>
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AdminBlogs;

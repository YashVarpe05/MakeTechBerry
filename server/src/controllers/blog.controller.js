import Blog from "../models/Blog.model.js";

// @desc    Create a new blog
// @route   POST /api/blogs
export const createBlog = async (req, res, next) => {
  try {
    const { title, summary, content, coverImage, tags, author, isPublished } = req.body;
    
    // Create a URL-friendly slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const blog = await Blog.create({
      title,
      slug,
      summary,
      content,
      coverImage,
      tags,
      author,
      isPublished
    });

    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "A blog with a similar title already exists." });
    }
    next(error);
  }
};

// @desc    Get all blogs (public view: only published)
// @route   GET /api/blogs
export const getBlogs = async (req, res, next) => {
  try {
    const { all } = req.query; // Admin can pass ?all=true to see unpublished
    const query = all === "true" ? {} : { isPublished: true };
    
    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single blog by slug
// @route   GET /api/blogs/:slug
export const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a blog
// @route   PUT /api/blogs/:id
export const updateBlog = async (req, res, next) => {
  try {
    const { title, summary, content, coverImage, tags, author, isPublished } = req.body;
    
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, summary, content, coverImage, tags, author, isPublished },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    next(error);
  }
};

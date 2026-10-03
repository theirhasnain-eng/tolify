import asyncHandler from 'express-async-handler';
import Post from '../models/Post.js';

// @desc    Get all blog posts (with search & category filter)
// @route   GET /api/posts
// @access  Public
export const getPosts = asyncHandler(async (req, res) => {
  const { category, search, limit } = req.query;
  let query = { published: true };

  if (category && category !== 'All') {
    query.category = category;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } },
      { keywords: { $in: [new RegExp(search, 'i')] } },
    ];
  }

  const postsQuery = Post.find(query).sort({ createdAt: -1 });

  if (limit) {
    postsQuery.limit(Number(limit));
  }

  const posts = await postsQuery;
  res.json(posts);
});

// @desc    Get all blog posts including unpublished (Admin)
// @route   GET /api/posts/admin/all
// @access  Private/Admin
export const getAdminPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).sort({ createdAt: -1 });
  res.json(posts);
});

// @desc    Get single post by slug & increment views
// @route   GET /api/posts/slug/:slug
// @access  Public
export const getPostBySlug = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });

  if (post) {
    // Increment view counter
    post.views += 1;
    await post.save({ validateBeforeSave: false });

    res.json(post);
  } else {
    res.status(404);
    throw new Error('Article not found');
  }
});

// @desc    Get single post by ID
// @route   GET /api/posts/:id
// @access  Public
export const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error('Article not found');
  }
});

// @desc    Create a new post (Admin)
// @route   POST /api/posts
// @access  Private/Admin
export const createPost = asyncHandler(async (req, res) => {
  const {
    title,
    slug,
    category,
    excerpt,
    content,
    seoTitle,
    seoDescription,
    keywords,
    associatedTool,
    thumbnailUrl,
    readTime,
    published,
  } = req.body;

  if (!title || !content || !excerpt) {
    res.status(400);
    throw new Error('Title, excerpt, and content are required');
  }

  // Generate slug if not provided
  const postSlug = slug
    ? slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const slugExists = await Post.findOne({ slug: postSlug });
  if (slugExists) {
    res.status(400);
    throw new Error('An article with this slug already exists');
  }

  // Parse keywords array if provided as comma-separated string
  let parsedKeywords = [];
  if (Array.isArray(keywords)) {
    parsedKeywords = keywords;
  } else if (typeof keywords === 'string') {
    parsedKeywords = keywords.split(',').map((k) => k.trim()).filter(Boolean);
  }

  const post = new Post({
    title,
    slug: postSlug,
    category: category || 'SaaS & Growth',
    excerpt,
    content,
    seoTitle: seoTitle || title,
    seoDescription: seoDescription || excerpt.substring(0, 155),
    keywords: parsedKeywords,
    associatedTool: associatedTool || null,
    thumbnailUrl: thumbnailUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    readTime: readTime || 5,
    published: published !== undefined ? published : true,
  });

  const createdPost = await post.save();
  res.status(201).json(createdPost);
});

// @desc    Update a post (Admin)
// @route   PUT /api/posts/:id
// @access  Private/Admin
export const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    const {
      title,
      slug,
      category,
      excerpt,
      content,
      seoTitle,
      seoDescription,
      keywords,
      associatedTool,
      thumbnailUrl,
      readTime,
      published,
    } = req.body;

    post.title = title || post.title;
    if (slug) {
      post.slug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    post.category = category || post.category;
    post.excerpt = excerpt || post.excerpt;
    post.content = content || post.content;
    post.seoTitle = seoTitle !== undefined ? seoTitle : post.seoTitle;
    post.seoDescription = seoDescription !== undefined ? seoDescription : post.seoDescription;

    if (keywords !== undefined) {
      if (Array.isArray(keywords)) {
        post.keywords = keywords;
      } else if (typeof keywords === 'string') {
        post.keywords = keywords.split(',').map((k) => k.trim()).filter(Boolean);
      }
    }

    post.associatedTool = associatedTool !== undefined ? associatedTool : post.associatedTool;
    post.thumbnailUrl = thumbnailUrl || post.thumbnailUrl;
    post.readTime = readTime || post.readTime;
    if (published !== undefined) post.published = published;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error('Article not found');
  }
});

// @desc    Delete a post (Admin)
// @route   DELETE /api/posts/:id
// @access  Private/Admin
export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    await post.deleteOne();
    res.json({ message: 'Article removed successfully' });
  } else {
    res.status(404);
    throw new Error('Article not found');
  }
});

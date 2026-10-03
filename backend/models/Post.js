import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Post title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Post slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['SaaS & Growth', 'Developer Rates', 'SEO & Marketing', 'Engineering'],
      default: 'SaaS & Growth',
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
      maxlength: 300,
    },
    content: {
      type: String,
      required: [true, 'Content body is required'],
    },
    seoTitle: {
      type: String,
      trim: true,
    },
    seoDescription: {
      type: String,
      trim: true,
      maxlength: 160,
    },
    keywords: [
      {
        type: String,
        trim: true,
      },
    ],
    associatedTool: {
      type: String,
      default: null, // e.g. 'saas-calculator', 'hourly-rate-calculator', 'seo-meta-generator'
    },
    thumbnailUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    },
    author: {
      name: { type: String, default: 'DevMetrics Editorial Team' },
      role: { type: String, default: 'US Tech & SaaS Industry Analysts' },
    },
    readTime: {
      type: Number,
      default: 5, // in minutes
    },
    views: {
      type: Number,
      default: 0,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search optimization
postSchema.index({ title: 'text', excerpt: 'text', content: 'text', keywords: 'text' });

const Post = mongoose.model('Post', postSchema);
export default Post;

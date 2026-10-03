import asyncHandler from 'express-async-handler';
import Post from '../models/Post.js';
import ToolData from '../models/ToolData.js';

// @desc    Generate dynamic XML Sitemap
// @route   GET /sitemap.xml
// @access  Public
export const getSitemap = asyncHandler(async (req, res) => {
  const baseUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  const posts = await Post.find({ published: true }).select('slug updatedAt');
  const tools = await ToolData.find({}).select('toolId updatedAt');

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Static routes
  const staticRoutes = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/tools', priority: '0.9', changefreq: 'weekly' },
  ];

  staticRoutes.forEach((route) => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${route.url}</loc>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  // Dynamic Blog Posts
  posts.forEach((post) => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/article/${post.slug}</loc>\n`;
    xml += `    <lastmod>${post.updatedAt.toISOString().split('T')[0]}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });

  // Dynamic Tools
  tools.forEach((tool) => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/tools#${tool.toolId}</loc>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// @desc    Generate robots.txt
// @route   GET /robots.txt
// @access  Public
export const getRobotsTxt = asyncHandler(async (req, res) => {
  const baseUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  const content = `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${baseUrl}/sitemap.xml\n`;
  res.header('Content-Type', 'text/plain');
  res.send(content);
});

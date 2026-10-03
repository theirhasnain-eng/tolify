import asyncHandler from 'express-async-handler';
import ToolData from '../models/ToolData.js';
import UsageLog from '../models/UsageLog.js';
import Post from '../models/Post.js';

// @desc    Get all tools metadata & usage metrics
// @route   GET /api/tools
// @access  Public
export const getTools = asyncHandler(async (req, res) => {
  const tools = await ToolData.find({}).sort({ usageCount: -1 });
  res.json(tools);
});

// @desc    Log tool execution action
// @route   POST /api/tools/:toolId/use
// @access  Public
export const recordToolUse = asyncHandler(async (req, res) => {
  const { toolId } = req.params;
  const { action } = req.body;

  let tool = await ToolData.findOne({ toolId });

  if (!tool) {
    // Auto-create tool entry if doesn't exist yet
    tool = new ToolData({
      toolId,
      name: toolId.replace(/-/g, ' ').toUpperCase(),
      description: 'Interactive developer & SaaS utility',
      category: 'Utilities',
      usageCount: 1,
    });
  } else {
    tool.usageCount += 1;
  }

  await tool.save();

  // Record usage log
  await UsageLog.create({
    toolId,
    action: action || 'calculate',
    userIp: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1',
  });

  res.json({ success: true, usageCount: tool.usageCount });
});

// @desc    Get Admin Analytics Overview
// @route   GET /api/tools/analytics/overview
// @access  Private/Admin
export const getAnalyticsOverview = asyncHandler(async (req, res) => {
  const totalPosts = await Post.countDocuments({});
  const publishedPosts = await Post.countDocuments({ published: true });
  const totalTools = await ToolData.countDocuments({});
  
  const postsViewsAggregation = await Post.aggregate([
    { $group: { _id: null, totalViews: { $sum: '$views' } } },
  ]);
  const totalViews = postsViewsAggregation[0]?.totalViews || 0;

  const toolsUsageAggregation = await ToolData.aggregate([
    { $group: { _id: null, totalUsage: { $sum: '$usageCount' } } },
  ]);
  const totalToolExecutions = toolsUsageAggregation[0]?.totalUsage || 0;

  const recentLogs = await UsageLog.find({}).sort({ createdAt: -1 }).limit(10);

  res.json({
    totalPosts,
    publishedPosts,
    totalViews,
    totalTools,
    totalToolExecutions,
    recentActivity: recentLogs,
  });
});

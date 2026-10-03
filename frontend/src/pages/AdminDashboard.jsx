import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  FileText,
  Wrench,
  Plus,
  Edit,
  Trash2,
  Search,
  Eye,
  TrendingUp,
  BarChart2,
  X,
  Check,
  AlertCircle,
  Sparkles,
  RefreshCw,
  Globe,
  Tag,
} from 'lucide-react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import SeoHead from '../components/SeoHead';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('articles'); // 'articles' | 'analytics' | 'tools'
  const [posts, setPosts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  // Form State for Create/Edit
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'SaaS & Growth',
    excerpt: '',
    content: '',
    seoTitle: '',
    seoDescription: '',
    keywords: '',
    associatedTool: '',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    readTime: 5,
    published: true,
  });

  const [formError, setFormError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [postsRes, analyticsRes, toolsRes] = await Promise.all([
        API.get('/posts/admin/all'),
        API.get('/tools/analytics/overview'),
        API.get('/tools'),
      ]);
      setPosts(postsRes.data);
      setAnalytics(analyticsRes.data);
      setTools(toolsRes.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      slug: '',
      category: 'SaaS & Growth',
      excerpt: '',
      content: '<h2>Title Section</h2>\n<p>Write your detailed article body here...</p>',
      seoTitle: '',
      seoDescription: '',
      keywords: 'US SaaS, Developer Rates',
      associatedTool: '',
      thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      readTime: 5,
      published: true,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      category: post.category,
      excerpt: post.excerpt,
      content: post.content,
      seoTitle: post.seoTitle || post.title,
      seoDescription: post.seoDescription || post.excerpt,
      keywords: post.keywords ? post.keywords.join(', ') : '',
      associatedTool: post.associatedTool || '',
      thumbnailUrl: post.thumbnailUrl,
      readTime: post.readTime || 5,
      published: post.published !== undefined ? post.published : true,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setIsSaving(true);

    try {
      if (editingPost) {
        // Update existing article
        await API.put(`/posts/${editingPost._id}`, formData);
      } else {
        // Create new article
        await API.post('/posts', formData);
      }

      setIsModalOpen(false);
      fetchDashboardData();
    } catch (error) {
      setFormError(error.response?.data?.message || 'Failed to save post');
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!postToDelete) return;
    try {
      await API.delete(`/posts/${postToDelete._id}`);
      setIsDeleteModalOpen(false);
      setPostToDelete(null);
      fetchDashboardData();
    } catch (error) {
      console.error('Delete post error:', error);
    }
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <SeoHead title="Admin Dashboard | DevMetrics Hub" description="Manage platform content, interactive tools, and view analytics." />

      <main className="min-h-screen bg-dark-base text-gray-100 pb-16">
        {/* Header Bar */}
        <header className="bg-dark-card border-b border-gray-800 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 uppercase tracking-wider">
                <LayoutDashboard className="w-4 h-4" /> Secure Admin Operations Portal
              </div>
              <h1 className="text-2xl font-bold text-white mt-1">Platform Management Dashboard</h1>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">
                Logged in as <strong className="text-white">{user?.name || 'Administrator'}</strong>
              </span>
              <button
                onClick={handleOpenCreateModal}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-lg transition-all"
              >
                <Plus className="w-4 h-4" /> Create New Article
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-gray-800 pb-4 mb-8">
            <button
              onClick={() => setActiveTab('articles')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'articles'
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'bg-dark-card hover:bg-gray-800 text-gray-400 border border-gray-800'
              }`}
            >
              <FileText className="w-4 h-4" /> Articles CRUD ({posts.length})
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'analytics'
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'bg-dark-card hover:bg-gray-800 text-gray-400 border border-gray-800'
              }`}
            >
              <BarChart2 className="w-4 h-4" /> Platform Analytics Overview
            </button>
            <button
              onClick={() => setActiveTab('tools')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'tools'
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'bg-dark-card hover:bg-gray-800 text-gray-400 border border-gray-800'
              }`}
            >
              <Wrench className="w-4 h-4" /> Interactive Web Tools ({tools.length})
            </button>
          </div>

          {/* TAB 1: ARTICLES CRUD TABLE */}
          {activeTab === 'articles' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search articles by title or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-dark-card border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="glass-panel rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-900/80 text-gray-400 uppercase text-[11px] font-semibold border-b border-gray-800">
                      <tr>
                        <th className="px-6 py-3.5">Article Details</th>
                        <th className="px-6 py-3.5">Category</th>
                        <th className="px-6 py-3.5">SEO Slug</th>
                        <th className="px-6 py-3.5">Associated Tool</th>
                        <th className="px-6 py-3.5">Views</th>
                        <th className="px-6 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/60">
                      {filteredPosts.map((post) => (
                        <tr key={post._id} className="hover:bg-gray-900/40 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={post.thumbnailUrl}
                                alt=""
                                className="w-10 h-10 rounded-lg object-cover bg-gray-800 shrink-0"
                              />
                              <div>
                                <a
                                  href={`/article/${post.slug}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="font-bold text-white hover:text-brand-400 line-clamp-1"
                                >
                                  {post.title}
                                </a>
                                <span className="text-[10px] text-gray-500 font-mono">
                                  {new Date(post.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20">
                              {post.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-mono text-gray-400 text-[11px] max-w-[150px] truncate">
                            /{post.slug}
                          </td>
                          <td className="px-6 py-4">
                            {post.associatedTool ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                {post.associatedTool}
                              </span>
                            ) : (
                              <span className="text-gray-600 text-[11px]">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4 font-mono font-bold text-gray-300">
                            {post.views}
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button
                              onClick={() => handleOpenEditModal(post)}
                              className="p-1.5 rounded-lg bg-gray-800 hover:bg-brand-600 text-gray-300 hover:text-white transition-colors"
                              title="Edit Article"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setPostToDelete(post);
                                setIsDeleteModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg bg-gray-800 hover:bg-rose-600 text-gray-300 hover:text-white transition-colors"
                              title="Delete Article"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ANALYTICS OVERVIEW */}
          {activeTab === 'analytics' && analytics && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-panel p-6 rounded-2xl border border-gray-800">
                  <span className="text-xs text-gray-400 uppercase font-semibold">Total Published Articles</span>
                  <div className="text-3xl font-extrabold text-white font-mono mt-2">{analytics.publishedPosts}</div>
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-gray-800">
                  <span className="text-xs text-gray-400 uppercase font-semibold">Total Article Views</span>
                  <div className="text-3xl font-extrabold text-brand-400 font-mono mt-2">{analytics.totalViews}</div>
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-gray-800">
                  <span className="text-xs text-gray-400 uppercase font-semibold">Registered Web Tools</span>
                  <div className="text-3xl font-extrabold text-emerald-400 font-mono mt-2">{analytics.totalTools}</div>
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-gray-800">
                  <span className="text-xs text-gray-400 uppercase font-semibold">Total Tool Executions</span>
                  <div className="text-3xl font-extrabold text-sky-400 font-mono mt-2">{analytics.totalToolExecutions}</div>
                </div>
              </div>

              {/* Recent Activity Log */}
              <div className="glass-panel p-6 rounded-2xl border border-gray-800">
                <h3 className="text-base font-bold text-white mb-4">Recent Tool Execution Logs</h3>
                <div className="space-y-3">
                  {analytics.recentActivity?.map((log) => (
                    <div key={log._id} className="p-3 rounded-xl bg-gray-900/60 border border-gray-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-brand-400" />
                        <span className="font-mono text-white font-semibold">{log.toolId}</span>
                        <span className="text-gray-400">({log.action})</span>
                      </div>
                      <time className="text-gray-500 font-mono">{new Date(log.createdAt).toLocaleString()}</time>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TOOLS REGISTRY */}
          {activeTab === 'tools' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <div key={tool._id} className="glass-panel p-6 rounded-2xl border border-gray-800">
                  <span className="text-xs font-bold text-brand-400 uppercase">{tool.category}</span>
                  <h3 className="text-lg font-bold text-white mt-1">{tool.name}</h3>
                  <p className="text-xs text-gray-400 mt-2">{tool.description}</p>
                  <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between text-xs">
                    <span className="text-gray-400">Total Executions:</span>
                    <span className="font-mono font-bold text-brand-400 text-sm">{tool.usageCount}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CREATE / EDIT ARTICLE MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-dark-card border border-gray-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
              <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                <h3 className="text-xl font-bold text-white">
                  {editingPost ? 'Edit Article' : 'Create New Article'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {formError}
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3.5 py-2 bg-dark-base border border-gray-700 rounded-xl text-xs text-white focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">URL Slug</label>
                    <input
                      type="text"
                      placeholder="auto-generated-if-empty"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-3.5 py-2 bg-dark-base border border-gray-700 rounded-xl text-xs text-white font-mono focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2 bg-dark-base border border-gray-700 rounded-xl text-xs text-white focus:border-brand-500 focus:outline-none"
                    >
                      <option value="SaaS & Growth">SaaS & Growth</option>
                      <option value="Developer Rates">Developer Rates</option>
                      <option value="SEO & Marketing">SEO & Marketing</option>
                      <option value="Engineering">Engineering</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Associated Interactive Tool</label>
                    <select
                      value={formData.associatedTool}
                      onChange={(e) => setFormData({ ...formData, associatedTool: e.target.value })}
                      className="w-full px-3.5 py-2 bg-dark-base border border-gray-700 rounded-xl text-xs text-white focus:border-brand-500 focus:outline-none"
                    >
                      <option value="">None (Standard Article)</option>
                      <option value="saas-calculator">US SaaS MRR & Churn Calculator</option>
                      <option value="hourly-rate-calculator">US Freelance Rate Estimator</option>
                      <option value="seo-meta-generator">SEO Meta Tag Generator</option>
                    </select>
                  </div>
                </div>

                {/* Dedicated Custom SEO Meta Fields */}
                <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-400">
                    <Globe className="w-4 h-4" /> Search Engine Optimization (SEO) Meta Fields
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-400 mb-1">SEO Title Tag</label>
                      <input
                        type="text"
                        value={formData.seoTitle}
                        onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                        className="w-full px-3 py-1.5 bg-dark-base border border-gray-700 rounded-lg text-xs text-white focus:border-sky-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-400 mb-1">Target Keywords (Comma Separated)</label>
                      <input
                        type="text"
                        value={formData.keywords}
                        onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                        className="w-full px-3 py-1.5 bg-dark-base border border-gray-700 rounded-lg text-xs text-white focus:border-sky-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-400 mb-1">Meta Description (160 Chars)</label>
                    <input
                      type="text"
                      value={formData.seoDescription}
                      onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                      className="w-full px-3 py-1.5 bg-dark-base border border-gray-700 rounded-lg text-xs text-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Thumbnail Cover Image URL</label>
                  <input
                    type="text"
                    value={formData.thumbnailUrl}
                    onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                    className="w-full px-3.5 py-2 bg-dark-base border border-gray-700 rounded-xl text-xs text-white font-mono focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Excerpt Summary *</label>
                  <textarea
                    rows={2}
                    required
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full px-3.5 py-2 bg-dark-base border border-gray-700 rounded-xl text-xs text-white focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Article Body Content (HTML Formatted) *</label>
                  <textarea
                    rows={6}
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-3.5 py-2 bg-dark-base border border-gray-700 rounded-xl text-xs text-white font-mono focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-lg transition-all"
                  >
                    {isSaving ? 'Saving Article...' : editingPost ? 'Update Post' : 'Publish Article'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* DELETE CONFIRMATION MODAL */}
        {isDeleteModalOpen && postToDelete && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-dark-card border border-gray-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
              <h3 className="text-lg font-bold text-white">Confirm Article Deletion</h3>
              <p className="text-xs text-gray-400">
                Are you sure you want to permanently delete <strong className="text-white">"{postToDelete.title}"</strong>? This action cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-lg"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

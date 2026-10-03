import React, { useState, useEffect } from 'react';
import { Search, Sparkles, TrendingUp, Wrench, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';
import API from '../services/api';
import SeoHead from '../components/SeoHead';
import ArticleCard from '../components/ArticleCard';
import ToolCard from '../components/ToolCard';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [tools, setTools] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'SaaS & Growth', 'Developer Rates', 'SEO & Marketing'];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [postsRes, toolsRes] = await Promise.all([
          API.get(`/posts?category=${selectedCategory}&search=${searchQuery}`),
          API.get('/tools'),
        ]);
        setPosts(postsRes.data);
        setTools(toolsRes.data);
      } catch (error) {
        console.error('Error fetching homepage content:', error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <SeoHead
        title="DevMetrics Hub | US SaaS Growth, Developer Rates & Interactive Web Tools"
        description="DevMetrics Hub provides US tech growth insights, SaaS calculators, developer hourly rate estimators, and technical SEO utilities for engineers and founders."
        keywords="US SaaS metrics, developer hourly rate calculator US, SaaS MRR calculator, technical SEO tools"
      />

      <main className="min-h-screen pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 border-b border-gray-800/80">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-6 animate-pulse">
              <Sparkles className="w-4 h-4" /> US Tech Market Insights & Client-Side Tools
            </div>

            {/* Single Semantic H1 Element per SEO Rules */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
              Empowering US Tech Creators with <span className="gradient-text">Data & Interactive Web Tools</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Explore in-depth articles on SaaS pricing, US developer rate benchmarks, and technical SEO — paired with real-time interactive calculators.
            </p>

            {/* Interactive Search Bar */}
            <div className="mt-8 max-w-xl mx-auto flex items-center gap-2 p-2 rounded-2xl glass-panel border border-gray-700 shadow-2xl">
              <div className="pl-3 text-gray-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search US SaaS metrics, developer rates, SEO tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none px-2 py-1.5"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-gray-400 hover:text-white px-2"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Platform Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-gray-800/60">
              <div className="p-3">
                <div className="text-2xl font-extrabold text-white font-mono">$145k/yr</div>
                <div className="text-xs text-gray-400 mt-0.5">US Developer Benchmark</div>
              </div>
              <div className="p-3">
                <div className="text-2xl font-extrabold text-brand-400 font-mono">15.3%</div>
                <div className="text-xs text-gray-400 mt-0.5">US SE Tax Preset</div>
              </div>
              <div className="p-3">
                <div className="text-2xl font-extrabold text-emerald-400 font-mono">100%</div>
                <div className="text-xs text-gray-400 mt-0.5">Client-Side Calculation</div>
              </div>
              <div className="p-3">
                <div className="text-2xl font-extrabold text-sky-400 font-mono">SEO</div>
                <div className="text-xs text-gray-400 mt-0.5">Schema.org JSON-LD</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Interactive Tools Carousel/Grid */}
        <section className="py-12 bg-dark-card/40 border-b border-gray-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 uppercase tracking-wider">
                  <Wrench className="w-4 h-4" /> Embedded Web Utilities
                </div>
                <h2 className="text-2xl font-bold text-white mt-1">Popular Interactive Web Tools</h2>
              </div>
              <a
                href="/tools"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-400 hover:text-brand-300"
              >
                Explore All Tools <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <ToolCard key={tool.toolId} tool={tool} />
              ))}
            </div>
          </div>
        </section>

        {/* Blog Articles Catalog */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" /> Published Insights
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Latest US Tech & Engineering Articles
              </h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'bg-dark-card hover:bg-gray-800 text-gray-400 border border-gray-800'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20 text-gray-400 gap-2 text-sm">
              <RefreshCw className="w-5 h-5 animate-spin text-brand-400" /> Loading articles...
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <ArticleCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 p-8 rounded-2xl glass-panel border border-gray-800">
              <p className="text-gray-400 text-sm">No published articles found matching your filter criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 bg-brand-600 text-white rounded-lg text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

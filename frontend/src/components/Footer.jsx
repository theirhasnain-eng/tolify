import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Send, Check, ShieldCheck, FileText, Globe } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-dark-card border-t border-gray-800/80 pt-12 pb-8 text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-gray-800">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-sky-400 flex items-center justify-center text-white font-bold">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                DevMetrics<span className="text-brand-400">Hub</span>
              </span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed">
              DevMetrics Hub is a US-focused content and interactive tools platform empowering software engineers, SaaS founders, and tech consultants with real-time financial metrics, rates, and SEO utilities.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" /> Optimized for US Tech Market Benchmarks
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-white transition-colors">Home Articles</Link></li>
              <li><Link to="/tools" className="hover:text-white transition-colors">Interactive Tools</Link></li>
              <li><a href="/sitemap.xml" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1"><FileText className="w-3 h-3" /> XML Sitemap</a></li>
              <li><a href="/robots.txt" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1"><Globe className="w-3 h-3" /> Robots.txt</a></li>
            </ul>
          </div>

          {/* Interactive Tools Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">US Web Tools</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/tools#saas-calculator" className="hover:text-brand-400 transition-colors">SaaS MRR Calculator</Link></li>
              <li><Link to="/tools#hourly-rate-calculator" className="hover:text-emerald-400 transition-colors">Freelance Rate Estimator</Link></li>
              <li><Link to="/tools#seo-meta-generator" className="hover:text-sky-400 transition-colors">SEO Meta Tag Generator</Link></li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">US Tech Insights Newsletter</h4>
            <p className="text-xs text-gray-400">
              Get weekly US SaaS growth analysis, engineering salary trends, and developer tools delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your work email..."
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 bg-dark-base border border-gray-700 rounded-lg text-xs text-white placeholder-gray-500 focus:border-brand-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shrink-0"
              >
                {subscribed ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                {subscribed ? 'Joined!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} DevMetrics Hub. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
            <Link to="/admin/login" className="text-brand-400 hover:underline">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

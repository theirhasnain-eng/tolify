import React, { useState, useEffect } from 'react';
import { Search, Copy, RotateCcw, Check, Globe, Twitter, Code } from 'lucide-react';
import API from '../../services/api';

export default function SeoMetaGenerator() {
  const [pageTitle, setPageTitle] = useState('Top US Tech & Developer Growth Benchmarks for 2026');
  const [metaDesc, setMetaDesc] = useState('Comprehensive analysis of US SaaS MRR benchmarks, developer hourly consulting rates, and software career growth tactics.');
  const [canonicalUrl, setCanonicalUrl] = useState('https://devmetricshub.com/us-tech-benchmarks-2026');
  const [ogImageUrl, setOgImageUrl] = useState('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    API.post('/tools/seo-meta-generator/use', { action: 'view' }).catch(() => {});
  }, []);

  const generatedHtml = `<!-- Primary Meta Tags -->
<title>${pageTitle}</title>
<meta name="title" content="${pageTitle}">
<meta name="description" content="${metaDesc}">
<link rel="canonical" href="${canonicalUrl}">

<!-- Open Graph / Facebook / LinkedIn -->
<meta property="og:type" content="website">
<meta property="og:url" content="${canonicalUrl}">
<meta property="og:title" content="${pageTitle}">
<meta property="og:description" content="${metaDesc}">
<meta property="og:image" content="${ogImageUrl}">

<!-- Twitter / X -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${canonicalUrl}">
<meta property="twitter:title" content="${pageTitle}">
<meta property="twitter:description" content="${metaDesc}">
<meta property="twitter:image" content="${ogImageUrl}">`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    API.post('/tools/seo-meta-generator/use', { action: 'copy_html' }).catch(() => {});
  };

  const handleReset = () => {
    setPageTitle('Top US Tech & Developer Growth Benchmarks for 2026');
    setMetaDesc('Comprehensive analysis of US SaaS MRR benchmarks, developer hourly consulting rates, and software career growth tactics.');
    setCanonicalUrl('https://devmetricshub.com/us-tech-benchmarks-2026');
    setOgImageUrl('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200');
  };

  return (
    <div className="glass-panel rounded-2xl p-6 md:p-8 my-8 border border-sky-500/20 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-gray-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-2">
            <Search className="w-3.5 h-3.5" /> Technical SEO Utility
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            SEO & OpenGraph Meta Tag Generator
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Build high-ranking meta tags with live Google US Search Snippet & Twitter Card previews.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-all shadow-md active:scale-95"
          >
            {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied HTML!' : 'Copy Tags'}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-6 space-y-4">
          <div>
            <label htmlFor="pagetitle" className="block text-xs font-semibold text-gray-300 mb-1">
              Page Title (&lt;title&gt;) - {pageTitle.length}/60 chars
            </label>
            <input
              id="pagetitle"
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              className="w-full px-3 py-2 bg-dark-base border border-gray-700 rounded-lg text-white text-sm focus:border-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="metadesc" className="block text-xs font-semibold text-gray-300 mb-1">
              Meta Description - {metaDesc.length}/160 chars
            </label>
            <textarea
              id="metadesc"
              rows={3}
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
              className="w-full px-3 py-2 bg-dark-base border border-gray-700 rounded-lg text-white text-sm focus:border-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="canonical" className="block text-xs font-semibold text-gray-300 mb-1">
              Canonical URL
            </label>
            <input
              id="canonical"
              type="text"
              value={canonicalUrl}
              onChange={(e) => setCanonicalUrl(e.target.value)}
              className="w-full px-3 py-2 bg-dark-base border border-gray-700 rounded-lg text-white text-sm focus:border-sky-500 focus:outline-none font-mono"
            />
          </div>

          <div>
            <label htmlFor="ogimg" className="block text-xs font-semibold text-gray-300 mb-1">
              OpenGraph Image URL (1200x630)
            </label>
            <input
              id="ogimg"
              type="text"
              value={ogImageUrl}
              onChange={(e) => setOgImageUrl(e.target.value)}
              className="w-full px-3 py-2 bg-dark-base border border-gray-700 rounded-lg text-white text-sm focus:border-sky-500 focus:outline-none font-mono"
            />
          </div>
        </div>

        {/* Live Card Previews */}
        <div className="lg:col-span-6 space-y-6">
          {/* Google SERP Preview */}
          <div className="p-4 rounded-xl bg-dark-card border border-gray-800">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold mb-3">
              <Globe className="w-3.5 h-3.5 text-sky-400" /> Google US Search Result Preview
            </div>
            <div className="space-y-1 font-sans">
              <div className="text-xs text-emerald-400 font-mono truncate">{canonicalUrl}</div>
              <div className="text-base text-blue-400 hover:underline font-medium line-clamp-1 cursor-pointer">
                {pageTitle || 'Untitled Page'}
              </div>
              <div className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                {metaDesc || 'No meta description set.'}
              </div>
            </div>
          </div>

          {/* Twitter Preview */}
          <div className="p-4 rounded-xl bg-dark-card border border-gray-800">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold mb-3">
              <Twitter className="w-3.5 h-3.5 text-sky-400" /> Twitter / X Card Preview
            </div>
            <div className="rounded-xl border border-gray-700 overflow-hidden bg-gray-900/50">
              <img
                src={ogImageUrl}
                alt="OG Preview"
                className="w-full h-36 object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200';
                }}
              />
              <div className="p-3">
                <div className="text-xs text-gray-400 font-mono uppercase">devmetricshub.com</div>
                <div className="text-sm font-semibold text-white truncate mt-0.5">{pageTitle}</div>
                <div className="text-xs text-gray-400 line-clamp-1 mt-0.5">{metaDesc}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

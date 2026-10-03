import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye, Wrench, ChevronRight } from 'lucide-react';

export default function ArticleCard({ post }) {
  const formattedDate = new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group border border-gray-800">
      <div>
        {/* Article Image Header */}
        <div className="relative h-48 overflow-hidden bg-gray-900">
          <img
            src={post.thumbnailUrl}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-dark-base/80 backdrop-blur-md text-brand-400 border border-brand-500/20">
              {post.category}
            </span>
          </div>

          {post.associatedTool && (
            <div className="absolute bottom-3 right-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/90 text-white shadow-lg backdrop-blur-md">
                <Wrench className="w-3 h-3" /> Includes Interactive Tool
              </span>
            </div>
          )}
        </div>

        {/* Article Info */}
        <div className="p-5">
          <div className="flex items-center gap-3 text-xs text-gray-400 mb-2.5">
            <time dateTime={post.createdAt}>{formattedDate}</time>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {post.readTime || 5} min read
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" /> {post.views || 0} views
            </span>
          </div>

          <h3 className="text-lg font-bold text-white group-hover:text-brand-400 transition-colors line-clamp-2 leading-snug">
            <Link to={`/article/${post.slug}`}>{post.title}</Link>
          </h3>

          <p className="text-xs text-gray-400 mt-2.5 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Footer Read Action */}
      <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-gray-800/50 text-xs">
        <span className="text-gray-400 font-medium">{post.author?.name || 'DevMetrics Team'}</span>
        <Link
          to={`/article/${post.slug}`}
          className="inline-flex items-center gap-1 font-semibold text-brand-400 group-hover:text-brand-300 transition-colors"
        >
          Read Article <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}

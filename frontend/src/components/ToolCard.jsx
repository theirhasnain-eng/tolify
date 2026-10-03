import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, DollarSign, Search, ArrowRight, Zap } from 'lucide-react';

const iconMap = {
  TrendingUp: TrendingUp,
  DollarSign: DollarSign,
  Search: Search,
};

export default function ToolCard({ tool }) {
  const IconComponent = iconMap[tool.icon] || TrendingUp;

  return (
    <div className="glass-card rounded-2xl p-6 border border-gray-800 flex flex-col justify-between group hover:border-brand-500/40 transition-all">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 group-hover:scale-110 transition-transform">
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-800 text-gray-300 border border-gray-700">
            <Zap className="w-3 h-3 text-amber-400" /> {tool.usageCount || 0} runs
          </span>
        </div>

        <span className="text-[11px] font-bold text-brand-400 uppercase tracking-wider">
          {tool.category || 'Interactive Tool'}
        </span>
        <h3 className="text-lg font-bold text-white mt-1 group-hover:text-brand-300 transition-colors">
          {tool.name}
        </h3>
        <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
          {tool.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-800/60">
        <Link
          to={`/tools#${tool.toolId}`}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-brand-600 text-gray-200 hover:text-white text-xs font-semibold transition-all group-hover:shadow-md"
        >
          Launch Utility <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

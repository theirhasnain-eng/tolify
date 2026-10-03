import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Wrench, TrendingUp, DollarSign, Search, Sparkles } from 'lucide-react';
import SeoHead from '../components/SeoHead';
import SaasCalculator from '../components/tools/SaasCalculator';
import HourlyRateCalculator from '../components/tools/HourlyRateCalculator';
import SeoMetaGenerator from '../components/tools/SeoMetaGenerator';

export default function ToolsPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('saas-calculator');

  useEffect(() => {
    if (location.hash) {
      const toolIdFromHash = location.hash.replace('#', '');
      if (['saas-calculator', 'hourly-rate-calculator', 'seo-meta-generator'].includes(toolIdFromHash)) {
        setActiveTab(toolIdFromHash);
      }
    }
  }, [location.hash]);

  const toolsList = [
    {
      id: 'saas-calculator',
      name: 'US SaaS MRR & Churn Calculator',
      icon: TrendingUp,
      badge: 'SaaS Finance',
    },
    {
      id: 'hourly-rate-calculator',
      name: 'US Developer Hourly Rate Estimator',
      icon: DollarSign,
      badge: 'Developer Rates',
    },
    {
      id: 'seo-meta-generator',
      name: 'SEO & OpenGraph Meta Tag Generator',
      icon: Search,
      badge: 'Technical SEO',
    },
  ];

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'DevMetrics Interactive Utilities Suite',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All Modern Web Browsers',
    url: window.location.href,
  };

  return (
    <>
      <SeoHead
        title="Interactive Developer & SaaS Web Tools Hub | DevMetrics Hub"
        description="Free online client-side web utilities for US software engineers, founders, and consultants. Calculate SaaS MRR, freelance hourly rates, and generate technical SEO meta tags."
        keywords="free SaaS calculator, developer hourly rate estimator, SEO tag builder, client-side developer utilities"
        schemaJson={webAppSchema}
      />

      <main className="min-h-screen py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-4">
            <Sparkles className="w-4 h-4" /> 100% Client-Side Engine • Zero Data Storage
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Interactive <span className="gradient-text">Web Tools Suite</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed">
            Select a standalone developer or SaaS utility below to calculate metrics in real time.
          </p>
        </div>

        {/* Tools Switcher Tabs */}
        <div className="flex items-center justify-center gap-3 overflow-x-auto pb-4 mb-8">
          {toolsList.map((tool) => {
            const Icon = tool.icon;
            const isSelected = activeTab === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTab(tool.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shadow-md ${
                  isSelected
                    ? 'bg-brand-600 text-white border border-brand-400'
                    : 'bg-dark-card hover:bg-gray-800 text-gray-300 border border-gray-800'
                }`}
              >
                <Icon className="w-4 h-4 text-brand-300" />
                {tool.name}
              </button>
            );
          })}
        </div>

        {/* Selected Active Tool Workspace */}
        <div className="max-w-5xl mx-auto">
          {activeTab === 'saas-calculator' && <SaasCalculator />}
          {activeTab === 'hourly-rate-calculator' && <HourlyRateCalculator />}
          {activeTab === 'seo-meta-generator' && <SeoMetaGenerator />}
        </div>
      </main>
    </>
  );
}

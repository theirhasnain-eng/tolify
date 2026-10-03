import React, { useState, useEffect } from 'react';
import { Calculator, Copy, RotateCcw, Check, TrendingUp, DollarSign, Users, AlertCircle } from 'lucide-react';
import API from '../../services/api';

export default function SaasCalculator() {
  const [arpu, setArpu] = useState(99); // Average Revenue Per User in $
  const [customers, setCustomers] = useState(250);
  const [monthlyChurn, setMonthlyChurn] = useState(2.5); // % churn per month
  const [newCustomersMonthly, setNewCustomersMonthly] = useState(25);
  const [copied, setCopied] = useState(false);

  // Log usage action to backend once
  useEffect(() => {
    API.post('/tools/saas-calculator/use', { action: 'view' }).catch(() => {});
  }, []);

  // Calculations
  const mrr = customers * arpu;
  const arr = mrr * 12;
  const churnedCustomers = Math.round(customers * (monthlyChurn / 100));
  const netCustomerGrowth = newCustomersMonthly - churnedCustomers;
  
  // LTV = ARPU / Monthly Churn Rate (assuming 80% gross margin standard US SaaS)
  const ltv = monthlyChurn > 0 ? Math.round((arpu * 0.8) / (monthlyChurn / 100)) : 0;
  
  // Estimated CAC Payback based on typical 3:1 LTV/CAC ratio
  const estimatedCac = Math.round(ltv / 3);
  const cacPaybackMonths = arpu > 0 ? (estimatedCac / (arpu * 0.8)).toFixed(1) : 0;

  const handleCopyResults = () => {
    const text = `DevMetrics SaaS Calculator Results (USD):
• Current MRR: $${mrr.toLocaleString()}
• Projected ARR: $${arr.toLocaleString()}
• Active Customers: ${customers.toLocaleString()}
• Monthly Net Growth: ${netCustomerGrowth > 0 ? '+' : ''}${netCustomerGrowth} accounts/mo
• Estimated LTV: $${ltv.toLocaleString()}
• Estimated CAC Payback: ${cacPaybackMonths} months`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    // Track execution
    API.post('/tools/saas-calculator/use', { action: 'copy_results' }).catch(() => {});
  };

  const handleReset = () => {
    setArpu(99);
    setCustomers(250);
    setMonthlyChurn(2.5);
    setNewCustomersMonthly(25);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 md:p-8 my-8 border border-brand-500/20 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-gray-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-2">
            <TrendingUp className="w-3.5 h-3.5" /> Interactive US SaaS Tool
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            US SaaS MRR & Churn Calculator
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Model subscription metrics, projected ARR, and customer LTV with USD benchmarks.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyResults}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold transition-all shadow-md active:scale-95"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Summary'}
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
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-5">
          <div>
            <div className="flex justify-between text-xs font-semibold text-gray-300 mb-2">
              <label htmlFor="arpu" className="flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-brand-400" /> Average Revenue Per Account (ARPU / Mo)
              </label>
              <span className="text-brand-400 font-mono">${arpu} / mo</span>
            </div>
            <input
              id="arpu"
              type="range"
              min="10"
              max="1000"
              step="5"
              value={arpu}
              onChange={(e) => setArpu(Number(e.target.value))}
              className="w-full accent-brand-500 cursor-pointer h-2 bg-gray-800 rounded-lg"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-gray-300 mb-2">
              <label htmlFor="customers" className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-brand-400" /> Active Customers Count
              </label>
              <span className="text-brand-400 font-mono">{customers.toLocaleString()} accounts</span>
            </div>
            <input
              id="customers"
              type="range"
              min="10"
              max="5000"
              step="10"
              value={customers}
              onChange={(e) => setCustomers(Number(e.target.value))}
              className="w-full accent-brand-500 cursor-pointer h-2 bg-gray-800 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="churn" className="block text-xs font-semibold text-gray-300 mb-1.5">
                Monthly Revenue Churn %
              </label>
              <input
                id="churn"
                type="number"
                step="0.1"
                min="0"
                max="20"
                value={monthlyChurn}
                onChange={(e) => setMonthlyChurn(Number(e.target.value))}
                className="w-full px-3 py-2 bg-dark-base border border-gray-700 rounded-lg text-white font-mono text-sm focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="newcust" className="block text-xs font-semibold text-gray-300 mb-1.5">
                New Customers / Mo
              </label>
              <input
                id="newcust"
                type="number"
                min="0"
                max="500"
                value={newCustomersMonthly}
                onChange={(e) => setNewCustomersMonthly(Number(e.target.value))}
                className="w-full px-3 py-2 bg-dark-base border border-gray-700 rounded-lg text-white font-mono text-sm focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-gray-900/60 border border-gray-800 flex items-start gap-2.5 text-xs text-gray-400">
            <AlertCircle className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
            <span>US SaaS Benchmark: Healthy B2B SaaS targets &lt; 2% monthly net churn and CAC Payback under 12 months.</span>
          </div>
        </div>

        {/* Dynamic Metric Display Grid */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-dark-card border border-brand-500/20 flex flex-col justify-between">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Monthly Recurring Revenue</span>
            <div className="text-2xl lg:text-3xl font-extrabold text-white font-mono mt-2">${mrr.toLocaleString()}</div>
            <span className="text-xs text-emerald-400 mt-2 font-medium">USD / Month</span>
          </div>

          <div className="p-4 rounded-xl bg-dark-card border border-brand-500/20 flex flex-col justify-between">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Annualized Run Rate (ARR)</span>
            <div className="text-2xl lg:text-3xl font-extrabold text-brand-400 font-mono mt-2">${arr.toLocaleString()}</div>
            <span className="text-xs text-gray-400 mt-2 font-medium">12-Month Projection</span>
          </div>

          <div className="p-4 rounded-xl bg-dark-card border border-gray-800 flex flex-col justify-between">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Customer Lifetime Value</span>
            <div className="text-2xl font-bold text-emerald-400 font-mono mt-2">${ltv.toLocaleString()}</div>
            <span className="text-xs text-gray-400 mt-2">Est. Gross Margin LTV</span>
          </div>

          <div className="p-4 rounded-xl bg-dark-card border border-gray-800 flex flex-col justify-between">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">CAC Payback Time</span>
            <div className="text-2xl font-bold text-amber-400 font-mono mt-2">{cacPaybackMonths} mo</div>
            <span className="text-xs text-gray-400 mt-2">Target &lt; 12.0 Months</span>
          </div>
        </div>
      </div>
    </div>
  );
}

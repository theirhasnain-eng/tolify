import React, { useState, useEffect } from 'react';
import { DollarSign, Copy, RotateCcw, Check, Briefcase, Calendar, ShieldCheck } from 'lucide-react';
import API from '../../services/api';

export default function HourlyRateCalculator() {
  const [targetSalary, setTargetSalary] = useState(145000); // $ USD target
  const [taxRate, setTaxRate] = useState(25); // % Total Estimated Tax (15.3% SE + Federal)
  const [annualExpenses, setAnnualExpenses] = useState(12000); // $ Healthcare, software, legal
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState(28); // Real billable hours
  const [vacationWeeks, setVacationWeeks] = useState(4);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    API.post('/tools/hourly-rate-calculator/use', { action: 'view' }).catch(() => {});
  }, []);

  // Calculation Logic
  const workingWeeks = 52 - vacationWeeks;
  const totalBillableHoursYearly = workingWeeks * billableHoursPerWeek;

  // Gross Needed = (Target Salary + Annual Expenses) / (1 - Tax Rate / 100)
  const grossNeeded = (targetSalary + annualExpenses) / (1 - taxRate / 100);
  const targetHourlyRate = totalBillableHoursYearly > 0 ? Math.ceil(grossNeeded / totalBillableHoursYearly) : 0;
  const projectScopeQuote40h = targetHourlyRate * 40;

  const handleCopyResults = () => {
    const text = `DevMetrics US Developer Rate Calculator (USD):
• Target Hourly Rate: $${targetHourlyRate}/hr
• Standard 40h Project Quote: $${projectScopeQuote40h.toLocaleString()}
• Target Salary Base: $${targetSalary.toLocaleString()}/yr
• Total Billable Hours/Year: ${totalBillableHoursYearly} hrs (${workingWeeks} working weeks @ ${billableHoursPerWeek} billable hrs/wk)
• Calculated Gross Annual Target: $${Math.round(grossNeeded).toLocaleString()}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    API.post('/tools/hourly-rate-calculator/use', { action: 'copy_results' }).catch(() => {});
  };

  const handleReset = () => {
    setTargetSalary(145000);
    setTaxRate(25);
    setAnnualExpenses(12000);
    setBillableHoursPerWeek(28);
    setVacationWeeks(4);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 md:p-8 my-8 border border-brand-500/20 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-gray-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <DollarSign className="w-3.5 h-3.5" /> US Freelance & Consulting Rate Utility
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            US Developer Hourly Rate Estimator
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Determine your minimum billable rate factoring in US SE tax (15.3%), insurance, and non-billable overhead.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyResults}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-md active:scale-95"
          >
            {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied Rate!' : 'Copy Summary'}
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
        {/* Controls */}
        <div className="lg:col-span-6 space-y-5">
          <div>
            <div className="flex justify-between text-xs font-semibold text-gray-300 mb-2">
              <label htmlFor="salary" className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-emerald-400" /> Desired Net Annual Income (USD $)
              </label>
              <span className="text-emerald-400 font-mono">${targetSalary.toLocaleString()}</span>
            </div>
            <input
              id="salary"
              type="range"
              min="50000"
              max="350000"
              step="5000"
              value={targetSalary}
              onChange={(e) => setTargetSalary(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-2 bg-gray-800 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="tax" className="block text-xs font-semibold text-gray-300 mb-1.5">
                Total Est. Tax Rate % (15.3% SE + Fed)
              </label>
              <input
                id="tax"
                type="number"
                min="10"
                max="50"
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="w-full px-3 py-2 bg-dark-base border border-gray-700 rounded-lg text-white font-mono text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="expenses" className="block text-xs font-semibold text-gray-300 mb-1.5">
                Annual Overhead (Health/Tools $)
              </label>
              <input
                id="expenses"
                type="number"
                min="0"
                max="50000"
                step="1000"
                value={annualExpenses}
                onChange={(e) => setAnnualExpenses(Number(e.target.value))}
                className="w-full px-3 py-2 bg-dark-base border border-gray-700 rounded-lg text-white font-mono text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="billable" className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Billable Hours / Week
              </label>
              <input
                id="billable"
                type="number"
                min="10"
                max="50"
                value={billableHoursPerWeek}
                onChange={(e) => setBillableHoursPerWeek(Number(e.target.value))}
                className="w-full px-3 py-2 bg-dark-base border border-gray-700 rounded-lg text-white font-mono text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="vacation" className="block text-xs font-semibold text-gray-300 mb-1.5">
                Vacation/Sick Weeks / Yr
              </label>
              <input
                id="vacation"
                type="number"
                min="0"
                max="12"
                value={vacationWeeks}
                onChange={(e) => setVacationWeeks(Number(e.target.value))}
                className="w-full px-3 py-2 bg-dark-base border border-gray-700 rounded-lg text-white font-mono text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Display Panel */}
        <div className="lg:col-span-6 grid grid-cols-1 gap-4">
          <div className="p-6 rounded-2xl bg-dark-card border border-emerald-500/30 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheck className="w-32 h-32 text-emerald-400" />
            </div>
            <div>
              <span className="text-xs text-emerald-400 uppercase tracking-wider font-semibold">Recommended Billable Hourly Rate</span>
              <div className="text-4xl lg:text-5xl font-extrabold text-white font-mono mt-2 flex items-baseline gap-2">
                ${targetHourlyRate} <span className="text-sm font-normal text-gray-400">/ hour</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-800">
              <div>
                <span className="text-xs text-gray-400 font-medium">Standard 40h Sprint Quote</span>
                <div className="text-lg font-bold text-white font-mono mt-1">${projectScopeQuote40h.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-xs text-gray-400 font-medium">Gross Target (Before Taxes)</span>
                <div className="text-lg font-bold text-emerald-400 font-mono mt-1">${Math.round(grossNeeded).toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

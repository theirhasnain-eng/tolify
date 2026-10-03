import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Key, ShieldCheck, AlertCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SeoHead from '../components/SeoHead';

export default function Login() {
  const [email, setEmail] = useState('admin@devmetrics.io');
  const [password, setPassword] = useState('Admin@123456');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid admin credentials');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SeoHead title="Admin Portal Login | DevMetrics Hub" description="Secure admin authentication portal for content and tool management." />

      <main className="min-h-screen py-16 flex items-center justify-center px-4">
        <div className="max-w-md w-full glass-panel rounded-3xl p-8 border border-gray-800 shadow-2xl relative">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-sky-400 flex items-center justify-center text-white shadow-lg">
                <TrendingUp className="w-5 h-5" />
              </div>
            </Link>
            <h1 className="text-2xl font-bold text-white tracking-tight">Admin Portal</h1>
            <p className="text-xs text-gray-400 mt-1">
              Sign in with JWT credentials to manage articles and web tools.
            </p>
          </div>

          {/* Quick Seed Hint Banner */}
          <div className="p-3.5 rounded-xl bg-brand-500/10 border border-brand-500/20 mb-6 flex items-start gap-2.5 text-xs text-brand-300">
            <ShieldCheck className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Default Seed Credentials:</span>
              <div className="font-mono text-[11px] text-gray-300 mt-0.5">
                Email: admin@devmetrics.io <br />
                Password: Admin@123456
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2 mb-6">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-brand-400" /> Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-dark-base border border-gray-700 rounded-xl text-white text-sm focus:border-brand-500 focus:outline-none"
                placeholder="admin@devmetrics.io"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-brand-400" /> Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-dark-base border border-gray-700 rounded-xl text-white text-sm focus:border-brand-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              {isSubmitting ? 'Authenticating...' : 'Authenticate & Enter Portal'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-xs text-gray-400 hover:text-white inline-flex items-center gap-1">
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

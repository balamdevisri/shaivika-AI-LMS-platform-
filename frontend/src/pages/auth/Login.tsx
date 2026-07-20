import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('student@eduflow.app');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Successfully logged in! Redirecting to Dashboard...');
    setTimeout(() => navigate('/dashboard'), 600);
  };

  const handleQuickDemo = (role: string) => {
    if (role === 'Student') {
      setEmail('jane.student@eduflow.app');
    } else if (role === 'Instructor') {
      setEmail('sarah.instructor@eduflow.app');
    } else {
      setEmail('admin@eduflow.app');
    }
    setPassword('demo2026!');
    toast.info(`Filled ${role} credentials`);
  };

  return (
    <div className="space-y-6 bg-white p-8 rounded-3xl border border-[#E2E8F0] shadow-xl">
      <div className="space-y-2">
        <h2 className="font-heading font-bold text-2xl text-[#111827]">Sign In to EduFlow</h2>
        <p className="text-xs text-[#475569]">Enter your enterprise credentials or try a demo profile below.</p>
      </div>

      {/* Quick Demo Credentials Trigger */}
      <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-[#E2E8F0] space-y-2">
        <span className="text-[11px] font-bold text-[#059669] uppercase tracking-wider block">
          One-Click Demo Profiles
        </span>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleQuickDemo('Student')}
            className="py-1.5 px-2 bg-white hover:bg-emerald-50 text-[11px] font-semibold text-[#111827] border border-[#E2E8F0] rounded-xl transition-all"
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemo('Instructor')}
            className="py-1.5 px-2 bg-white hover:bg-emerald-50 text-[11px] font-semibold text-[#111827] border border-[#E2E8F0] rounded-xl transition-all"
          >
            Instructor
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemo('Admin')}
            className="py-1.5 px-2 bg-white hover:bg-emerald-50 text-[11px] font-semibold text-[#111827] border border-[#E2E8F0] rounded-xl transition-all"
          >
            Admin
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-[#111827] block mb-1">Work or Student Email</label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-2.5 pl-9 pr-3 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#059669]"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-[#111827]">Password</label>
            <a href="#" className="text-[11px] text-[#059669] hover:underline font-medium">Forgot password?</a>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-2.5 pl-9 pr-10 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#059669]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button type="submit" className="btn-primary w-full py-3 justify-center text-sm font-semibold shadow-lg shadow-emerald-600/20">
          <span>Sign In to Workspace</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="pt-2 text-center text-xs text-slate-500">
        Don't have an account?{' '}
        <Link to="/auth/register" className="font-semibold text-[#059669] hover:underline">
          Create Account
        </Link>
      </div>
    </div>
  );
};

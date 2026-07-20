import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { BrandLogo } from '@/components/common/BrandLogo';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('student@shaivika.ai');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Signed in successfully! Opening AI Dashboard...');
    setTimeout(() => navigate('/dashboard'), 600);
  };

  const handleQuickDemo = (role: string) => {
    if (role === 'Student') {
      setEmail('jane.student@shaivika.ai');
    } else if (role === 'Instructor') {
      setEmail('sarah.instructor@shaivika.ai');
    } else {
      setEmail('admin@shaivika.ai');
    }
    setPassword('demo2026!');
    toast.info(`Filled ${role} demo account credentials`);
  };

  return (
    <div className="space-y-6 bg-[#0F172A] p-8 rounded-3xl border border-white/10 shadow-2xl">
      
      {/* Mobile Brand Logo */}
      <div className="lg:hidden flex justify-center pb-2">
        <BrandLogo size="md" showSubtitle={true} />
      </div>

      <div className="space-y-2 text-center lg:text-left">
        <h2 className="font-heading font-bold text-2xl text-white">Sign In to Shaivika AI</h2>
        <p className="text-xs text-[#94A3B8]">Enter your credentials or choose a quick demo account below.</p>
      </div>

      {/* One-Click Demo Profiles */}
      <div className="bg-[#020617] p-3 rounded-2xl border border-white/10 space-y-2">
        <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider block">
          One-Click Demo Profiles
        </span>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleQuickDemo('Student')}
            className="py-1.5 px-2 bg-[#0F172A] hover:bg-[#10B981]/20 text-[11px] font-semibold text-white border border-white/10 rounded-xl transition-all"
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemo('Instructor')}
            className="py-1.5 px-2 bg-[#0F172A] hover:bg-[#10B981]/20 text-[11px] font-semibold text-white border border-white/10 rounded-xl transition-all"
          >
            Instructor
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemo('Admin')}
            className="py-1.5 px-2 bg-[#0F172A] hover:bg-[#10B981]/20 text-[11px] font-semibold text-white border border-white/10 rounded-xl transition-all"
          >
            Admin
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-white block mb-1">Work / Student Email</label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#020617] border border-white/10 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-[#10B981]"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-white">Password</label>
            <a href="#" className="text-[11px] text-[#10B981] hover:underline font-medium">Forgot password?</a>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#020617] border border-white/10 rounded-xl py-2.5 pl-9 pr-10 text-xs text-white focus:outline-none focus:border-[#10B981]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-white"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button type="submit" className="btn-emerald-primary w-full py-3 justify-center text-xs font-bold shadow-lg shadow-emerald-950/50">
          <span>Sign In to Platform</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="pt-2 text-center text-xs text-[#94A3B8]">
        Don't have an account?{' '}
        <Link to="/auth/register" className="font-semibold text-[#10B981] hover:underline">
          Create Account
        </Link>
      </div>
    </div>
  );
};

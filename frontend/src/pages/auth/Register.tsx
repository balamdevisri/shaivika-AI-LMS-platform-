import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Building, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { BrandLogo } from '@/components/common/BrandLogo';

export const Register: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Enterprise account created! Welcome to Shaivika AI LMS.');
    setTimeout(() => navigate('/dashboard'), 600);
  };

  return (
    <div className="space-y-6 bg-[#0F172A] p-8 rounded-3xl border border-white/10 shadow-2xl">
      
      {/* Mobile Brand Logo */}
      <div className="lg:hidden flex justify-center pb-2">
        <BrandLogo size="md" showSubtitle={true} />
      </div>

      <div className="space-y-2 text-center lg:text-left">
        <h2 className="font-heading font-bold text-2xl text-white">Create Enterprise Account</h2>
        <p className="text-xs text-[#94A3B8]">Start your 14-day Pro AI trial with zero credit card setup.</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-white block mb-1">Full Name</label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              required
              placeholder="Jane Devson"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-[#020617] border border-white/10 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-[#10B981]"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-white block mb-1">Work / Academic Email</label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="email"
              required
              placeholder="jane@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#020617] border border-white/10 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-[#10B981]"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-white block mb-1">Institution / Organization</label>
          <div className="relative">
            <Building className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              required
              placeholder="Stanford CS Dept / Acme Inc."
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="w-full bg-[#020617] border border-white/10 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-[#10B981]"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-white block mb-1">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="password"
              required
              placeholder="Create strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#020617] border border-white/10 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-[#10B981]"
            />
          </div>
        </div>

        <button type="submit" className="btn-emerald-primary w-full py-3 justify-center text-xs font-bold shadow-lg shadow-emerald-950/50">
          <span>Create Account & Start Trial</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="pt-2 text-center text-xs text-[#94A3B8]">
        Already have an account?{' '}
        <Link to="/auth/login" className="font-semibold text-[#10B981] hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};

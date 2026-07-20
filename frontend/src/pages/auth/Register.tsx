import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Building, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export const Register: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Account created successfully! Welcome to EduFlow.');
    setTimeout(() => navigate('/dashboard'), 600);
  };

  return (
    <div className="space-y-6 bg-white p-8 rounded-3xl border border-[#E2E8F0] shadow-xl">
      <div className="space-y-2">
        <h2 className="font-heading font-bold text-2xl text-[#111827]">Create Enterprise Account</h2>
        <p className="text-xs text-[#475569]">Start your 14-day full enterprise trial with zero setup fees.</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-[#111827] block mb-1">Full Name</label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              required
              placeholder="Jane Devson"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-2.5 pl-9 pr-3 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#059669]"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#111827] block mb-1">Work / Academic Email</label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              required
              placeholder="jane@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-2.5 pl-9 pr-3 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#059669]"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#111827] block mb-1">Institution / Organization</label>
          <div className="relative">
            <Building className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              required
              placeholder="Stanford University"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-2.5 pl-9 pr-3 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#059669]"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#111827] block mb-1">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="password"
              required
              placeholder="Create strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-2.5 pl-9 pr-3 text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#059669]"
            />
          </div>
        </div>

        <button type="submit" className="btn-primary w-full py-3 justify-center text-sm font-semibold shadow-lg shadow-emerald-600/20">
          <span>Create Account & Start Trial</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="pt-2 text-center text-xs text-slate-500">
        Already have an account?{' '}
        <Link to="/auth/login" className="font-semibold text-[#059669] hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};

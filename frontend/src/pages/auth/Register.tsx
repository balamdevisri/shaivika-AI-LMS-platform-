import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { BrandLogo } from '@/components/common/BrandLogo';

export const Register: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  // Password strength logic (0 to 4 score)
  const calculatePasswordStrength = (pass: string) => {
    let score = 0;
    if (!pass) return { score: 0, label: 'None', color: 'bg-slate-200' };
    if (pass.length >= 6) score++;
    if (pass.length >= 10) score++;
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-rose-500' };
    if (score === 2) return { score: 2, label: 'Fair', color: 'bg-amber-500' };
    if (score === 3) return { score: 3, label: 'Good', color: 'bg-sky-400' };
    return { score: 4, label: 'Strong', color: 'bg-sky-600' };
  };

  const strength = calculatePasswordStrength(password);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      toast.error('Please fill in all required fields.');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      await signup(fullName, email, password);
      toast.success('Account created successfully! Verification email sent.');
      navigate('/auth/verify-email');
    } catch (err: any) {
      console.error('Registration error:', err);
      toast.error(err?.message || 'Failed to create account. Email may already be in use.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 bg-white/95 backdrop-blur-2xl p-8 rounded-3xl border border-sky-200 shadow-2xl shadow-sky-500/15 text-slate-900 font-['Sora']">
      
      {/* Mobile Brand Logo */}
      <div className="lg:hidden flex justify-center pb-2">
        <BrandLogo size="md" showSubtitle={true} />
      </div>

      <div className="space-y-2 text-center lg:text-left">
        <h2 className="font-heading font-extrabold text-2xl text-slate-900">Create Student Account</h2>
        <p className="text-xs text-slate-600 font-medium">Join 50K+ technical learners powering their education with AI.</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              required
              placeholder="Jane Devson"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-slate-50/80 border border-sky-200 rounded-xl py-2.5 pl-9 pr-3 text-xs text-slate-900 focus:outline-hidden focus:border-sky-500 focus:bg-white transition-all font-medium"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              required
              placeholder="jane@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50/80 border border-sky-200 rounded-xl py-2.5 pl-9 pr-3 text-xs text-slate-900 focus:outline-hidden focus:border-sky-500 focus:bg-white transition-all font-medium"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50/80 border border-sky-200 rounded-xl py-2.5 pl-9 pr-10 text-xs text-slate-900 focus:outline-hidden focus:border-sky-500 focus:bg-white transition-all font-medium"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Password Strength Indicator */}
          {password && (
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Strength:</span>
                <span className="font-bold text-sky-600">{strength.label}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden flex gap-1">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`h-full flex-1 rounded-full transition-colors ${
                      step <= strength.score ? strength.color : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Confirm Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-slate-50/80 border border-sky-200 rounded-xl py-2.5 pl-9 pr-3 text-xs text-slate-900 focus:outline-hidden focus:border-sky-500 focus:bg-white transition-all font-medium"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-blue-primary w-full py-3 justify-center text-xs font-bold shadow-lg shadow-sky-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2 mt-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="pt-2 text-center text-xs text-slate-600 font-medium">
        Already have an account?{' '}
        <Link to="/auth/login" className="font-bold text-sky-600 hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Register;

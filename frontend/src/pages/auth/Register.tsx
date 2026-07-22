import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { BrandLogo } from '@/components/common/BrandLogo';
import type { UserRole } from '@/types/user';

export const Register: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signup, signInWithGithub } = useAuth();
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
      await signup(fullName, email, password, role);
      toast.success(`Account created as ${role === 'instructor' ? 'Instructor' : 'Student'}! Verification email sent.`);
      navigate('/auth/verify-email');
    } catch (err: any) {
      console.error('Registration error:', err);
      toast.error(err?.message || 'Failed to create account. Email may already be in use.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGithubAuth = async () => {
    setIsSubmitting(true);
    try {
      const profile = await signInWithGithub();
      toast.success('Signed in with GitHub successfully!');
      if (profile?.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (err: any) {
      console.error('GitHub authentication error:', err);
      toast.error(err?.message || 'GitHub Authentication failed.');
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
        <h2 className="font-heading font-extrabold text-2xl text-slate-900">Create {role === 'instructor' ? 'Instructor' : 'Student'} Account</h2>
        <p className="text-xs text-slate-600 font-medium">Join 50K+ technical learners & educators powering their platform with AI.</p>
      </div>

      {/* GitHub Authentication Button */}
      <div>
        <button
          type="button"
          onClick={handleGithubAuth}
          disabled={isSubmitting}
          className="w-full py-2.5 px-4 bg-white hover:bg-sky-50 text-slate-800 font-bold text-xs border border-sky-200 hover:border-sky-300 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
        >
          <svg className="w-4 h-4 text-slate-900 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span>Continue with GitHub</span>
        </button>
      </div>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-sky-100" />
        </div>
        <div className="relative flex justify-center text-[11px]">
          <span className="bg-white px-3 text-slate-500 font-medium">Or register with Email</span>
        </div>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        
        {/* Account Role Selector */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">Select Account Role</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                role === 'student'
                  ? 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-500/20'
                  : 'bg-slate-50 text-slate-700 border-sky-200 hover:bg-sky-50'
              }`}
            >
              <span>🎓 Student Learner</span>
            </button>

            <button
              type="button"
              onClick={() => setRole('instructor')}
              className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                role === 'instructor'
                  ? 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-500/20'
                  : 'bg-slate-50 text-slate-700 border-sky-200 hover:bg-sky-50'
              }`}
            >
              <span>👨‍🏫 Instructor</span>
            </button>
          </div>
        </div>

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
              className="w-full bg-slate-50/80 border border-sky-200 rounded-xl py-2.5 pl-9 pr-3 text-xs text-slate-900 focus:outline-hidden transition-all font-medium"
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
              className="w-full bg-slate-50/80 border border-sky-200 rounded-xl py-2.5 pl-9 pr-3 text-xs text-slate-900 focus:outline-hidden transition-all font-medium"
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
              className="w-full bg-slate-50/80 border border-sky-200 rounded-xl py-2.5 pl-9 pr-10 text-xs text-slate-900 focus:outline-hidden transition-all font-medium"
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
              className="w-full bg-slate-50/80 border border-sky-200 rounded-xl py-2.5 pl-9 pr-3 text-xs text-slate-900 focus:outline-hidden transition-all font-medium"
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
              <span>Create {role === 'instructor' ? 'Instructor' : 'Student'} Account</span>
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

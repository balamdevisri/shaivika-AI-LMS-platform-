import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { BrandLogo } from '@/components/common/BrandLogo';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('student@shaivika.ai');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, user, userProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user && userProfile) {
      const from = (location.state as any)?.from?.pathname;
      if (from) {
        navigate(from, { replace: true });
      } else if (userProfile.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [user, userProfile, navigate, location]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const profile = await login(email, password, rememberMe);
      toast.success('Signed in successfully!');
      if (profile?.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (err: any) {
      console.error('Login error:', err);
      toast.error(err?.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemo = (role: 'Student' | 'Admin') => {
    if (role === 'Student') {
      setEmail('student@shaivika.ai');
      setPassword('password123');
    } else {
      setEmail('admin@shaivika.ai');
      setPassword('password123');
    }
    toast.info(`Filled ${role} demo credentials`);
  };

  return (
    <div className="space-y-6 bg-slate-900/90 backdrop-blur-2xl p-8 rounded-3xl border border-slate-800 shadow-2xl shadow-emerald-950/40 text-white font-sans">
      
      {/* Mobile Brand Logo */}
      <div className="lg:hidden flex justify-center pb-2">
        <BrandLogo size="md" showSubtitle={true} />
      </div>

      <div className="space-y-2 text-center lg:text-left">
        <h2 className="font-heading font-extrabold text-2xl text-white">Sign In to Shaivika AI</h2>
        <p className="text-xs text-slate-400">Enter your email and password to access your learning portal.</p>
      </div>

      {/* Quick Demo Credentials Assistant */}
      <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80 space-y-2">
        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
          ⚡ Demo Access Shortcuts
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleQuickDemo('Student')}
            className="py-1.5 px-3 bg-slate-900 hover:bg-emerald-500/10 text-xs font-semibold text-slate-200 border border-slate-700/60 hover:border-emerald-500/40 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>🎓 Student Demo</span>
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemo('Admin')}
            className="py-1.5 px-3 bg-slate-900 hover:bg-emerald-500/10 text-xs font-semibold text-slate-200 border border-slate-700/60 hover:border-emerald-500/40 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>🔑 Admin Demo</span>
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-slate-300">Password</label>
            <Link to="/auth/forgot-password" className="text-[11px] text-emerald-400 hover:underline font-semibold">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-10 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember Me Option */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded bg-slate-950 border-slate-800 accent-emerald-500 cursor-pointer"
            />
            <span>Remember me on this device</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-emerald-primary w-full py-3 justify-center text-xs font-bold shadow-lg shadow-emerald-950/50 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <span>Sign In to Platform</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="pt-2 text-center text-xs text-slate-400">
        Don't have an account?{' '}
        <Link to="/auth/register" className="font-semibold text-emerald-400 hover:underline">
          Create Student Account
        </Link>
      </div>
    </div>
  );
};

export default Login;

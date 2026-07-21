import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MailCheck, RefreshCw, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { BrandLogo } from '@/components/common/BrandLogo';

export const VerifyEmail: React.FC = () => {
  const { user, sendVerificationEmail, refreshUserProfile } = useAuth();
  const [resending, setResending] = useState(false);
  const [checking, setChecking] = useState(false);
  const navigate = useNavigate();

  const handleResend = async () => {
    setResending(true);
    try {
      await sendVerificationEmail();
      toast.success('Verification email resent! Please check your inbox.');
    } catch (err: any) {
      toast.error(err?.message || 'Failed to resend verification email.');
    } finally {
      setResending(false);
    }
  };

  const handleCheckStatus = async () => {
    setChecking(true);
    try {
      if (user) {
        await user.reload();
        const profile = await refreshUserProfile();
        if (user.emailVerified || profile?.isVerified) {
          toast.success('Email verified successfully!');
          navigate('/dashboard');
        } else {
          toast.info('Email is not verified yet. Please click the link sent to your inbox.');
        }
      }
    } catch (err: any) {
      console.error(err);
      toast.error('Failed to check verification status.');
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="space-y-6 bg-slate-900/90 backdrop-blur-2xl p-8 rounded-3xl border border-slate-800 shadow-2xl shadow-emerald-950/40 text-white font-sans text-center">
      <div className="lg:hidden flex justify-center pb-2">
        <BrandLogo size="md" showSubtitle={true} />
      </div>

      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
        <MailCheck className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h2 className="font-heading font-extrabold text-2xl text-white">Verify Your Email Address</h2>
        <p className="text-xs text-slate-300 max-w-sm mx-auto">
          We sent an activation link to <span className="font-semibold text-emerald-400">{user?.email || 'your email'}</span>. Please verify your email to unlock all AI LMS features.
        </p>
      </div>

      <div className="space-y-3 pt-2">
        <button
          onClick={handleCheckStatus}
          disabled={checking}
          className="btn-emerald-primary w-full py-3 justify-center text-xs font-bold shadow-lg shadow-emerald-950/50 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${checking ? 'animate-spin' : ''}`} />
          <span>I've Verified My Email</span>
        </button>

        <button
          onClick={handleResend}
          disabled={resending}
          className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
        >
          {resending ? 'Resending Link...' : 'Resend Verification Email'}
        </button>
      </div>

      <div className="pt-2">
        <Link to="/dashboard" className="text-xs text-emerald-400 hover:underline font-semibold flex items-center justify-center gap-1">
          <span>Continue to Student Dashboard</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmail;

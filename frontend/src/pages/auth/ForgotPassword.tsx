import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { BrandLogo } from '@/components/common/BrandLogo';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword(email);
      setSent(true);
      toast.success('Password reset email sent! Check your inbox.');
    } catch (err: any) {
      console.error('Reset password error:', err);
      toast.error(err?.message || 'Failed to send reset email. Please verify the email address.');
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
        <h2 className="font-heading font-extrabold text-2xl text-slate-900">Reset Password</h2>
        <p className="text-xs text-slate-600 font-medium">
          Enter your registered account email and we'll send you a password recovery link.
        </p>
      </div>

      {sent ? (
        <div className="space-y-4 text-center p-5 bg-sky-50 border border-sky-200 rounded-2xl">
          <CheckCircle2 className="w-12 h-12 text-sky-600 mx-auto" />
          <h3 className="font-bold text-lg text-slate-900">Reset Link Dispatched</h3>
          <p className="text-xs text-slate-600 font-medium">
            We sent a password recovery link to <span className="font-bold text-sky-600">{email}</span>. Please check your spam or inbox folder.
          </p>
          <Link
            to="/auth/login"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-sky-200 hover:bg-sky-50 text-xs font-bold text-slate-800 rounded-xl transition-colors w-full shadow-xs"
          >
            <ArrowLeft className="w-4 h-4 text-sky-600" />
            <span>Return to Sign In</span>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Account Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50/80 border border-sky-200 rounded-xl py-2.5 pl-9 pr-3 text-xs text-slate-900 focus:outline-hidden focus:border-sky-500 focus:bg-white transition-all font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-blue-primary w-full py-3 justify-center text-xs font-bold shadow-lg shadow-sky-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Sending Reset Link...</span>
              </>
            ) : (
              <>
                <span>Send Reset Link</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}

      <div className="pt-2 text-center text-xs text-slate-600 font-medium">
        Remembered your password?{' '}
        <Link to="/auth/login" className="font-bold text-sky-600 hover:underline">
          Back to Sign In
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;

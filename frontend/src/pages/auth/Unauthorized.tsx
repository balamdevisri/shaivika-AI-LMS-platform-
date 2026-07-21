import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const Unauthorized: React.FC = () => {
  const { userProfile } = useAuth();
  const navigate = useNavigate();

  const handleReturnDashboard = () => {
    if (userProfile?.role === 'admin') {
      navigate('/admin/dashboard');
    } else if (userProfile?.role === 'student') {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-slate-900/90 backdrop-blur-2xl border border-slate-800 p-8 rounded-3xl text-center space-y-6 shadow-2xl shadow-emerald-950/50">
        <div className="w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto shadow-lg shadow-rose-950/50 animate-bounce">
          <ShieldAlert className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold font-mono text-rose-400 uppercase tracking-widest block">
            HTTP 403 — ACCESS DENIED
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            Unauthorized Access
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            You do not have permission to view this resource. Your account role (<span className="font-mono text-emerald-400">{userProfile?.role || 'guest'}</span>) does not permit access to administrative pages.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <button
            onClick={handleReturnDashboard}
            className="btn-emerald-primary w-full py-3 justify-center text-xs font-bold shadow-lg shadow-emerald-950/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Allowed Dashboard</span>
          </button>

          <Link
            to="/"
            className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;

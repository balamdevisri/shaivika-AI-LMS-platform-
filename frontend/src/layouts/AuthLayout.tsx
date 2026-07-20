import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { GraduationCap, Sparkles, CheckCircle2 } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      
      {/* Left Feature Container (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0F172A] text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-1/4 right-10 w-80 h-80 bg-[#059669]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-[#10B981]/20 rounded-full blur-3xl" />

        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 z-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#059669] to-[#10B981] flex items-center justify-center text-white shadow-lg shadow-emerald-900/40">
            <GraduationCap className="w-6 h-6" />
          </div>
          <span className="font-heading font-bold text-2xl text-white tracking-tight">
            Edu<span className="text-[#34D399]">Flow</span>
          </span>
        </Link>

        {/* Center Quote & Feature Cards */}
        <div className="space-y-6 max-w-lg z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#34D399] text-xs font-semibold">
            <Sparkles className="w-4 h-4" /> Enterprise Learning Portal
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white leading-tight">
            Empowering students and faculty with modern education tools.
          </h2>

          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#34D399]" />
              <span>AI-assisted tutoring & automated homework grading</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#34D399]" />
              <span>Tamper-proof ISO digital certificate issuance</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#34D399]" />
              <span>SAML SSO & Google Workspace integration</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-xs text-slate-500 z-10">
          © {new Date().getFullYear()} EduFlow LMS. Built with Slate 900 + Emerald Theme.
        </div>
      </div>

      {/* Right Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-6">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

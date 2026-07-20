import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { BrandLogo } from '@/components/common/BrandLogo';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex font-sans selection:bg-[#10B981] selection:text-white">
      
      {/* Left Feature Column */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0F172A] text-white p-12 flex-col justify-between relative overflow-hidden border-r border-white/10">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#10B981]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#059669]/15 rounded-full blur-3xl" />

        {/* Official Brand Logo */}
        <div className="z-10">
          <BrandLogo size="lg" showSubtitle={true} />
        </div>

        {/* Center Quote & Features */}
        <div className="space-y-6 max-w-lg z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#34D399] text-xs font-semibold">
            <Sparkles className="w-4 h-4" /> Next-Gen AI Learning Portal
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white leading-tight">
            Learn Smarter with Artificial Intelligence.
          </h2>

          <div className="space-y-3 text-xs sm:text-sm text-[#94A3B8]">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
              <span>24/7 AI tutor & automatic assignment grading</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
              <span>Tamper-proof ISO digital certificate verification</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
              <span>SAML SSO & Google Workspace enterprise integration</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-xs text-[#94A3B8] z-10">
          © {new Date().getFullYear()} ShaivikaLMSPlatform Inc. All rights reserved.
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

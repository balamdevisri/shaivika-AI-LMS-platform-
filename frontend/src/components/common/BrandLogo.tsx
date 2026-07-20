import React from 'react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const logoDimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  }[size];

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }[size];

  return (
    <Link to="/" className={`flex items-center gap-3 group ${className}`}>
      {/* Official Uploaded Logo Asset */}
      <div className={`relative ${logoDimensions} flex items-center justify-center rounded-xl bg-slate-900/80 border border-white/10 p-1 shadow-lg shadow-emerald-950/40 group-hover:scale-105 group-hover:border-[#10B981]/40 transition-all duration-300`}>
        <img
          src="/logo.png"
          alt="Shaivika AI LMS Platform Official Logo"
          className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]"
        />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className={`font-heading font-bold ${titleSizes} tracking-tight leading-none`}>
          <span className="text-white">Shaivika</span>
          <span className="text-[#10B981] ml-1 font-extrabold">AI</span>
        </div>
        {showSubtitle && (
          <span className="text-[9px] sm:text-[10px] font-semibold text-[#94A3B8] uppercase tracking-widest mt-1">
            LMS PLATFORM
          </span>
        )}
      </div>
    </Link>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
  logoClassName?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
  logoClassName = '',
}) => {
  const logoDimensions = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14 sm:w-16 sm:h-16',
    lg: 'w-20 h-20 sm:w-24 sm:h-24',
    xl: 'w-28 h-28 sm:w-32 sm:h-32',
  }[size];

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl',
  }[size];

  return (
    <Link to="/" className={`flex items-center gap-3.5 group ${className}`}>
      {/* Prominent Official Brand Logo */}
      <div className={`relative ${logoDimensions} ${logoClassName} flex items-center justify-center rounded-2xl bg-[#0F172A] border border-white/15 p-2 shadow-2xl shadow-emerald-950/60 group-hover:scale-105 group-hover:border-[#10B981]/60 transition-all duration-300 flex-shrink-0`}>
        <img
          src="/logo.png"
          alt="Shaivika AI LMS Platform Official Logo"
          className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]"
        />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className={`font-heading font-extrabold ${titleSizes} tracking-tight leading-none`}>
          <span className="text-white">Shaivika</span>
          <span className="text-[#10B981] ml-1.5 font-black">AI</span>
        </div>
        {showSubtitle && (
          <span className="text-[10px] sm:text-[11px] font-bold text-[#94A3B8] uppercase tracking-widest mt-1.5">
            LMS PLATFORM
          </span>
        )}
      </div>
    </Link>
  );
};

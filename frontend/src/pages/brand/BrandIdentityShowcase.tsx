import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatedKaizenQ } from '../../components/common/AnimatedKaizenQ';
import { BlueSmokeTheme } from '../../components/common/BlueSmokeTheme';
import { Sparkles, ArrowRight } from 'lucide-react';

export const BrandIdentityShowcase: React.FC = () => {
  const [heroTheme, setHeroTheme] = useState<'light' | 'dark'>('light');

  return (
    <div className="min-h-screen bg-white text-slate-900 font-['Sora'] selection:bg-cyan-500 selection:text-black">
      {/* 1. HERO SECTION & LIVE 60 FPS ANIMATION ENGINE */}
      <BlueSmokeTheme className="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto text-center relative z-10 font-['Sora']">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Official Kaizen Q Brand Identity • Powered by Shaivika Groups
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-4">
            Kaizen <span className="bg-linear-to-r from-[#1D4ED8] via-[#2563EB] to-[#0EA5E9] bg-clip-text text-transparent filter drop-shadow-[0_4px_16px_rgba(37,99,235,0.2)]">Q</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-700 max-w-xl mx-auto mb-8 font-medium">
            Next-Generation AI-Powered Learning Management System Brand Identity Suite.
          </p>

          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-xs text-slate-700 font-semibold uppercase tracking-wider">Canvas Theme:</span>
            <button
              onClick={() => setHeroTheme('light')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                heroTheme === 'light'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              White & Blue Smoke (#FFFFFF)
            </button>
            <button
              onClick={() => setHeroTheme('dark')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                heroTheme === 'dark'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              Dark Navy (#0B1220)
            </button>
          </div>

          <AnimatedKaizenQ width={840} height={420} theme={heroTheme} />

          <div className="pt-10 flex justify-center">
            <Link
              to="/"
              className="px-7 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-['Sora'] font-bold text-xs inline-flex items-center gap-2 shadow-md transition-all hover:scale-103"
            >
              <span>Return to Platform Home</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </Link>
          </div>
        </div>
      </BlueSmokeTheme>
    </div>
  );
};

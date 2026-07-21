import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Play
} from 'lucide-react';
import { VideoPlayer } from './VideoPlayer';

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#020617] text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
      {/* Background Ambient Glows & Radial Gradients */}
      <div className="absolute top-0 right-10 w-[550px] h-[550px] bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 2-Column Responsive Grid (Desktop 50/50, Tablet 60/40, Mobile Vertical Stack) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ========================== LEFT COLUMN (50%) ========================== */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-8 text-left"
          >
            {/* 1. Small Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-xl shadow-lg shadow-emerald-950/20">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>✨ AI Powered Learning Platform</span>
            </div>

            {/* 2. Main Heading */}
            <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-6xl text-white tracking-tight leading-[1.12]">
              Learn Smarter with{' '}
              <span className="block mt-1 bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-200 bg-clip-text text-transparent">
                SHAIVIKA AI LMS
              </span>
            </h1>

            {/* 3. Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-normal">
              SHAIVIKA LMS empowers learners with AI-assisted education, interactive learning paths, practical projects, and personalized mentorship, making technical education smarter, faster, and more accessible.
            </p>

            {/* 4. Two Premium CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <button className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-900/30 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-base">
                <span>🚀 Start Learning</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button className="w-full sm:w-auto px-8 py-3.5 bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/80 hover:border-emerald-500/40 font-semibold rounded-xl backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-base">
                <Play className="w-4 h-4 fill-current text-emerald-400" />
                <span>▶ Watch Demo</span>
              </button>
            </div>
          </motion.div>

          {/* ========================== RIGHT COLUMN (50%) ========================== */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-6 relative flex justify-center"
          >
            {/* Blurred Emerald & Cyan Glow Spheres Behind Video */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/3 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Clean Minimal Floating Glass Video Card */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full max-w-xl p-1 sm:p-1.5 rounded-[28px] bg-slate-900/40 backdrop-blur-2xl border border-emerald-500/20 shadow-2xl shadow-emerald-950/60 hover:shadow-emerald-500/20 hover:border-emerald-500/40 transition-all duration-500"
            >
              <VideoPlayer src="/videos/Lmsvideo.mp4" />
            </motion.div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

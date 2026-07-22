import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, GraduationCap, BookOpen, Bot, Star } from 'lucide-react';
import { BrandLogo } from '@/components/common/BrandLogo';
import { BlueSmokeTheme } from '@/components/common/BlueSmokeTheme';

export const AuthLayout: React.FC = () => {
  // 4 Animated Stat Cards
  const stats = [
    { icon: GraduationCap, number: '50K+', label: 'Students' },
    { icon: BookOpen, number: '250+', label: 'Courses' },
    { icon: Bot, number: '24/7', label: 'AI Tutor' },
    { icon: Star, number: '99%', label: 'Satisfaction' },
  ];

  return (
    <BlueSmokeTheme>
      <div className="min-h-screen text-slate-900 flex font-['Sora'] selection:bg-sky-500 selection:text-white select-none">
        
        {/* ==================== LEFT HERO COLUMN ==================== */}
        <div className="hidden lg:flex lg:w-1/2 bg-white/70 backdrop-blur-xl text-slate-900 p-12 flex-col justify-between relative overflow-hidden border-r border-sky-100">
          
          {/* Background Sky Blue Glows */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.35, 0.2],
              rotate: [0, 45, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 -right-10 w-[500px] h-[500px] bg-sky-400/25 rounded-full blur-[120px] pointer-events-none"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.15, 0.3, 0.15],
              rotate: [45, 0, 45],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-10 -left-10 w-[450px] h-[450px] bg-sky-300/20 rounded-full blur-[100px] pointer-events-none"
          />

          {/* Floating Sky Blue Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * 400,
                  y: Math.random() * 600,
                  opacity: 0.2,
                  scale: Math.random() * 0.8 + 0.4,
                }}
                animate={{
                  y: [Math.random() * 600, Math.random() * 600 - 100],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_12px_#38BDF8]"
              />
            ))}
          </div>

          {/* Brand Header */}
          <div className="z-10 relative">
            <BrandLogo size="lg" showSubtitle={true} />
          </div>

          {/* Center Headline & Features */}
          <div className="space-y-8 max-w-lg z-10 relative">
            
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold backdrop-blur-md shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-sky-500 animate-pulse" />
              <span>✨ AI Powered Learning Platform</span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading font-extrabold text-3xl lg:text-4xl text-slate-900 leading-tight tracking-tight"
            >
              Learn Smarter with{' '}
              <span className="bg-linear-to-r from-sky-700 via-sky-600 to-sky-500 bg-clip-text text-transparent">
                SHAIVIKA AI LMS
              </span>
            </motion.h2>

            {/* Key Bullet Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-3.5 text-xs sm:text-sm text-slate-600 font-medium"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0" />
                <span>24/7 Personal AI Tutor with real-time code assistant</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0" />
                <span>Tamper-proof ISO authenticated digital certificates</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0" />
                <span>Interactive coding sandboxes & automated grading engine</span>
              </div>
            </motion.div>

            {/* 4 Animated Statistics Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 gap-3 pt-2"
            >
              {stats.map((stat, idx) => {
                const IconComp = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.03, translateY: -2 }}
                    transition={{ duration: 0.2 }}
                    className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-sky-100 hover:border-sky-300 shadow-sm hover:shadow-md flex items-center gap-3 group cursor-pointer transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 block group-hover:text-sky-600 transition-colors">
                        {stat.number}
                      </span>
                      <span className="text-[11px] font-medium text-slate-500 block">
                        {stat.label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

          </div>

          {/* Footer */}
          <div className="text-xs text-slate-500 font-medium z-10 relative">
            © {new Date().getFullYear()} SHAIVIKA AI LMS. All rights reserved.
          </div>
        </div>

        {/* ==================== RIGHT FORM CONTAINER ==================== */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
          <div className="w-full max-w-md space-y-6">
            <Outlet />
          </div>
        </div>

      </div>
    </BlueSmokeTheme>
  );
};

export default AuthLayout;

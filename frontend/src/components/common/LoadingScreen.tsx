import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (onComplete) setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      className="fixed inset-0 z-50 bg-[#020617] flex flex-col items-center justify-center p-6 text-white select-none overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute w-96 h-96 bg-[#10B981]/15 rounded-full blur-3xl animate-glow-emerald pointer-events-none" />

      {/* Center Logo Box */}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        <motion.div
          animate={{ scale: [0.95, 1.05, 0.95], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-24 h-24 rounded-3xl bg-slate-900/90 border border-white/10 p-3 shadow-2xl shadow-emerald-950/60 flex items-center justify-center"
        >
          <img
            src="/logo.png"
            alt="Shaivika AI LMS Platform Logo"
            className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]"
          />
          <div className="absolute inset-0 rounded-3xl border border-[#10B981]/40 animate-ping opacity-25" />
        </motion.div>

        {/* Brand Name */}
        <div className="text-center space-y-1">
          <h1 className="font-heading font-extrabold text-3xl tracking-tight">
            Shaivika <span className="text-[#10B981]">AI</span>
          </h1>
          <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-widest">
            LMS PLATFORM • NEXT-GEN AI EDUCATION
          </p>
        </div>

        {/* Loading Progress Bar */}
        <div className="w-64 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/10 relative">
          <motion.div
            className="h-full bg-gradient-to-r from-[#059669] to-[#10B981] rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-[11px] font-mono text-[#94A3B8]">
          Initializing AI Engine... {progress}%
        </span>
      </div>
    </motion.div>
  );
};

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
      <div className="absolute w-[500px] h-[500px] bg-[#10B981]/20 rounded-full blur-3xl animate-glow-emerald pointer-events-none" />

      {/* Center Logo Box */}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        <motion.div
          animate={{ scale: [0.96, 1.04, 0.96] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-3xl bg-[#0F172A] border border-white/15 p-4 shadow-2xl shadow-emerald-950/80 flex items-center justify-center"
        >
          <img
            src="/logo.png"
            alt="Shaivika AI LMS Platform Logo"
            className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(16,185,129,0.6)]"
          />
          <div className="absolute inset-0 rounded-3xl border border-[#10B981]/50 animate-ping opacity-25" />
        </motion.div>

        {/* Brand Name */}
        <div className="text-center space-y-1.5">
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl tracking-tight">
            Shaivika <span className="text-[#10B981]">AI</span>
          </h1>
          <p className="text-xs sm:text-sm font-bold text-[#94A3B8] uppercase tracking-widest">
            LMS PLATFORM • NEXT-GEN AI EDUCATION
          </p>
        </div>

        {/* Loading Progress Bar */}
        <div className="w-72 sm:w-80 h-2 bg-[#0F172A] rounded-full overflow-hidden border border-white/10 relative">
          <motion.div
            className="h-full bg-gradient-to-r from-[#059669] to-[#10B981] rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-xs font-mono text-[#94A3B8]">
          Initializing AI Engine... {progress}%
        </span>
      </div>
    </motion.div>
  );
};

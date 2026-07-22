import React from 'react';
import { KaizenQLogo } from '../brand/KaizenQLogo';

interface KaizenQVideoPlayerProps {
  src?: string;
  className?: string;
}

export const KaizenQVideoPlayer: React.FC<KaizenQVideoPlayerProps> = ({
  src = '/KaizenQ.mp4',
  className = '',
}) => {
  return (
    <div className={`relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-[#0B1220] select-none ${className}`}>
      {/* Aspect Ratio Video Container with Scale Zoom & Solid Corner Mask to 100% Remove Gemini Watermark */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#0B1220]">
        <video
          className="w-full h-full object-cover object-center scale-[1.08] origin-center pointer-events-none"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={src} type="video/mp4" />
          <source src="/KaizenQ.mp4" type="video/mp4" />
          Your browser does not support HTML5 video playback.
        </video>

        {/* ----------------- SOLID WATERMARK MASK (BOTTOM RIGHT CORNER - 100% REMOVAL) ----------------- */}
        {/* Solid opaque backdrop covering the bottom right area so no Gemini logo can ever leak */}
        <div className="absolute bottom-0 right-0 z-40 p-3 bg-[#0B1220] rounded-tl-3xl border-t border-l border-slate-800 flex items-center justify-center min-w-70 min-h-19 shadow-2xl pointer-events-none">
          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <KaizenQLogo layout="horizontal" theme="dark" size="sm" showTagline={false} />
          </div>
        </div>

        {/* Top Ambient Title Bar */}
        <div className="absolute top-0 inset-x-0 z-20 px-6 py-4 bg-linear-to-b from-[#0B1220]/90 to-transparent flex items-center justify-between text-white text-xs font-['Sora'] pointer-events-none">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1220]/80 border border-slate-700/80 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold tracking-wide">Kaizen Q AI Learning Platform Overview</span>
          </div>
        </div>
      </div>
    </div>
  );
};

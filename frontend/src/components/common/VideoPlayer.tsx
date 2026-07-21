import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface VideoPlayerProps {
  src?: string;
  poster?: string;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src = '/videos/Lmsvideo.mp4',
  poster,
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      if (isEnded) {
        videoRef.current.currentTime = 0;
        setIsEnded(false);
      }
      videoRef.current.play().catch(() => {});
    }
  }, [isPlaying, isEnded]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => {
      setIsPlaying(true);
      setIsEnded(false);
    };
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setIsEnded(true);
    };

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('ended', onEnded);

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <div
      className={`relative w-full aspect-video overflow-hidden rounded-[24px] bg-slate-950 border border-emerald-500/20 shadow-2xl shadow-emerald-950/50 group transition-all duration-300 ${className}`}
    >
      {/* Native HTML5 Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls
        playsInline
        className="w-full h-full object-cover rounded-[24px] cursor-pointer"
      />

      {/* Centered Big Play Button Overlay (Visible when paused / ended / idle) */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.button
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25 }}
            onClick={togglePlay}
            className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-900/80 backdrop-blur-xl border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-2xl shadow-emerald-950/80 hover:bg-emerald-500 hover:text-slate-950 hover:scale-110 active:scale-95 transition-all duration-200 z-20 cursor-pointer pointer-events-auto"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isEnded ? (
              <RotateCcw className="w-8 h-8 sm:w-10 sm:h-10 ml-0.5" />
            ) : isPlaying ? (
              <Pause className="w-8 h-8 sm:w-10 sm:h-10 fill-current" />
            ) : (
              <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-current" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Thin Subtle Inner Glass Highlight */}
      <div className="absolute inset-0 rounded-[24px] border border-white/5 pointer-events-none group-hover:border-emerald-500/20 transition-colors duration-300" />
    </div>
  );
};

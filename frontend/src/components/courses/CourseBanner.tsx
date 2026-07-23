import React from 'react';
import { CourseStatusBadge } from './CourseStatusBadge';
import type { CourseStatus } from '../../../../shared/types/course';
import { Star, Clock, Globe, Shield, Sparkles, PlayCircle } from 'lucide-react';

interface CourseBannerProps {
  title: string;
  subtitle: string;
  category: string;
  level: string;
  duration: string;
  language: string;
  rating: number;
  ratingCount?: number;
  enrollmentCount: number;
  bannerUrl?: string;
  status?: CourseStatus;
  aiGenerated?: boolean;
  onStartCourse?: () => void;
}

export const CourseBanner: React.FC<CourseBannerProps> = ({
  title,
  subtitle,
  category,
  level,
  duration,
  language,
  rating,
  ratingCount = 120,
  enrollmentCount,
  bannerUrl,
  status,
  aiGenerated,
  onStartCourse,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900/90 border border-indigo-500/20 shadow-2xl p-6 sm:p-10 text-white font-['Sora']">
      {bannerUrl && (
        <div className="absolute inset-0 z-0">
          <img src={bannerUrl} alt={title} className="w-full h-full object-cover opacity-20 filter blur-xs" />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/90 to-indigo-950/80" />
        </div>
      )}

      <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-4 max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              {category}
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold capitalize">
              {level.replace('_', ' ')}
            </span>
            {status && <CourseStatusBadge status={status} />}
            {aiGenerated && (
              <span className="px-3 py-1 rounded-full bg-linear-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> AI Synthesized
              </span>
            )}
          </div>

          {onStartCourse && (
            <button
              onClick={onStartCourse}
              className="py-2.5 px-5 rounded-2xl bg-linear-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-emerald-500/20 flex items-center gap-2 cursor-pointer transition-all"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Start Learning</span>
            </button>
          )}
        </div>

        <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white leading-tight">
          {title}
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal max-w-3xl">
          {subtitle}
        </p>

        <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-300 font-medium">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <Star className="w-4 h-4 fill-current text-amber-400" />
            <span>{rating.toFixed(1)}</span>
            <span className="text-slate-400 font-normal">({ratingCount.toLocaleString()} reviews)</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300">
            <Shield className="w-4 h-4 text-sky-400" />
            <span>{enrollmentCount.toLocaleString()} Students Enrolled</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock className="w-4 h-4 text-purple-400" />
            <span>{duration}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>{language}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

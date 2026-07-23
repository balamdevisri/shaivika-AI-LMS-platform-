import React, { useState, useEffect } from 'react';
import type { ICourse } from '../../../../shared/types/course';
import { courseService } from '../../services/courseService';
import { Check, ShieldCheck, Bookmark, PlayCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface CourseSidebarProps {
  course: ICourse;
  onEnrollSuccess?: () => void;
  onStartCourse?: () => void;
}

export const CourseSidebar: React.FC<CourseSidebarProps> = ({
  course,
  onEnrollSuccess,
  onStartCourse,
}) => {
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const enrolled = courseService.isCourseEnrolled(course.id);
      setIsEnrolled(enrolled);
    };
    checkStatus();
  }, [course.id]);

  const handleAction = async () => {
    if (isEnrolled) {
      if (onStartCourse) onStartCourse();
      return;
    }

    setIsEnrolling(true);
    try {
      const res = await courseService.enrollCourse(course.id, 'default_student');
      if (res.success) {
        setIsEnrolled(true);
        toast.success(`Enrolled successfully in "${course.title}"! Click Start to begin.`);
        if (onEnrollSuccess) onEnrollSuccess();
        if (onStartCourse) onStartCourse();
      }
    } catch (err: any) {
      toast.error('Failed to process enrollment.');
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleBookmark = async () => {
    try {
      const res = await courseService.bookmarkCourse(course.id, 'default_student');
      setIsBookmarked(res.bookmarked);
      toast.success(res.bookmarked ? 'Course saved to your bookmarks!' : 'Course removed from bookmarks.');
    } catch (e) {}
  };

  return (
    <div className="sticky top-24 rounded-3xl bg-slate-900/90 border border-slate-800 p-6 backdrop-blur-2xl shadow-2xl space-y-6 font-['Sora'] text-slate-100">
      <div className="space-y-1">
        <span className="text-xs text-slate-400 font-semibold uppercase">Total Enrollment Fee</span>
        <div className="flex items-baseline gap-2">
          <span className="font-heading font-extrabold text-3xl text-emerald-400">
            Free Track
          </span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold uppercase">
            100% Free
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleAction}
          disabled={isEnrolling}
          className={`w-full py-3.5 px-6 rounded-2xl text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all duration-300 ${
            isEnrolled
              ? 'bg-linear-to-r from-emerald-600 via-indigo-600 to-purple-600 hover:from-emerald-500 hover:to-purple-500 shadow-indigo-500/25 animate-pulse'
              : 'bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-indigo-500/25'
          }`}
        >
          {isEnrolling ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Enrolling Now...</span>
            </>
          ) : isEnrolled ? (
            <>
              <PlayCircle className="w-5 h-5 text-white" />
              <span>🚀 Start Learning Now</span>
            </>
          ) : (
            <>
              <PlayCircle className="w-5 h-5" />
              <span>Enroll Free In Course Track</span>
            </>
          )}
        </button>

        <button
          onClick={handleBookmark}
          className={`w-full py-3 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
            isBookmarked
              ? 'bg-indigo-950/60 border-indigo-500/50 text-indigo-300'
              : 'border-slate-700 bg-slate-800/60 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current text-indigo-400' : ''}`} />
          <span>{isBookmarked ? 'Saved in Bookmarks' : 'Bookmark Course'}</span>
        </button>
      </div>

      <div className="space-y-3 pt-4 border-t border-slate-800">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          What's included in this free track
        </h4>

        <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
          <li className="flex items-center gap-2.5">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Full Lifetime Access to all Modules</span>
          </li>
          <li className="flex items-center gap-2.5">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Interactive Terminal & Code Environment</span>
          </li>
          <li className="flex items-center gap-2.5">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>AI Automated Assessment & Feedback</span>
          </li>
          <li className="flex items-center gap-2.5">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Official SHAIVIKA Certificate of Completion</span>
          </li>
        </ul>
      </div>

      <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Track Instructor
        </span>
        <div className="flex items-center gap-3">
          <img
            src={course.instructor.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt={course.instructor.name}
            className="w-11 h-11 rounded-full object-cover border border-indigo-500/40"
          />
          <div>
            <h5 className="font-heading font-bold text-xs text-white">{course.instructor.name}</h5>
            <p className="text-[11px] text-slate-400">{course.instructor.role || 'Senior Technical Instructor'}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium pt-2">
        <ShieldCheck className="w-4 h-4 text-indigo-400" />
        <span>SHAIVIKA AI Foundation Guaranteed Track</span>
      </div>
    </div>
  );
};

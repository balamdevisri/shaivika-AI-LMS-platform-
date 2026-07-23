import React from 'react';
import { Link } from 'react-router-dom';
import type { ICourse } from '../../../../shared/types/course';
import { CourseThumbnail } from './CourseThumbnail';
import { CourseStatusBadge } from './CourseStatusBadge';
import { Star, Clock, Users, ArrowRight, Bookmark } from 'lucide-react';

interface CourseCardProps {
  course: ICourse;
  isAdmin?: boolean;
  onBookmark?: (id: string) => void;
  onPublish?: (id: string) => void;
  onArchive?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isAdmin = false,
  onBookmark,
}) => {
  const isFree = course.price === 0;

  return (
    <div className="group relative flex flex-col justify-between rounded-3xl bg-slate-900/80 border border-slate-800/80 hover:border-indigo-500/50 backdrop-blur-xl p-4 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 font-['Sora'] text-slate-100">
      <div className="space-y-3">
        <div className="relative">
          <CourseThumbnail src={course.thumbnail} alt={course.title} category={course.category} />
          {isAdmin && (
            <div className="absolute top-3 right-3">
              <CourseStatusBadge status={course.status} />
            </div>
          )}
          {!isAdmin && onBookmark && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onBookmark(course.id);
              }}
              className="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/70 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-indigo-600 transition-colors backdrop-blur-md cursor-pointer"
              title="Bookmark Course"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
          <span className="capitalize px-2.5 py-0.5 rounded-md bg-slate-800/70 border border-slate-700/50 text-slate-300">
            {course.level.replace('_', ' ')}
          </span>
          <span className="font-heading font-extrabold text-sm text-indigo-400">
            {isFree ? 'Free' : `$${course.price.toFixed(2)}`}
          </span>
        </div>

        <h3 className="font-heading font-bold text-base text-white group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug">
          <Link to={`/course/${course.slug}`}>{course.title}</Link>
        </h3>

        <p className="text-xs text-slate-400 line-clamp-2 font-normal leading-relaxed">
          {course.shortDescription}
        </p>

        {course.skills && course.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {course.skills.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="text-[10px] font-semibold text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/40"
              >
                {skill}
              </span>
            ))}
            {course.skills.length > 3 && (
              <span className="text-[10px] text-slate-500 font-medium self-center">
                +{course.skills.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      <div className="pt-4 mt-4 border-t border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-1 text-amber-400 font-bold">
            <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
            <span>{course.rating.toFixed(1)}</span>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <Users className="w-3.5 h-3.5 text-sky-400" />
            <span>{course.enrollmentCount.toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>{course.duration}</span>
          </div>
        </div>

        <Link
          to={`/course/${course.slug}`}
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 transition-all duration-200 group-hover:shadow-indigo-500/30"
        >
          <span>View Track Details</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

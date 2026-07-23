import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { ICourse } from '../../../../shared/types/course';
import { courseService } from '../../services/courseService';
import { CourseBanner } from '../../components/courses/CourseBanner';
import { CourseSidebar } from '../../components/courses/CourseSidebar';
import { CourseDetails } from '../../components/courses/CourseDetails';
import { CoursePlayerModal } from '../../components/courses/CoursePlayerModal';
import { LoadingSkeleton } from '../../components/courses/LoadingSkeleton';
import { EmptyState } from '../../components/courses/EmptyState';
import { ArrowLeft, PlayCircle } from 'lucide-react';

export const CourseView: React.FC = () => {
  const { courseId, slug } = useParams<{ courseId?: string; slug?: string }>();
  const idOrSlug = slug || courseId;

  const [course, setCourse] = useState<ICourse | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const fetchCourse = async () => {
    if (!idOrSlug) return;
    setLoading(true);
    try {
      const found = await courseService.getCourseBySlugOrId(idOrSlug);
      setCourse(found);
    } catch (e) {
      setCourse(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [idOrSlug]);

  if (loading) {
    return <LoadingSkeleton variant="detail" />;
  }

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <EmptyState
          title="Course Not Found"
          description="The course track you are looking for does not exist or has been removed."
        />
        <div className="text-center pt-4">
          <Link
            to="/courses"
            className="py-2.5 px-5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Course Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-['Sora'] text-slate-900 max-w-7xl mx-auto pb-16">
      <div className="flex items-center justify-between">
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-sky-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>

        <button
          onClick={() => setIsPlayerOpen(true)}
          className="py-2.5 px-5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-extrabold shadow-md shadow-sky-600/20 flex items-center gap-2 cursor-pointer transition-all"
        >
          <PlayCircle className="w-4 h-4" />
          <span>🚀 Start Learning Now</span>
        </button>
      </div>

      <CourseBanner
        title={course.title}
        subtitle={course.shortDescription}
        category={course.category}
        level={course.level}
        duration={course.duration}
        language={course.language}
        rating={course.rating}
        ratingCount={course.ratingCount}
        enrollmentCount={course.enrollmentCount}
        bannerUrl={course.banner}
        status={course.status}
        aiGenerated={course.aiGenerated}
        onStartCourse={() => setIsPlayerOpen(true)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        <div className="lg:col-span-2 space-y-8">
          <CourseDetails course={course} onStartModule={() => setIsPlayerOpen(true)} />
        </div>

        <div className="lg:col-span-1 space-y-8">
          <CourseSidebar course={course} onStartCourse={() => setIsPlayerOpen(true)} />
        </div>
      </div>

      {isPlayerOpen && (
        <CoursePlayerModal
          course={course}
          onClose={() => setIsPlayerOpen(false)}
          onProgressUpdate={() => fetchCourse()}
        />
      )}
    </div>
  );
};
